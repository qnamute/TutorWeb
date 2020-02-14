var newsController = function () {
    this.initialize = function () {
        registerEvent();
        registerControls();
        loadData(true);
    }
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

        $("#btnCreate").on('click', function () {
            resetFormMaintainance();
            $('#modal-add-edit').modal('show');
        });

        $('body').on('click', '#btnSave', function (e) {
            e.preventDefault();
            save();
        });

        $('body').on('click', '.btn-edit', function () {
            var that = $(this).data('id');
            $.ajax({
                type: 'GET',
                url: '/Admin/News/GetById',
                data: {
                    id: that
                },
                dataType: 'json',
                success: function (response) {
                    var data = response;
                    $('#hidIdM').val(data.Id);
                    $('#txtTitle').val(data.Title);
                    CKEDITOR.instances.txtContent.setData(data.Content);
                    $('#modal-add-edit').modal('show');
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
                    url: '/Admin/News/Delete',
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

    function loadData(isPageChanged) {
        var template = $('#list-template').html();
        var render = "";
        $.ajax({
            type: 'GET',
            url: '/admin/News/GetAllPaging',
            data: {
                keyWord: $('#txtKeyword').val(),
                page: easy2getroom.configs.pageIndex,
                pageSize: easy2getroom.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        Id: item.Id,
                        Title: item.Title,
                        FullName: item.User.FullName,
                        DateCreated: easy2getroom.dateTimeFormatJson(item.DateCreated),
                    });
                });
                $('#lblTotalRecords').text(response.RowCount);
                $('#listNews').html(render);
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

    function save() {
        var id = $('#hidIdM').val();
        var title = $('#txtTitle').val();
        var content = CKEDITOR.instances.txtContent.getData();

        $.ajax({
            type: 'POST',
            url: '/Admin/News/SaveEntity',
            data: {
                id: id,
                title: title,
                content: content,
            },
            dataType: 'json',
            success: function (response) {
                console.log(response);
                easy2getroom.notify('Đăng bài thành công', 'success');
                resetFormMaintainance();
                loadData(false);
                $('#modal-add-edit').modal('hide');
            },
            error: function (status) {
                console.log(status);
                easy2getroom.notify('Có lỗi sảy ra', 'error');
            }
        });
    }

    function resetFormMaintainance() {
        $('#hidIdM').val(0);
        $('#txtTitle').val('');
        CKEDITOR.instances.txtContent.setData('');
    }

    function registerControls() {
        CKEDITOR.replace('txtContent', {

        });

        // Fix ckeditor link
        // Fix: cannot click on element ck in modal
        $.fn.modal.Constructor.prototype.enforceFocus = function () {
            $(document)
                .off('focusin.bs.modal') // guard against infinite focus loop
                .on('focusin.bs.modal', $.proxy(function (e) {
                    if (
                        this.$element[0] !== e.target && !this.$element.has(e.target).length
                        // CKEditor compatibility fix start.
                        && !$(e.target).closest('.cke_dialog, .cke').length
                        // CKEditor compatibility fix end.
                    ) {
                        this.$element.trigger('focus');
                    }
                }, this));
        };
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