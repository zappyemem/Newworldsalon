function sendEmail(contactForm) {
    emailjs.send("gmail", "newworld", {
    "from_name": contactForm.Name.value,
    "from_email": contactForm.Email.value,
    "message": contactForm.Messagesummary.value
    })
    .then(
        function(response) {
          console.log('SUCCESS!', response);
    }, 
        function(error) {
       console.log('FAILED', error);
    });
}
