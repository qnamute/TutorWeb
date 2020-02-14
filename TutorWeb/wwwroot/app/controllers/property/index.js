var propertyController = function () {
    this.initialize = function () {
        loadCategory();
        loadData();
        registerEvent();
        registerControls();
    }

    function registerEvent() {
        //Binding event to controls
        $('#ddlShowPage').on('change', function () {
            easy2getroom.configs.pageSize = $(this).val();
            easy2getroom.configs.pageIndex = 1;
            loadData(true);
        });


        $('#ddlCategorySearch').on('change', function () {
            loadData(true);
        });

        $('#txtKeyword').on('keypress', function (e) {
            if (e.which === 13) {
                loadData(true);
            }
        });

        $('body').on('click', '.btn-detail', function (e) {
            e.preventDefault();
            var that = $(this).data('id');

            loadDetail(that);
        });

        $('body').on('click', '.btn-flag', function (e) {
            e.preventDefault();
            console.log(easy2getroomConstant.sildeFlag);

            let that = $(this).data('id');
            let isFlag = $(this).data('flag');
            console.log(isFlag);
            if (isFlag == easy2getroomConstant.sildeFlag.Undisplay) {
                isFlag = easy2getroomConstant.sildeFlag.Display;
                easy2getroom.confirm('Bạn có chắc chắn muốn bài đăng này xuất hiện trên Slide ?', function () {
                    $.ajax({
                        type: 'POST',
                        url: '/Admin/Property/SetSlideFlag',
                        data: {
                            Id: that,
                            isFlag: isFlag,
                        },
                        //dataType: 'Json',
                        beforeSend: function () {
                            easy2getroom.startLoading();
                        },
                        success: function () {
                            easy2getroom.notify('Thao tác thành công !', 'success');
                            easy2getroom.stopLoading();
                            loadData();
                        },
                        error: function (status) {
                            easy2getroom.notify('Thao tác không thành công !', 'error');
                            easy2getroom.stopLoading();
                        }
                    })
                })
            }
            else {
                isFlag = easy2getroomConstant.sildeFlag.Undisplay;
                easy2getroom.confirm('Bạn có chắc chắn muốn ẩn bài đăng này trên Slide ?', function () {
                    $.ajax({
                        type: 'POST',
                        url: '/Admin/Property/SetSlideFlag',
                        data: {
                            Id: that,
                            isFlag: isFlag,
                        },
                        //dataType: 'Json',
                        beforeSend: function () {
                            easy2getroom.startLoading();
                        },
                        success: function () {
                            easy2getroom.notify('Thao tác thành công !', 'success');
                            easy2getroom.stopLoading();

                            loadData();
                        },
                        error: function (status) {
                            easy2getroom.notify('Thao tác không thành công !', 'error');
                            easy2getroom.stopLoading();
                        }
                    })
                })
            }
        });

        $('body').on('click', '.btn-hide', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            console.log(that);
            easy2getroom.confirm('Bạn có chắc chắn muốn ẩn ?', function () {
                $.ajax({
                    type: 'POST',
                    url: '/Admin/Property/Update',
                    data: {
                        Id: that,
                        Status: commonConstant.status.inactive,
                    },
                    dataType: 'Json',
                    beforeSend: function () {
                        easy2getroom.startLoading();
                    },
                    success: function () {
                        easy2getroom.notify('Ẩn thành công', 'success');
                        easy2getroom.stopLoading();

                        loadData();
                    },
                    error: function (status) {
                        easy2getroom.notify('Ẩn không thành công', 'error');
                        easy2getroom.stopLoading();
                    }
                })
            })

        });
        $('body').on('click', '#btnCancel', function () {
            loadData();
        });

        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            console.log(that);

            easy2getroom.confirm('Bạn có chắc chắn muốn xóa ?', function () {
                $.ajax({
                    type: 'POST',
                    url: '/Admin/Property/Delete',
                    data: {
                        id: that,
                    },
                    dataType: 'JSON',
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

    function registerControls() {
        CKEDITOR.replace('txtDescriptionTemp');

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

    function loadCategory() {
        $.ajax({
            type: 'GET',
            data: {

            },
            url: '/admin/property/GetAllCategories',
            dataType: 'json',
            success: function (response) {
                var render = "<option value=''>" + "Chọn loại" + "</option>"
                $.each(response, function (i, item) {
                    render += "<option value = '" + item.Id + "'>" + item.Name + "</option>";
                });

                $('#ddlCategorySearch').html(render);
            },
            error: function (error) {
                console.log(error);
                easy2getroom.notify('Can not load property category data', 'error')
            }
        });
    }
    function loadDetail(that) {
        $.ajax({
            type: 'Get',
            url: '/Admin/InActiveProperty/GetById',
            data: {
                id: that,
            },
            dataType: 'JSON',
            beforeSend: function () {
                easy2getroom.startLoading();
            },
            success: function (response) {

                var data = response;
                console.log(data);

                $('#hidIdM').val(data.Id);
                $('#lblName').text(data.Name);
                $('#lblCategory').text(data.PropertyCategory.Name);
                $('#lblPrice').text(easy2getroom.toMoney(data.Price));
                $('#lblAcreage').text(data.Acreage);
                $('#lblCity').text(data.City.Name);
                $('#lblDistrict').text(data.District.Name);
                $('#lblWards').text(data.Wards.Name);
                $('#lblRentalType').text(data.RentalType.Name);
                $('#lblTitle').text(data.Title);
                $('#lblDescription').text(data.Description);
                $('#lblDateCreated').text(easy2getroom.dateFormatJson(data.DateCreated));
                $('#lblDateModified').text(easy2getroom.dateFormatJson(data.DateModified));

                $('#detail-modal').modal('show');
            },
            error: function (status) {
                console.log(status);
                easy2getroom.notify('Xem thông tin không thành công', 'error');
            }
        });
    }

    function loadDescription() {
        var des = CKEDITOR.instances.txtDescriptionTemp.getData();
        console.log(des);
        $('#txtDescription').html(des);
        CKEDITOR.instances.txtDescriptionTemp.destroy();
    }

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";
        console.log($('#ddlCategorySearch').val());

        $.ajax({
            type: 'GET',
            url: '/admin/property/GetAllPaging',
            data: {
                categoryId: $('#ddlCategorySearch').val(),
                keyWord: $('#txtKeyword').val(),
                page: easy2getroom.configs.pageIndex,
                pageSize: easy2getroom.configs.pageSize
            },
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        STT: i + 1,
                        Id: item.Id,
                        Name: item.Name,
                        Category: item.PropertyCategory.Name,
                        RentalType: item.RentalType.Name,
                        Price: easy2getroom.toMoney(item.Price),
                        Acreage: item.Acreage,
                        Status: easy2getroom.getStatus(item.Status),
                        SlideFlag: easy2getroom.getFlagState(item.Id, item.SlideFlag)
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