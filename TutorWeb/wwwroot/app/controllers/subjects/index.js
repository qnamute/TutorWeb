﻿var subjectsController = function () {
    this.initialize = function () {
        registerEvent();
        loadData();
    }

    function registerEvent() {


        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            console.log(that);

            easy2getroom.confirm('Bạn có chắc chắn muốn xóa ?', function () {
                $.ajax({
                    type: 'POST',
                    url: '/Admin/InActiveProperty/Delete',
                    data: {
                        id: that,
                    },
                    dataType: 'text',
                    beforeSend: function () {
                        easy2getroom.startLoading();
                    },
                    success: function () {
                        easy2getroom.notify('Xóa thành công', 'success');
                        easy2getroom.stopLoading();
                        loadData();
                    },
                    error: function (status) {
                        easy2getroom.notify('Xóa không thành công', 'error');
                        easy2getroom.stopLoading();
                    }
                });
            });

            //$('#delete-modal').modal('show');
        });
    }

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";

        $.ajax({
            type: 'GET',
            url: '/admin/Subjects/GetAllPaging',
            data: {
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
                        Code: item.Code,
                        Name: item.Name,
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
                tutorweb.notify('Can not loading data', 'error');
            }
        })
    }
    function wrapPaging(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tutorweb.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationUL').length === 0 || changePageSize === true) {
            $('#paginationUL').empty();
            $('#paginationUL').removeData("twbs-pagination");
            $('#paginationUL').unbind("page");
        }
        //Bind Pagination Event
        if (totalsize > 0) {
            $('#paginationUL').twbsPagination({
                totalPages: totalsize,
                visiblePages: 7,
                first: 'Đầu',
                prev: 'Trước',
                next: 'Tiếp',
                last: 'Cuối',
                onPageClick: function (event, p) {
                    tutorweb.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                
            });
        }
    }
}