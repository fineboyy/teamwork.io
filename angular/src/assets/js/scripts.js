$('.mail-choice').change(function() {
    if($(this).is(":checked")) {
      console.log("jquery is working")
        $(this).parent().addClass('selected-bg');
  } else {
    $(this).parent().removeClass('selected-bg');
  }
});


document.querySelectorAll('.mail-choice')

const colorInput = document.getElementById("colorpicker");

colorInput.addEventListener("input", (e) => {
 document.body.style.setProperty("--button-color", e.target.value);
});

$('.inbox-calendar').click(function(){
  $('.calendar-container').toggleClass('calendar-show');
 $('.inbox-container').toggleClass('hide');
 $('.mail-detail').toggleClass('hide'); 
});
