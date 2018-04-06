var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var glob = require('glob');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'static');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var TEM_PATH = path.resolve(ROOT_PATH, 'view');
var entries = getEntry('src/js/modules/*.js', 'src\\\\js\\\\modules\\\\');
var chunks = Object.keys(entries);

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = ['./' + entry];
    }
    // console.log(entries)
    return entries;
}
// var Px2remWebpackPlugin = require('px2rem-webpack-plugin');
var webpackconfig = {
    entry: entries,
    output: {
        path: BUILD_PATH,
        publicPath: '/',
        pathinfo: true,
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [ //加载器
            {
                test: /\.less$/,
                // loader: 'style-loader!css-loader!less-loader',
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ["css-loader", "less-loader"]
                })
            }, {
                test: /\.css$/,
                // loaders: ['style-loader', 'css-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, { test: /\.html$/, loader: 'html-loader' },
            {
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.Zepto!script-loader'
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=./img/[name].[ext]' },
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    // devtool: 'source-map',
    plugins: [
        // new CleanWebpackPlugin(['dist'], {
        //     root: path.resolve(__dirname, './')
        // }),
        new ExtractTextPlugin('css/[name].css'), //单独使用style标签加载css并设置其路径
        new webpack.HotModuleReplacementPlugin()
        // new Px2remWebpackPlugin({ originScreenWidth: 750 })
    ],
    devServer: {
        contentBase: ROOT_PATH, //本地服务器所加载的页面所在的目录
        watchContentBase: true,
        // host: '0.0.0.0',
        port: '8086',
        historyApiFallback: true, //不跳转
        inline: true,
        open: true,
        hot: true,
        proxy: {
            '/mocks': {
                target: 'http://localhost/channel/src',
                secure: false
            },
        }
    }
}

var pages = Object.keys(getEntry('src/view/*.html', 'src\\\\view\\\\'));
pages.forEach(function(pathname) {
    var conf = {
        filename: pathname + '.html', //生成的html存放路径，相对于path
        template: 'src/view/' + pathname + '.html', //html模板路径
        inject: false, //js插入的位置，true/'head'/'body'/false
        minify: false,
    };
    if (pathname in entries) {
        // conf.favicon = 'src/imgs/favicon.ico';
        conf.inject = true;
        conf.chunks = ['vendors', pathname]; //引入特定的js
        conf.hash = true;
    }
    webpackconfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = webpackconfig;