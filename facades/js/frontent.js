// --------------- function that runs when scroll ---------------
$(window).on('scroll load', function () {
    if ($(window).scrollTop() >= 50) {
        $('.lower-nav').addClass('navbar-toggle');
        $('.main-container').addClass('main-container-toggle');
    } else {
        $('.lower-nav').removeClass('navbar-toggle');
        $('.main-container').removeClass('main-container-toggle');
    }
});

// --------------- function to validate quick message form ---------------
function quickMessageValidation() {
    const quickMessageForm = document.getElementById('quick-message-form');
    const quickMessageBtn = document.getElementById('quick-message-btn');
    const quickMessageSubmit = document.getElementById('quick-message-submit');
    Array.from(quickMessageForm.elements).forEach((input) => {
        input.addEventListener('input', function () {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }
        });
    });
    quickMessageBtn.addEventListener('click', function () {
        if (quickMessageForm.checkValidity()) {
            quickMessageSubmit.click();
        } else {
            Array.from(quickMessageForm.elements).forEach((input) => {
                if (!input.checkValidity()) {
                    input.classList.add('is-invalid');
                }
            });
        }
    });
}
