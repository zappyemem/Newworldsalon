document.addEventListener("DOMContentLoaded", function () {
    console.log('its in');
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('book-form').style.display = 'none';
    if (localStorage.getItem('newworld-user')) {
        document.getElementById('book-form').style.display = 'unset';
        document.getElementById('login-form').style.display = 'none';
        initBook();
    } else {
        document.getElementById('login-form').style.display = 'unset';
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('book-form').style.display = 'none';
    }
});

function showRegister() {
    document.getElementById('register-container').style.display = 'unset';
    document.getElementById('login-container').style.display = 'none';
}

function showLogin() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'unset';
}

function bookForm() {
    event.preventDefault();
    submitBookForm();
}

function initBook() {
    if ($("#booksForm").length) {
        $("#booksForm").validator().on("submit", function (event) {
            if (event.isDefaultPrevented()) {
                // do nothing
                event.preventDefault();
                console.log(event.error());
                // submitMSG(false, '#contact');
            } else {
                event.preventDefault();
                submitBookForm();
            }
        });
    }
}

function submitBookForm() {
    // Initiate Variables With Form Content
    var first_name = $('#booksForm input[name="first_name"]').val();
    var last_name = $('#booksForm input[name="last_name"]').val();
    var date = $('#booksForm input[name="date"]').val();
    var time = $('#booksForm input[name="time"]').val();
    var message = $('#booksForm textarea[name="message"]').val();
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/api/book/add",
        beforeSend: function (xhr) {
            token = 'Bearer ' + localStorage.getItem('newworld-token');
            console.log(token);
            xhr.setRequestHeader('Authorization', token);
        },
        data: "first_name=" + first_name + "&last_name=" + last_name + "&date=" + date + "&time=" + time + "&message=" + message,
        success: function success(res) {
            if (res.result == "success") {
                formBookSuccess();
            } else {
                // submitMSG(false, '#main');
            }
        }
    });
}

function formBookSuccess() {
    $("#booksForm")[0].reset();
}
