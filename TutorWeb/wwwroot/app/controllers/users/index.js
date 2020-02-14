var userController = function () {
    this.initialize = function () {
        loadData();
        registerEvent();
    }

    function registerEvent() {
        $('body').on('click', '.btn-config', function () {
            let id = $(this).data('id');
            $.ajax({
                type: 'post',
                url: '/Admin/UserManage/GetById',
                data: {
                    id: id,
                },
                dataType: 'json',
                success: function (response) {
                    //loadRoles();
                    $('#hidId').val(response.User.Id);
                    $('#txtPhoneNumber').val(response.User.PhoneNumber);
                    $('#txtFullName').val(response.User.FullName);
                    $('#txtEmail').val(response.User.Email);
                    $('#ckAdmin').html(easy2getroom.getAdminFlag(response.User.Id, response.Role));
                }
            });
            $('#userConfigModal').modal('show');
        });

        $('#body').on('click', '.btn-delete', function () {
            let id = $(this).data('id');
            easy2getroom.confirm('Bạn có chắc chắn muốn xóa người dùng này ? ', function () {
                $.ajax({
                    type: 'POST',
                    url: '/Admin/UserManage/Delete',
                    data: {
                        Id: id,
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
        });


        $('#btnSave').on('click', function () {
            saveChanges();
        });

        $('body').on('click', '.btn-admin-flag', function () {
            let that = $(this).data('id');
            var isAdmin = $(this).attr('aria-pressed');
            if (isAdmin == true) {
                easy2getroom.confirm('Bạn có chắc chắn muốn hủy quyền Admin cho người dùng này ?', function () {
                    $.ajax({
                        type: 'POST',
                        url: '/Admin/UserManage/UpdateRole',
                        data: {
                            Id: that,
                            role: 'User',
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
                easy2getroom.confirm('Bạn có chắc chắn muốn phân quyền Admin cho người dùng này ?', function () {
                    $.ajax({
                        type: 'POST',
                        url: '/Admin/UserManage/UpdateRole',
                        data: {
                            Id: that,
                            role: 'Admin',
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
    }

    function saveChanges() {

        let id = $('#hidId').val();
        let fullName = $('#txtFullName').val();
        let phoneNumber = $('#txtPhoneNumber').val();
        $.ajax({
            type: 'post',
            url: '/Admin/UserManage/SaveEntity',
            data: {
                Id: id,
                FullName: fullName,
                PhoneNumber: phoneNumber,
            },
            success: function () {
                easy2getroom.notify('Lưu thành công', 'success');
                $('#userConfigModal').modal('hide');
            },
            error: function () {
                easy2getroom.notify('Lưu không thành công', 'error');
            }
        });
    };

    function loadRoles() {
        $('#dllRole').html('');
        let render = '';
        $.ajax({
            type: 'post',
            url: '/Admin/UserManage/GetRoles',
            data: {

            },
            dataType: 'json',
            success: function (response) {
                console.log(response);

                $.each(response, function (i, item) {
                    render += '<option value="' + item.Id + '">' + item.Name + '</option>';
                });
                $('#dllRole').html(render);
            },
            error: function (error) {
                console.log(error);
                easy2getroom.notify('Load quyền không thành công !', 'error');
            }
        });
    }

    function updateRole() {

    }

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";

        $.ajax({
            type: 'GET',
            url: '/admin/usermanage/GetAllPaging',
            data: {
                //categoryId: $('#ddlCategorySearch').val(),
                keyWord: $('#txtKeyword').val(),
                page: easy2getroom.configs.pageIndex,
                pageSize: easy2getroom.configs.pageSize
            },
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
                $.each(response.Users.Results, function (i, item) {
                    render += Mustache.render(template, {
                        STT: i + 1,
                        Id: item.Id,
                        FullName: item.FullName,
                        DateCreated: easy2getroom.dateFormatJson(item.DateCreated),
                        Role: easy2getroom.getRoleUser(response.Roles[i]),
                        Status: easy2getroom.getUserStatus(item.Status),
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