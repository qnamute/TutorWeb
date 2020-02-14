var wardsController = function () {
    this.initialize = function () {
        loadWard();
    }
    function loadWard() {
        var template = $('#table-template-ward').html();
        var render = "";
        $('body').on('click', '.btn-district', function (e) {
            render = "";
            let content = $("#tblContentWard");
            var that = $(this).data('id');
            console.log(that);
            $.ajax({
                type: 'GET',
                url: '/Admin/Wards/GetWardsByDistrictId',
                data: {
                    id: that
                },
                dataType: 'Json',
                success: function (response) {
                    console.log(response);
                    $.each(response, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            Name: item.Name,
                        });
                    });
                    content.html("");
                    content.html(render);
                },
                error: function (status) {
                    console.log(status);
                    easy2getroom.notify('Can not loading data', 'error');
                }
            })
        });
    }
}