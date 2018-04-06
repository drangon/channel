import $ from 'zepto';
import Alert from '../../js/common/message/alert';
require('../../css/login.less');

let login = {
    init() {
        this.bindevent()
    },
    bindevent() {
        let _this = this;
        $('.submit-btn').off().on('click', function(e) {
            e.preventDefault();
            let phone = $('.phone').val();
            let errmsg = ''
            if (!phone) {
                errmsg = '请输入手机号'
            } else if (phone && _this.isPhone(phone)) {
                errmsg = '请输入正确的手机号码'
            }
            if (errmsg) {
                Alert({
                    content: errmsg
                })
                return false
            }

            $.ajax({
                type: 'POST',
                url: '/login',
                data: {
                    phone: phone
                },
                success(data) {
                    if (data.status == 1) {
                        Alert({
                            content: data.msg
                        })
                        setTimeout(() => {
                            location.href = 'index.html'
                        }, 1000)
                    } else {
                        Alert({
                            content: data.msg
                        })
                    }
                },
                error(err) {
                    // Alert({
                    //     content: err.msg
                    // })
                    // location.href = 'index.html'
                }
            })
            return false;
        })
    },
    isPhone(str) {
        if (!/^1[3|4|5|7|8]\d{9}$/.test(str)) {
            return true;
        }
        return false;
    }
}
login.init()