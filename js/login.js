/**
 * 登录页面
 */

$('#login_form').on('submit', function () {

    var formData = $(this).serialize();
    var custName = $('#custName').val();
    var password = $('#password').val();
    $.ajax({
        url: baseUrl + 'lcyj-common-wap/app/appLogin',
        // url: ' /lcyjapp/appLogin',
        type: 'post',
        data: formData,
        success: function (data) {
            console.log(data)
            if (data.status === 'success') {
                mui.toast(data.msg);
                // window.location.href = './carinfo.html';
                var webview = mui.openWindow({
                    url: './carinfo.html',
                    id: 'carinfo',
                    show: {
                        aniShow: 'pop-in',//页面显示动画，默认为”slide-in-right“；
                    },
					waiting: {
						autoShow: false
					}
                });
            }
        }
    });
    return false;
});
