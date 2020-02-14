var placeController = function () {
    this.initialize = function () {
        loadData();
    }
    function loadData() {
        var template = $('#table-template-city').html();
        var render = "";
        $.ajax({
            type: 'GET',
            url: '/Admin/Place/GetAllCity',
            data: {
            },
            dataType: 'JSON',
            
            success: function (response) {
                console.log(response);
                $.each(response, function (i, item) {
                    render += Mustache.render(template, {
                        Id: item.Id,
                        Name: item.Name,
                    });
                    
                });
                $('#tblContentcity').html(render);
                
            },
            error: function (status) {
                console.log(status);
                easy2getroom.notify('Can not loading data', 'error');
            }
        })
    }
}