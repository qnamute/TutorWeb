//Common function here

var tutorweb = {
    configs: {
        pageSize: 10,
        pageIndex: 1
    },
    status: {
        Active: 1,
        InActive: 0
    },
    startLoad: function () {
        $('#preloader').show();
        $('body').css({ 'opacity': 0.5 });
    },
    stopLoad: function () {
        $('#preloader').hide();
        $('body').css({ 'opacity': 1 });
    },
    getRoleUser: function (role) {
        if (role == 'Admin') {
            return '<span class="badge bg-green">Admin</span>';
        }
        else {
            return '<span class="badge bg-purple">User</span>';
        }
    },
    getCheck: function (checked) {
        if (checked == true)
            return '<input type="checkbox"checked onclick="return false;">';
        else
            return '<input type="checkbox" onclick="return false;">';
    },
    getMessageStatus: function (isReply) {
        if (isReply == 0) {
            // Not seen
            return '<span class="badge bg-green">Chưa phản hồi</span>'
        }
        else {
            // Replied
            return '<span class="badge bg-light">Đã phản hồi</span>'
        }
    },
    getUserStatus: function (status) {
        if (status == 1)
            return '<span class="badge bg-green">Hoạt động</span>';
        else
            return '<span class="badge bg-red">Dừng hoạt động</span>';
    },
    getStatus: function (status) {
        if (status == 1)
            return '<span class="badge bg-green">Hoạt động</span>';
        else
            return '<span class="badge bg-red">Ẩn</span>';
    },
    getAdminFlag: function (id, role) {
        if (role == 'Admin') {
            return '<button type="button" class="btn btn-sm btn-toggle btn-admin-flag active" data-toggle="button" aria-pressed="true" autocomplete="off" data-id="' + id + '"' +
                'data-flag="' + role + '">' +
                '<div class="handle"></div>' +
                '</button>';
        }
        else {
            return '<button type="button" class="btn btn-sm btn-toggle btn-admin-flag" data-toggle="button" aria-pressed="false" autocomplete="off" data-id="' + id + '"' +
                'data-flag="' + role + '">' +
                '<div class="handle"></div>' +
                '</button>';
        }
    }
    ,
    getFlagState: function (id, isFlag) {
        if (isFlag == 0)
            return '<button type="button" class="btn btn-sm btn-toggle btn-flag" data-toggle="button" aria-pressed="false" autocomplete="off" data-id="' + id + '"' +
                'data-flag="' + isFlag + '">' +
                '<div class="handle"></div>' +
                '</button>';
        else
            return '<button type="button" class="btn btn-sm btn-toggle btn-flag active" data-toggle="button" aria-pressed="true" autocomplete="off" data-id="' + id + '"' +
                'data-flag="' + isFlag + '">' +
                '<div class="handle"></div>' +
                '</button>';
    }
    ,
    getGender: function (gender) {
        if (gender == null || '')
            return '';
        else if (gender == 1)
            return 'Nữ';
        else
            return 'Nam';
    },
    notify: function (message, type) {
        $.notify(message, {
            // whether to hide the notification on click
            clickToHide: true,
            // whether to auto-hide the notification
            autoHide: true,
            // if autoHide, hide after milliseconds
            autoHideDelay: 5000,
            // show the arrow pointing at the element
            arrowShow: true,
            // arrow size in pixels
            arrowSize: 5,
            // position defines the notification position though uses the defaults below
            position: 'bottom right',
            // default positions
            elementPosition: 'top right',
            globalPosition: 'top right',
            // default style
            style: 'bootstrap',
            // default class (string or [string])
            className: type,
            // show animation
            showAnimation: 'slideDown',
            // show animation duration
            showDuration: 400,
            // hide animation
            hideAnimation: 'slideUp',
            // hide animation duration
            hideDuration: 200,
            // padding between element and notification
            gap: 2
        });
    },
    confirm: function (message, okCallback) {
        bootbox.confirm({
            message: message,
            buttons: {
                confirm: {
                    label: 'Đồng ý',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Hủy',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result === true) {
                    okCallback();
                }
            }
        });
    },
    dateFormatJson: function (datetime, isDMY = true) {
        if (datetime == null || datetime == '')
            return '';
        var newdate = new Date(datetime);
        var month = newdate.getMonth() + 1;
        var day = newdate.getDate();
        var year = newdate.getFullYear();
        var hh = newdate.getHours();
        var mm = newdate.getMinutes();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        if (hh < 10)
            hh = "0" + hh;
        if (mm < 10)
            mm = "0" + mm;
        if (isDMY)
            return day + "/" + month + "/" + year;
        else
            return year + "-" + month + "-" + day;
    },
    dateTimeFormatJson: function (datetime) {
        if (datetime == null || datetime == '')
            return '';
        var newdate = new Date(datetime);
        var month = newdate.getMonth() + 1;
        var day = newdate.getDate();
        var year = newdate.getFullYear();
        var hh = newdate.getHours();
        var mm = newdate.getMinutes();
        var ss = newdate.getSeconds();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        if (hh < 10)
            hh = "0" + hh;
        if (mm < 10)
            mm = "0" + mm;
        if (ss < 10)
            ss = "0" + ss;
        return day + "/" + month + "/" + year + " " + hh + ":" + mm + ":" + ss;
    },
    startLoading: function () {
        if ($('.dv-loading').length > 0)
            $('.dv-loading').removeClass('hide');
    },
    stopLoading: function () {
        if ($('.dv-loading').length > 0)
            $('.dv-loading')
                .addClass('hide');
    },
    getStatus: function (status) {
        if (status == 1)
            return '<span class="badge bg-green">Hoạt động</span>';
        else if (status == 0) {
            return '<span class="badge bg-red">Ẩn</span>';
        }
        else if (status == 2) {
            return '<span class="badge bg-purple">Chờ Duyệt</span>';
        }
    },
    toFloat: function (val) {
        if (val != null && val != "" && val != undefined) {
            var t = val.toString().replace(/,/g, "");
            var rs = parseFloat(t);

            if (!isNaN(rs))
                return +rs.toFixed(10);
            else
                console.log('float: ' + val);
        }
        return 0;
    },
    toInt: function (val) {
        if (val != null && val != "" && val != undefined) {
            var t = val.toString().replace(/,/g, "");
            var rs = parseInt(t);

            if (!isNaN(rs))
                return rs;
            else
                console.log('int: ' + val);
        }
        return 0;
    },
    formatNumber: function (number, precision) {
        if (!isFinite(number)) {
            return number.toString();
        }

        var a = number.toFixed(precision).split('.');
        a[0] = a[0].replace(/\d(?=(\d{3})+$)/g, '$&,');
        return a.join('.');
    },
    toMoney: function (val) {
        if (val != null && val != "" && !isNaN(val)) {
            var mon = this.toRound(val, 0);
            while (/(\d+)(\d{3})/.test(mon.toString())) {
                mon = mon.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
            return mon;
        }
        return 0;
    },
    unflattern: function (arr) {
        var map = {};
        var roots = [];
        for (var i = 0; i < arr.length; i += 1) {
            var node = arr[i];
            node.children = [];
            map[node.id] = i; // use map to look-up the parents
            if (node.parentId !== null) {
                arr[map[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    },
    toRound: function (val, r) {
        // làm tròn val, lấy sau đấu phẩu r chữ số
        return this.toFloat(val).toFixed(r);
    },
}

$(document).ajaxSend(function (e, xhr, options) {
    if (options.type.toUpperCase() == 'POST') {
        var token = $('form').find("input[name='__RequestVerificationToken']").val();
        xhr.setRequestHeader("RequestVerificationToken", token);
    }
});