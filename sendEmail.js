console.log('Its working');

function sendMail(contactForm) {
    emailjs.send("gmail", "newworldsalon", {
    "from_name": contactForm.name.value,
    "from_email": contactForm.email.value,
    "message_request": contactForm.message.value
    })
    .then(
        function(response) {
          console.log("SUCCESS", response);
    }, 
        function(error) {
       console.log("FAILED", error);
        
    });
     return false; 
}

