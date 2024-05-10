
$('.accordion dt').on('click', function () {

    var current_dt = $(this);

    if (!$(this).next('dd').hasClass('active')) {

        if (current_dt.siblings('dd.active').length) {
            current_dt
                .siblings('dd.active')
                .slideUp(function () {
                    current_dt
                        .next('dd')
                        .slideDown()
                        .addClass('active');
                })
                .removeClass('active')
                .find('dd.active')
                .hide()
                .removeClass('active');

        } else {
            current_dt.next('dd').slideDown().addClass('active');
        }
    } else {
        current_dt.next('dd').slideUp().removeClass('active');
    }
});
