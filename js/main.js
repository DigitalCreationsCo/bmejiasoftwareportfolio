(function($) {
  "use strict";

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });
  
  /*==============================
    Smooth Scroll Function
  ===============================*/
  //== Smooth Scroll for Nav Menu ==//
  
  /*==============================
    Navbar Show and Hide
  ===============================*/
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200) {
      $("#main-nav").slideDown(700);
    } else {
      $("#main-nav").slideUp(700);
    }
  });

  /*==============================
    Responsive Menu
  ===============================*/
  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  /*==============================
    Typed JS
  ===============================*/
  var typed = $(".typed");
  $(function() {
    var strings = $('.typed-items').text();
    strings = $('.typed-items').data('typed-person') + ',' + strings;
    strings = strings.split(',');

    typed.typed({
      strings: strings,
      typeSpeed: 70,
      loop: true,
    });
  });

  /*==============================
    Email JS
  ===============================*/
  const btn = document.getElementById('send_button');
  
  $('#email_form').on('submit', function(event) {
    event.preventDefault(); // prevent reload
    btn.value = "Sending..";

    const fromName = $('#from_name').val();
    const fromEmail = $('#from_email').val();
    const message = $('#message').val();

    console.log(fromEmail);

    if(!fromName){
      $('.modal-text').html('Please enter your name.');
      $('#email_Modal').modal("toggle");
    } else if(!fromEmail){
      $('.modal-text').html('Please enter your email address.');
      $('#email_Modal').modal("toggle");
    } else if(!message){
      $('.modal-text').html('Please enter a message. :D');
      $('#email_Modal').modal("toggle");
    } else {
      Email.send({
        SecureToken : "b80ce08f-3af3-4aa0-8b98-34822fb2f1b0",
        To : 'bmejiadeveloper2@gmail.com',
        From : 'bmejiadeveloper2@gmail.com',
        Subject : "New Message from " + fromName + " at: " + fromEmail,
        Body : message
      }).then((message) => {
        console.log(message);
        if (message == "OK") {
          $('.modal-text').html('Thank you! I look forward to reading your message and responding within 24 hours!');
          $('#email_Modal').modal("toggle");
        } else if (
          message.startsWith("The parameter 'address' cannot be an empty string.") || 
          message.startsWith("The specified string is not in the form required for an e-mail address.") ||
          message.startsWith("Mailbox name not allowed. The server response was: Envelope FROM")) {
          $('.modal-text').html('The email address is not valid.');
          $('#email_Modal').modal("toggle");
        }
        $('.modal').click(function(){
          $(this).modal("toggle");
        });
      });
    }
  });

})(jQuery);