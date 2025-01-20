$(document).ready(function () {
    var rand = function () {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var s = '';
        for (var i = 0; i < 32; i++)
            s += possible.charAt(Math.floor(Math.random() * possible.length));
        return s;
    }


    if (!$.cookie('aslfont-session')) {
        $.cookie('aslfont-session', rand());
    }

    $('[data-tab-for]').click(function (e) {
        e.preventDefault();
        $('[data-content-for]').hide();
        $('[data-tab-for]').removeClass('selected');
        $('[data-content-for=' + $(this).data('tab-for') + ']').show();
        $(this).addClass('selected');
    });
    $('[data-tab-for]').first().click();

});  