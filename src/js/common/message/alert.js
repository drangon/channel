require('./index.less');
import $ from 'zepto';
let message = function(options) {
    let template = '<div class="message-box"><div class="message-cont">' + options.content + '</div></div>';
    if (!$('.message-box').size()) {
        $('body').append(template);
    }
    $('.message-box').addClass('animate-message');
    setTimeout(() => {
        $('.message-box').remove();
    }, 1000)
}

export default message