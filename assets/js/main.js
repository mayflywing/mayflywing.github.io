'use strict';

(function ($) {
"use strict";


	/**
   * [isMobile description]
   * @type {Object}
   */
	window.isMobile = {
		Android: function Android() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function BlackBerry() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function iOS() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function Opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function Windows() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function any() {
			return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
		}
	};
	window.isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
	window.windowHeight = window.innerHeight;
	window.windowWidth = window.innerWidth;

	/**
   * Match height 
   */
	$('.row-eq-height > [class*="col-"]').matchHeight();

	var myEfficientFn = debounce(function () {
		$('.row-eq-height > [class*="col-"]').matchHeight();
	}, 250);

	window.addEventListener('resize', myEfficientFn);

	/**
   * [debounce description]
   * @param  {[type]} func      [description]
   * @param  {[type]} wait      [description]
   * @param  {[type]} immediate [description]
   * @return {[type]}           [description]
   */
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
				    args = arguments;
			var later = function later() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	$(document).ready(function () {
		$("#datepicker").datepicker();
	});
	/**
   * Select2
   */

	$(".select__module").select2({
		placeholder: "What would you like to do ?"
	});

	$(".select__module2").select2({
		placeholder: "Where would you like to go ?"
	});

	// $(".select__module").on('select2:opening select2:closing', function( event ) {
	//     var $searchfield = $(this).parent().find('.select2-search__field');
	//     $searchfield.prop('disabled', true);
	// });
	/**
   * Masonry
   */
	$('.grid__inner').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer'
	});

	/**
   * grid css
   */

	$.fn.reCalWidth = function () {
		var $self = $(this);
		$self.on('reCalWidth', function () {
			var _self = $(this);
			_self.css('width', '');
			var width = Math.floor(_self.width());
			_self.css('width', width + 'px');
			var height = Math.floor(_self.parent().children('.wide').width() / 2);
			_self.parent().children('.wide').css('height', height + 'px');
		});
		$(window).on('resize', function () {
			$self.trigger('reCalWidth');
		});
	};
	function work() {
		$('.grid-css').each(function () {
			var workWrapper = $(this),
				    workContainer = $('.grid__inner', workWrapper),
				    filters = $('.filter', workWrapper),
				    filterCurrent = $('.current a', filters),
				    filterLiCurrent = $('.current', filters),
				    duration = 0.3;
			workContainer.imagesLoaded(function () {

				// Fix Height
				if (workWrapper.hasClass('grid-css--fixheight')) {
					workContainer.find('.grid-item__content-wrapper').matchHeight();
				}

				workContainer.isotope({
					layoutMode: 'masonry',
					itemSelector: '.grid-item',
					transitionDuration: duration + 's',
					masonry: {
						columnWidth: '.grid-sizer'
					}
					// hiddenStyle: {},
					// visibleStyle: {}
				});
			});
			filters.on('click', 'a', function (e) {
				e.preventDefault();
				var $el = $(this);
				var selector = $el.attr('data-filter');
				filters.find('.current').removeClass('current');
				$el.parent().addClass('current');
				workContainer.isotope({
					filter: selector
				});
			});

			filters.find('.select-filter').change(function () {
				var $el = $(this);
				var selector = $el.val();
				workContainer.isotope({
					filter: selector
				});
			});

			$('.grid-item', workWrapper).reCalWidth();
		});
	}
	work();

	/**
   * Swiper
   */
	$('.swiper__module').each(function () {
		var self = $(this),
			    wrapper = $('.swiper-wrapper', self),
			    optData = eval('(' + self.attr('data-options') + ')'),
			    optDefault = {
			paginationClickable: true,
			pagination: self.find('.swiper-pagination-custom'),
			nextButton: self.find('.swiper-button-next-custom'),
			prevButton: self.find('.swiper-button-prev-custom'),
			spaceBetween: 30
		},
			    options = $.extend(optDefault, optData);
		wrapper.children().wrap('<div class="swiper-slide"></div>');
		var swiper = new Swiper(self, options);

		function thumbnails(selector) {

			if (selector.length > 0) {
				var wrapperThumbs = selector.children('.swiper-wrapper'),
					    optDataThumbs = eval('(' + selector.attr('data-options') + ')'),
					    optDefaultThumbs = {
					spaceBetween: 10,
					centeredSlides: true,
					slidesPerView: 3,
					touchRatio: 0.3,
					slideToClickedSlide: true,
					pagination: selector.find('.swiper-pagination-custom'),
					nextButton: selector.find('.swiper-button-next-custom'),
					prevButton: selector.find('.swiper-button-prev-custom')
				},
					    optionsThumbs = $.extend(optDefaultThumbs, optDataThumbs);
				wrapperThumbs.children().wrap('<div class="swiper-slide"></div>');
				var swiperThumbs = new Swiper(selector, optionsThumbs);
				swiper.params.control = swiperThumbs;
				swiperThumbs.params.control = swiper;
			}
		}
		thumbnails(self.next('.swiper-thumbnails__module'));
	});

	/**
  * Footer
  */

	$('#back-to-top').on('click', function (e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 700);
	});
	//*
	// Header
	//*


	var wh = $(window).height(),
		    half = wh / 2,
		    headerHeight = $('header').outerHeight();

	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();

		if (scrollTop >= half) {
			$('header').addClass('is-scroll');
		} else {
			$('header').removeClass('is-scroll');
		}
	});

	$('.onepage-nav').dropdownMenu({
		menuClass: 'onepage-menu',
		breakpoint: 1200,
		toggleClass: 'active',
		classButtonToggle: 'navbar-toggle',
		subMenu: {
			class: 'sub-menu',
			parentClass: 'menu-item-has-children',
			toggleClass: 'active'
		}
	});

	$('.onepage-nav').onePageNav({
		currentClass: 'current-menu-item',
		scrollOffset: headerHeight
	});

	$(document).ready(function () {
		$('.header__lang_box').hide();
		$('.header__lang > a').click(function (e) {
			e.preventDefault();
			$(this).next().slideToggle();
		});
	});

	//*
	// Back to top
	//*

	$(window).scroll(function () {
		var wh = $(window).height(),
			    scrollTop = $(window).scrollTop();

		if (scrollTop >= wh) {
			$('#back-to-top').addClass('is-visible');
		} else {
			$('#back-to-top').removeClass('is-visible');
		}
	});

	$(document).on('click', '.swiper-button-custom.style-02 .swiper-button-prev-custom', function (event) {
		event.preventDefault();
		$(".swiper-container--style1 .swiper-button-prev-custom").click();
	});

	$(document).on('click', '.swiper-button-custom.style-02 .swiper-button-next-custom', function (event) {
		event.preventDefault();
		$(".swiper-container--style1 .swiper-button-next-custom").click();
	});

	var test = $('.swiper-container--style1').height();
	// alert(test);
	$('.swiper-button-custom.style-02').height(test).css('top', -test);

	var h_boxSearch = $('.box-search-wrapper').outerHeight();
	// $('.box-search-wrapper').before('<div class="fixed_height_box_search" style="height:' + h_boxSearch + 'px"></div>');

	// var vitri = $('.box-search').offset().top;
	// $(window).scroll(function(event) {
	// var scrollTop = $(window).scrollTop();

	// if(scrollTop>vitri) {
	// 	$('.box-search-wrapper').addClass('sticky');
	// }
	// else {
	// 	$('.box-search-wrapper').removeClass('sticky');
	// }

	// if(scrollTop>vitri) {
	// 	$('.header.header--fixed').css('position', 'absolute');
	// }
	// else {
	// 	$('.header.header--fixed').css('position', 'fixed');
	// }
	// });

	var waypoint = new Waypoint({
		element: document.getElementById('box-search'),
		handler: function handler(direction) {
			console.log('Scrolled to waypoint!');
		}
	});
	
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
	
})(jQuery);