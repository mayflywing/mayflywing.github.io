
//user icon toggle
$("#usericon").click(function() {
  $("#userbuttons").toggle();
});

//Explore more
$("#showmore").click(function() {
  $("#siliding_images").toggle();
  var H = $("#hidden_images").offset().top;
  $("html").animate({
    "scrollTop": H
  }, 800, );
});

//sign out
$("#sign_out").confirm({
  title:"",
  content: "Are you sure you want to sign out?",
  typeAnimated: true,
  buttons: {
      Yes: {
          text: 'Yes',
          btnClass: 'btn-red',
          action: function(Yes){
            window.location.href = "index.html";
          }
      },
      close: function () {
      }
  }
});


