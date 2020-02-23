var classesController = function () {
    this.initialize = function () {
        registerEvent();
        loadData();
    }

    function registerEvent() {
        console.log('haha');
    }

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";

        $.ajax({
            type: 'GET',
            url: '/admin/Classes/GetAllPaging',
            data: {
                keyWord: $('#txtKeyword').val(),
                page: tutorweb.configs.pageIndex,
                pageSize: tutorweb.configs.pageSize
            },
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        STT: i + 1,
                        Id: item.Id,
                        Level: item.Level,
                        Subject: item.Subject.Name,
                        Request: item.Request,
                        TeachingTime: item.TeachingTime,
                        DateCreated: tutorweb.dateFormatJson(item.DateCreated),
                    });
                });
                $('#lblTotalRecords').text(response.RowCount);
                $('#tblContent').html(render);
                wrapPaging(response.RowCount, function () {
                    loadData();
                }, isPageChanged);
            },
            error: function (status) {
                console.log(status);
                easy2getroom.notify('Can not loading data', 'error');
            }
        })
    }
}