require('../../css/score.less');
import $ from 'zepto';
import Dialog from '../../js/common/dialog/dialog';

let login = {
    init() {
        this.bindevent()
    },
    bindevent() {
        let _this = this;
        $('.exchange-btn').off().on('click', function() {
            let _this = $(this);
            let goodsid = _this.parents('li').attr('data-id');
            if (_this.hasClass('already')) {
                return false;
            }
            Dialog({
                isDialog: false,
                content: '此奖品仅供当天参会嘉宾兑换,<br>一经兑换不予退回积分。<br>确定3000积分兑换吗?',
                successBack() {
                    let num = Number(_this.parent().parent().find('b').text());
                    $.ajax({
                        type: 'POST',
                        url: '/exchange',
                        data: {
                            goodsid: goodsid
                        },
                        success(data) {
                            _this.addClass('already').text('已兑换');
                            _this.parent().parent().find('b').text(num - 1);
                            $('.dialog-pop').remove();
                            if (data.status == 1) {
                                Dialog({
                                    isDialog: false,
                                    content: '兑换成功<br>请到积分兑换处领取您的礼品',
                                    isCancel: false,
                                    isSure: false
                                })
                            } else {
                                Dialog({
                                    isDialog: false,
                                    content: data.msg,
                                    isCancel: false,
                                    isSure: false
                                })
                            }
                        },
                        error(err) {
                            Dialog({
                                isDialog: false,
                                content: err.msg,
                                isCancel: false,
                                isSure: false
                            })
                        }
                    })
                }
            })
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