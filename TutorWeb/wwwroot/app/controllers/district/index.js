var districtController = function () {
    this.initialize = function () {
        loadDistrict();
    }
    function loadDistrict() {
        var template = $('#table-template-district').html();
        var render = "";
        $('body').on('click', '.btn-city', function (e) {
            render = "";
            let content = $("#tblContentDistrict");
            let content2 = $("#tblContentWard");
            content.html("");
            content2.html("");
            //e.preventDefault();
            var that = $(this).data('id');
            console.log(that);
                $.ajax({
                    type: 'GET',
                    url: '/Admin/District/GetgetDistrictbyCityId',
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