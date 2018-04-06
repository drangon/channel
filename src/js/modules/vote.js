require('../../css/vote.less');
import $ from 'zepto';
import Dialog from '../../js/common/dialog/dialog';
import Alert from '../../js/common/message/alert';

let login = {
    init() {
        this.bindevent()
    },
    bindevent() {
        let _this = this;
        $('.vote-checkbox li').off().on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            let voteid = $(this).attr('data-voteid');
            $('.submit-btn').attr('data-voteid', voteid);
        })
        $('.submit-btn').off().on('click', function(e) {
            e.preventDefault();
            let _this = $(this);
            let voteid = _this.attr('data-voteid');
            if (!voteid) {
                Dialog({
                    content: '请选择成功案例'
                })
                return false;
            }
            $.ajax({
                type: 'POST',
                url: '/vote',
                data: {
                    voteid: voteid
                },
                success(data) {
                    if (data.status == 1) {
                        Dialog({
                            content: data.msg
                        })

                        // setTimeout(() => {
                        //     location.href = data.url
                        // }, 1000)
                    } else {
                        Dialog({
                            content: data.msg
                        })
                    }
                },
                error(err) {
                    Dialog({
                        content: err.msg
                    })
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