var loginController = function () {
    this.initialize = function () {
        registerEvent();
    }

    var registerEvent = function () {
        $('#frmLogin').validate({
            errorClass: 'red',
            ignore: [],
            lang: 'vi',
            rules: {
                email: {
                    required: true,
                },
                password: {
                    required: true,
                }
            }
        });

        $('#btnLogin').on('click', function (e) {
            if ($('#frmLogin').valid()) {
                e.preventDefault();
                var email = $('#txtEmail').val();
                var password = $('#txtPassword').val();
                login(email, password);
            };
        });
    }

    var login = function (email, pass) {
        $.ajax({
            type: 'POST',
            url: '/admin/login/authen',
            data: {
                'Email': email,
                'Password': pass
            },
            dataType: 'Json',
            success: function (res) {
                if (res.Success) {
                    window.location.href = "/Admin/Home/Index";
                }
                else {
                    tutorweb.notify('Thông tin đăng nhập không đúng!', 'error');
                }
            }
        })
    }
}

//a