'use strict';

(function ($) {
"use strict";
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

//Show map
$("#map").click(function() {
  $("#routemap").toggle();
  var H = $("#routemap").offset().top;
  $("html").animate({
    "scrollTop": H
  }, 800, );
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
  if (username != "" && password != "") {
    var url = "index_signed.html?username=" + username;
    window.location.href = url;
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

  if (email != "" && username != "" && password1 != "" && password2 != "" && password1 == password2) {
    var url = "index_signed.html?username=" + username;
    window.location.href = url;
  }
});



//add tags
function addTags() {
  var itemOriginal = document.getElementsByName("tagsInput");
  var arr = new Array(itemOriginal.length);
  for (var j = 0; j < itemOriginal.length; j++) {
    arr[j] = itemOriginal.item(j).value;
  }
  var str = '<div class="row"><div class="col-md-2"></div><div class="col-md-5"><input name="tagsInput" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></div> </div>';
  document.getElementById("tags").innerHTML += str;
  var itemNew = document.getElementsByName("tagsInput");
  for (var i = 0; i < arr.length; i++) {
    itemNew.item(i).value = arr[i];
  }
}

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

$("#back").click(function(){
  alert(1);
  history.go(-1):
});

function shuffle(arra1,seed) {
    var ctr = arra1.length, temp, index;
// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(random(seed++)*ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function random(seed) {
  var x =  Math.sin(seed)*10000;
  return x - Math.floor(x);
}
})();