$(document).ready(function () {
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