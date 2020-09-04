(function ($, document, window) {
    $(document).ready(function () {

        // Cloning main navigation for mobile menu
        $(".mobile-navigation").append($(".main-navigation .menu").clone());

        // Mobile menu toggle
        $(".menu-toggle").click(function () {
            $(".mobile-navigation").slideToggle();
        });

        // Changing background image using data-attribute
        $("[data-bg-image]").each(function () {
            var retina = window.devicePixelRatio > 1;
            var image = $(this).data("bg-image");

            if (retina) {
                var retinaimg = image.replace(".jpg", "@2x.jpg");
                $(this).css("background-image", "url(" + retinaimg + ")");
            } else {
                $(this).css("background-image", "url(" + image + ")");
            }

        });

        // Changing background color using data-attribute
        $("[data-bg-color]").each(function () {
            var color = $(this).data("bg-color");
            $(this).css("background-color", color);
        });

        // hero-slider
        $(".hero-slider").flexslider({
            controlNav: true,
            directionNav: false,
            animation: "fade"
        });
        var $container = $('.filterable-items');

        $container.imagesLoaded(function () {
            $container.isotope({
                filter: '*',
                layoutMode: 'fitRows',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

        });
        $('.filterable-nav a').click(function (e) {
            e.preventDefault();
            $('.filterable-nav .current').removeClass('current');
            $(this).addClass('current');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
        $('.mobile-filter').change(function () {

            var selector = $(this).val();
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

        initLightbox({
            selector: '.gallery-item a',
            overlay: true,
            closeButton: true,
            arrow: true
        });

        // $(".gallery-item a").imageLightbox();

     /*   if ($(".map").length) {
            $('.map').gmap3({
                    map: {
                        options: {
                            maxZoom: 14
                        }
                    },
                    marker: {
                        address: "40 Sibley St, Detroit",
                    }
                },
                "autofit");

        }*/
    });


    function submitGetQuoteForm() {
        // Initiate Variables With Form Content
        var name = $('#getQuoteFrm input[name="name"]').val();
        var email = $('#getQuoteFrm input[name="email"]').val();
        var message = $('#getQuoteFrm textarea[name="message"]').val();

        if (!$('#getQuoteFrm #exampleCheck1').is(":checked")) {
            submitMSG(false, '.sign-up-form-wrap');
            return;
        }

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/api/add",
            data: "name=" + name + "&email=" + email + "&message=" + message,
            success: function success(text) {
                if (text == "success") {
                    quoteFormSuccess();
                } else {
                    submitMSG(false, '.sign-up-form-wrap');
                }
            }
        });
    }

    function quoteFormSuccess() {
        $("#getQuoteFrm")[0].reset();
        submitMSG(true, '.sign-up-form-wrap');
    } // 14. contact form


    if ($("#contactForm").length) {
        $("#contactForm").validator().on("submit", function (event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                submitMSG(false, '#contact');
            } else {
                // everything looks good!
                event.preventDefault();
                submitContactForm();
                // formSuccess();
            }
        });
    }

    function submitContactForm() {
        // Initiate Variables With Form Content
        var name = $('#contactForm input[name="name"]').val();
        var email = $('#contactForm input[name="email"]').val();
        var message = $('#contactForm textarea[name="message"]').val();
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/api/contact/add",
            data: "name=" + name + "&email=" + email + "&message=" + message,
            success: function success(res) {
                if (res.result == "success") {
                    formSuccess();
                } else {
                    submitMSG(false, '#contact');
                }
            }
        });
    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, '#contact');
    }

    function submitMSG(valid, parentSelector) {
        if (valid) {
            $(parentSelector + " .message-box").removeClass('d-none').addClass('d-block ');
            $(parentSelector + " .message-box div").removeClass('alert-danger').addClass('alert-success').text('Your message sent successfully');
        } else {
            $(parentSelector + " .message-box").removeClass('d-none').addClass('d-block ');
            $(parentSelector + " .message-box div").removeClass('alert-success').addClass('alert-danger').text('Found error in the form. Please check again.');
        }
    }


    // login


    if ($("#loginForm").length) {
        $("#loginForm").validator().on("submit", function (event) {
            if (event.isDefaultPrevented()) {
                // do nothing
                // submitMSG(false, '#contact');
            } else {
                event.preventDefault();
                submitLoginForm();
            }
        });
    }

    function submitLoginForm() {
        // Initiate Variables With Form Content
        var email = $('#loginForm input[name="email"]').val();
        var password = $('#loginForm input[name="password"]').val();
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/api/login",
            data: "email=" + email + "&password=" + password,
            success: function success(res) {
                if (res.result == "success") {
                    localStorage.setItem('newworld-user', JSON.stringify(res.content[0].user));
                    localStorage.setItem('newworld-token', JSON.stringify(res.content[0].token));
                    formLoginSuccess();
                } else {
                    submitMSG(false, '#main');
                }
            }
        });
    }

    function formLoginSuccess() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('book-form').style.display = 'unset';
        $("#loginForm")[0].reset();
    }


    // register


    if ($("#registerForm").length) {
        $("#registerForm").validator().on("submit", function (event) {
            if (event.isDefaultPrevented()) {
                // do nothing
                // submitMSG(false, '#contact');
            } else {
                event.preventDefault();
                submitRegisterForm();
            }
        });
    }

    function submitRegisterForm() {
        // Initiate Variables With Form Content
        var first_name = $('#registerForm input[name="first_name"]').val();
        var last_name = $('#registerForm input[name="last_name"]').val();
        var email = $('#registerForm input[name="email"]').val();
        var password = $('#registerForm input[name="password"]').val();
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/api/register",
            data: "first_name=" + first_name + "&last_name=" + last_name + "&email=" + email + "&password=" + password,
            success: function success(res) {
                if (res.result == "success") {
                    localStorage.setItem('newworld-user', JSON.stringify(res.content[0].user));
                    localStorage.setItem('newworld-token', JSON.stringify(res.content[0].token));
                    formRegisterSuccess();
                } else {
                    submitMSG(false, '#main');
                }
            }
        });
    }

    function formRegisterSuccess() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('book-form').style.display = 'unset';
        $("#registerForm")[0].reset();
    }

    $(window).load(function () {

    });

})(jQuery, document, window);

function logout() {
    localStorage.removeItem('newworld-user');
    localStorage.removeItem('newworld-token');
    window.location.reload();
}
