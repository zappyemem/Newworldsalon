

function sendMail() {
    emailjs.send("gmail", "newworldsalon", {
    "from_name": document.getElementById("name").value,
    "from_email": document.getElementById("email").value, 
    "to_email": "newworldsalon20@gmail.com",
    "message_request": document.getElementById("message").value
    })

    .then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
    }, 
        function(error) {
       console.log("FAILED", error);
        
    });
     return false; 
}


