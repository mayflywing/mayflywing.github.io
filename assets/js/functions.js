
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
$(document).on("click","#sign_out",function(){
  $.confirm({
    title:"",
    content: "Are you sure you want to sign out?",
    typeAnimated: true,
    buttons: {
        Yes: {
            text: 'Yes',
            btnClass: 'btn-red',
            action: function(Yes){
              sessionStorage.removeItem('__signed__');
              sessionStorage.removeItem('__username__');
              location.reload();
              //window.location.href = "index.html";
            }
        },
        close: function () {
        }
    }
  })
});



    //check for required inputs
    $("input[name='required']").blur(function() {
      var val = $(this).val();
      if (val == "") {
        $(this).addClass("is-invalid");
      } else {
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
      }
    });

    //confirm password
    $("#ConfirmPassword").blur(function() {
      var password1 = $("#Password_").val();
      var password2 = $(this).val();
      if (password2 == "" || password1 != password2) {
        $(this).addClass("is-invalid");
      } else {
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
      }
    });

    //click sign_in
    $("#sign_in").click(function() {
      var username = $("#Username").val();
      var password = $("#Password").val();
      if (username == "") {
        $("#Username").addClass("is-invalid");
      } else {
        $("#Username").removeClass("is-invalid");
        $("#Username").addClass("is-valid");
      }
      if (password == "") {
        $("#Password").addClass("is-invalid");
      } else {
        $("#Password").removeClass("is-invalid");
        $("#Password").addClass("is-valid");
      }
      if ((username ==__username__ && password ==__password__)||(username!=null&&username==sessionStorage.getItem('__newusername__')&&password!=null&&password==sessionStorage.getItem('__newpassword__')))
       {
        //var url = "index_signed.html?username=" + username;
        //window.location.href = url;
        sessionStorage.setItem('__signed__','true');
        sessionStorage.setItem('__username__',username);
        location.reload();
      }
      else {
        $.alert("Sorry, your username or password is incorrect.");
        $("#Username").addClass("is-invalid");
        $("#Password").addClass("is-invalid");
      }
    });

    //click sign_up
    $("#sign_up").click(function() {
      var email = $("#Email").val();
      var username = $("#Username_").val();
      var password1 = $("#Password_").val();
      var password2 = $("#ConfirmPassword").val();
      if (email == "") {
        $("#Email").addClass("is-invalid");
      } else {
        $("#Email").removeClass("is-invalid").addClass("is-valid");
      }
      if (username == "") {
        $("#Username_").addClass("is-invalid");
      } else {
        $("#Username_").removeClass("is-invalid").addClass("is-valid");
      }
      if (password1 == "") {
        $("#Password_").addClass("is-invalid");
      } else {
        $("#Password_").removeClass("is-invalid").addClass("is-valid");
      }
      if (password2 == "" || password1 != password2) {
        $("#ConfirmPassword").addClass("is-invalid");
      } else {
        $("#ConfirmPassword").removeClass("is-invalid").addClass("is-valid");
      }
      if (email != null && username != null && password1 != null && password2 != null) {
        if (email != "" && username != "" && password1 != "" && password2 != "" && password1 == password2) {
          sessionStorage.setItem('__signed__', "true");
          sessionStorage.setItem('__username__', username);
          sessionStorage.setItem('__newusername__', username);
          sessionStorage.setItem('__newpassword__', password1);
          location.reload();
        } else {
          $.alert("Sorry, please check your inputs!");
        }
      }
    });
    
    //sign-in required
    $("#saved_trips").click(function(){
      if(sessionStorage.getItem('__signed__') != "true"){
        $.alert("Please sign in first!");
    }
    else{
      window.location.href="saved.html";
    }
  });
  
  //init
  $(function() {
    //userbuttons
    if (sessionStorage.getItem('__signed__') == "true") {
      $("#userbuttons").html('<button type="button" id="sign_out" class="btn btn-outline-danger my-2 my-sm-0">Sign Out</button>');
      var welcome_string = "Welcome, " + sessionStorage.getItem('__username__') + "!";
      $("#welcome_part").html(welcome_string);
    } else {
      $("#userbuttons").html(
        '<button class="btn btn-outline-success my-2 my-sm-0" type="button" data-toggle="modal" data-target="#Moda1">Sign in</button><button class="btn btn-outline-success my-2 my-sm-0" type="button" data-toggle="modal" data-target="#Moda2">Sign up</button>'
        );
    }
  });
