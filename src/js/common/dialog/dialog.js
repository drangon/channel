require('./index.less');
import $Z from 'zepto';
let dialog = function(options) {
    let settings = {
        isDialog: true,
        tips: '提示',
        isCancel: true,
        isSure: true,
        closetextbtn: '关闭',
        suretextbtn: '确定',
        canceltextbtn: '取消',
        content: ''
    }
    options = Object.assign(settings, options);

    let template = `<div class="dialog-pop"><div class="dialog-box">`
    if (options.isDialog) {
        template += `<div class="dialog-wrap">
                            <div class="dialog-cont">${options.content}</div>
                            <a href="javascript:;" class="close">${options.closetextbtn}</a>
                        </div>`
    } else {
        template += `<div class="dialog-content">
                    <div class="dialog-tips"><i></i>${options.tips}</div>
                    <div class="dialog-cont">${options.content}</div><div class="btns">`
        if (options.isSure) {
            template += `<a href="javascript:;" class="sure-btn">${options.suretextbtn}</a>`
        }
        if (options.isCancel) {
            template += `<a href="javascript:;" class="close">${options.canceltextbtn}</a>`
        } else {
            template += `<a href="javascript:;" class="close">${options.suretextbtn}</a>`
        }
        template += `</div></div>`
    }
    template += `</div></div>`;

    if (!$Z('.dialog-box').size()) {
        $Z('body').append(template);
    }
    $Z('.sure-btn').off().on('click', function() {
        options.successBack()
    })
    $Z('.close').off().on('click', function() {
        $Z('.dialog-pop').remove();
    })
}

export default dialog