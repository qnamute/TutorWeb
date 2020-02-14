var activePropertyController = function () {
    this.initialize = function () {
        loadCategory();
        loadData();
        registerEvent();
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

        $('body').on('click', '.btn-hide', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            console.log(that);
            easy2getroom.confirm('Bạn có chắc chắn muốn ẩn ?', function () {
                $.ajax({
                    type: 'POST',
                    url: '/Admin/ActiveProperty/Hide',
                    data: {
                        Id: that,
                    },
                    dataType: 'text',
                    beforeSend: function () {
                        easy2getroom.startLoading();
                    },
                    success: function () {
                        easy2getroom.notify('Ẩn thành công', 'success');
                        easy2getroom.stopLoading();

                        loadData();
                    },
                    error: function (status) {
                        console.log(status);
                        easy2getroom.notify('Ẩn không thành công', 'error');
                        easy2getroom.stopLoading();
                    }
                })
            })

        });
        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            console.log(that);

            easy2getroom.confirm('Bạn có chắc chắn muốn xóa ?', function () {
                $.ajax({
                    type: 'POST',
                    url: '/Admin/ActiveProperty/Delete',
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

    function loadDetail(that) {
        registerControls();
        $.ajax({
            type: 'Get',
            url: '/Admin/ActiveProperty/GetById',
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
                $('#lblPriceRange').text(easy2getroom.toMoney(data.PriceFrom) + ' đến ' + easy2getroom.toMoney(data.PriceTo));
                $('#lblAcreageRange').text(data.AcreageFrom + ' đến ' + data.AcreageTo);
                $('#lblCity').text(data.City.Name);
                $('#lblDistrict').text(data.District.Name);
                $('#lblWards').text(data.Wards.Name);
                $('#lblRentalType').text(data.RentalType.Name);
                $('#lblTitle').text(data.Title);
                $('#txtLat').val(data.Lat);
                $('#txtLng').val(data.Lng);
                CKEDITOR.instances.txtDescriptionTemp.setData(data.Description);
                loadDescription();
                $('#lblDateCreated').text(easy2getroom.dateFormatJson(data.DateCreated));
                $('#lblDateModified').text(easy2getroom.dateFormatJson(data.DateModified));

                //initMap();

                $('#detail-modal').modal('show');
            },
            error: function (status) {
                console.log(status);
                easy2getroom.notify('Xem thông tin không thành công', 'error');
            }
        });
    }

    function loadCategory() {
        $.ajax({
            type: 'GET',
            data: {

            },
            url: '/admin/property/GetAllCategories',
            dataType: 'json',
            success: function (response) {
                var render = "<option value=''>" + "Chọn loại" + "</option>";
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

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";
        console.log($('#ddlCategorySearch').val());

        $.ajax({
            type: 'GET',
            url: '/admin/ActiveProperty/GetAllPaging',
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

    function initMap() {
        let lat = $('#txtLat').val();
        let lng = $('#txtLng').val();

        console.log(lat, " asdasd ", lng);

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: { lat: Number(lat), lng: Number(lng) },
        });

        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        var beachMarker = new google.maps.Marker({
            position: { lat: Number(lat), lng: Number(lng) },
            map: map,
            icon: image
        });
        var geocoder = new google.maps.Geocoder();
    }

    function loadDescription() {
        var des = CKEDITOR.instances.txtDescriptionTemp.getData();
        $('#lblDescription').html(des);
        CKEDITOR.instances.txtDescriptionTemp.destroy();
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