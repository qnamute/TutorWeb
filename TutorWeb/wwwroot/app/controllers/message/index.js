var messageControleler = function () {
    this.initialize = function () {
        registerEvent();
        loadData(true);
    };

    function registerEvent() {
        $('#frmMaintainance').validate({
            errorClass: 'red',
            ignore: [],
            lang: 'vi',
            rules: {
                txtTitle: { required: true },
                txtContent: {
                    required: true
                }
            }
        });

        $('#dllMessageStatus').on('change', function () {
            loadData();
        });

        $('body').on('click', '#btnSave', function (e) {
            e.preventDefault();
            save();
        });

        $('body').on('click', '.btn-reply', function () {
            var that = $(this).data('id');
            $.ajax({
                type: 'GET',
                url: '/Admin/Message/GetById',
                data: {
                    id: that
                },
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    $('#txtTitle').val(response.Title);
                    $('#replyMessageModal').modal('show');
                    $('#txtReplyTitle').val('[Re]Phản hồi nội dung:' + '"' + response.title + '"');
                    $('#txtParentId').val(response.Id);
                },
                error: function (status) {
                    easy2getroom.notify('Load không thành công', 'error');
                }
            })
        });

        $('body').on('click', '.btn-delete', function (e) {
            var that = $(this).data('id');
            e.preventDefault();

            easy2getroom.confirm('Bạn có chắc muốn xóa ?', function () {
                $.ajax({
                    type: 'POST',
                    url: '/Admin/Message/Delete',
                    data: {
                        id: that
                    },
                    success: function (response) {
                        easy2getroom.notify('Xóa thành công', 'success');
                        loadData();
                    },
                    error: function (status) {
                        console.log(status);
                        easy2getroom.notify('Xóa không thành công', 'error');
                    }
                });
            });
        });
    }

    function resetFormMantain() {
        $('#txtTitle').val('');
        $('#txtReplyTitle').val('');
        $('#txtParentId').val('');
        $('#txtContent').val('');
    }

    function loadData(isPageChanged) {
        var template = $('#list-template').html();
        var messageStatus = $('#dllMessageStatus').val();
        var render = "";
        $.ajax({
            type: 'GET',
            url: '/admin/Message/GetAllPaging',
            data: {
                isReply: messageStatus,
                page: easy2getroom.configs.pageIndex,
                pageSize: easy2getroom.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        Id: item.Id,
                        Status: easy2getroom.getMessageStatus(item.IsReply),
                        Title: item.Title,
                        FullName: item.UserSender.FullName,
                        DateCreated: easy2getroom.dateTimeFormatJson(item.DateCreated),
                        Content: item.Content
                    });
                });
                $('#lblTotalRecords').text(response.RowCount);
                $('#listMessages').html(render);
                wrapPaging(response.RowCount, function () {
                    loadData();
                }, isPageChanged);
            },
            error: function (status) {
                console.log(status);
                easy2getroom.notify('Không thể load dữ liệu', 'error');
            }
        });
    }

    function setMessageStatus(id) {
        $.ajax({
            type: 'post',
            url: '/Admin/Message/UpdateStatus',
            data: {
                id: id
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function save() {
        let parentId = $('#txtParentId').val();
        let title = $('#txtTitle').val();
        let content = $('#txtContent').val();
        if (content != '') {
            $.ajax({
                type: 'POST',
                url: '/Admin/Message/SaveEntity',
                data: {
                    Title: title,
                    Content: content,
                    ParentId: parentId
                },
                dataType: 'json',
                success: function (response) {
                    easy2getroom.notify('Phản hồi thành công', 'success');
                    setMessageStatus(parentId);
                    $('#replyMessageModal').modal('hide');
                    resetFormMantain();
                    loadData();
                },
                error: function (status) {
                    console.log(status);
                    easy2getroom.notify('Có lỗi sảy ra', 'error');
                }
            });
        }
        else {
            easy2getroom.notify('Nội dung không được bỏ trống', 'error');
        }
    }

    function wrapPaging(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / easy2getroom.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationUL a').length === 0 || changePageSize === true) {
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
                    easy2getroom.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            });
        }
    }
}