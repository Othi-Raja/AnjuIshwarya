/**
 *	axo - Personal Portfolio Templete (HTML)
 *	Author: codeefly
 *	Author URL: http://themeforest.net/user/codeefly
 *	Copyright © axo by codeefly. All Rights Reserved.
 **/

(function ($) {
  "use strict";
  var axo = {
    /* axo init */
    init() {
      axo.imgToSvg(),
        axo.smoothScrolling(),
        axo.customMouse(),
        axo.scrollToActiveNav(),
        axo.feedBackSlider(),
        axo.clientSlider(),
        axo.filter(),
        axo.counter(),
        axo.magnific_porpup(),
        axo.navbar_toggle(),
        axo.stickNav(),
        axo.tilt(),
        axo.moviing_effect();
    },

    preloader() {
      let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
        navigator.userAgent
      )
        ? true
        : false;
      let preloader = document.getElementById("preloader");

      if (preloader) {
        if (!isMobile) {
          setTimeout(function () {
            preloader.classList.add("preloaded");
          }, 800);
          setTimeout(function () {
            preloader.remove();
          }, 2000);
        } else {
          preloader.remove();
        }
      }
    },
    /* Svg to image */
    imgToSvg() {
      document.querySelectorAll("img.svg").forEach((el) => {
        const imgID = el.getAttribute("id");
        const imgClass = el.getAttribute("class");
        const imgURL = el.getAttribute("src");
        fetch(imgURL)
          .then((data) => data.text())
          .then((response) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/html");
            let svg = xmlDoc.querySelector("svg");
            if (typeof imgID !== "undefined") {
              svg.setAttribute("id", imgID);
            }

            if (typeof imgClass !== "undefined") {
              svg.setAttribute("class", imgClass + " replaced-svg");
            }

            svg.removeAttribute("xmlns:a");
            if (el.parentNode) {
              el.parentNode.replaceChild(svg, el);
            }
          });
      });
    },
    /* Smooth Scrolling */
    smoothScrolling() {
      $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[href="#details-popup"]')
        .not(".blog-item a")
        .not(".blog-item a")
        .not(".blog-item a")
        .not(".link")
        .click(function (event) {
          // On-page links
          if (
            location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
          ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length
              ? target
              : $("[name=" + this.hash.slice(1) + "]");
            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $("html, body").animate(
                {
                  scrollTop: target.offset().top,
                },
                750,
                function () {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) {
                    // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  }
                }
              );
            }
          }
        });
    },
    /* Custom Mouse */
    customMouse() {
      const e = document.querySelector(".cursor");
      let n,
        i = 0,
        o = !1;
      setTimeout(() => {
        window.onmousemove = function (s) {
          o ||
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        };
      }, 1000);
      $("body").on(
        "mouseenter",
        "a, .c-pointer, button , .works-list-ul li",
        function () {
          e.classList.add("cursor-hover");
        }
      ),
        $("body").on(
          "mouseleave",
          "a, .c-pointer, button , .works-list-ul li",
          function () {
            ($(this).is("a") && $(this).closest(".c-pointer").length) ||
              e.classList.remove("cursor-hover");
          }
        ),
        (e.style.visibility = "visible");
    },
    /* Scroll nav */
    scrollToActiveNav() {
      $(".menus").onePageNav();
    },
    /* Slider */
    feedBackSlider() {
      new Swiper(".testimonial-sliders", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        navigation: {
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        },
        breakpoints: {
          // when window width is >= 1024px
          920: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      });
    },
    clientSlider() {
      new Swiper(".client-slider", {
        spaceBetween: 1,
        slidesPerView: 2,
        centeredSlides: false,
        roundLengths: true,
        loop: true,
        loopAdditionalSlides: 30,
        autoplay: {
          delay: 4000,
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            roundLengths: true,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: false,
            roundLengths: true,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 30,
            centeredSlides: true,
            roundLengths: true,
          },
        },
      });
    },
    /* Isotope Filter */
    filter() {
      if ($(".portfolio-container").length) {
        $(".portfolio-container").imagesLoaded(function () {
          // items on button click
          $(".filter-btn").on("click", "a", function () {
            var filterValue = $(this).attr("data-filter");
            $grid.isotope({
              filter: filterValue,
            });
          });
          // menu active class
          $(".filter-btn a").on("click", function (e) {
            $(this).siblings(".active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
          });
          var $grid = $(".portfolio-items").isotope({
            itemSelector: ".item",
            percentPosition: true,
            masonry: {
              columnWidth: 3,
            },
          });
        });
      }
    },
    // counter
    counter() {
      $(".count").counterUp({
        delay: 10,
        time: 1000,
      });
    },
    magnific_porpup() {
      $(".play-btn,.youtube a,.vimeo a,.soundcloud a").each(function () {
        $(this).magnificPopup({
          type: "iframe",
          mainClass: "mfp-fade",
          preloader: false,
          fixedContentPos: true,
        });
      });
      $(".popup a").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
        mainClass: "mfp-fade",
      });
      $(".details a,.blog-item a,.link").magnificPopup({
        type: "inline",
        overflowY: "auto",
        closeBtnInside: true,
        mainClass: "mfp-fade axo-popup",
      });
    },
    navbar_toggle() {
      let menutoggle = $(".toggle"),
        header = $("header"),
        nav = $(".menus");
      $(window).resize(function () {
        if ($(window).width() > 991.97) {
          $(nav).css({ display: "flex" });
          header.removeClass("active");
        } else {
          $(nav).css({ display: "none" });
        }
      });
      menutoggle.on("click", function () {
        nav.slideToggle();
        if (header.hasClass("active")) {
          header.removeClass("active");
          nav.slideUp();
        } else {
          header.addClass("active");
          nav.slideDown();
        }
      });
    },
    stickNav() {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $("header").addClass("fixed");
        } else {
          $("header").removeClass("fixed");
        }
      });
    },
    tilt() {
      $(".service-card").tilt({
        maxTilt: 6,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 500,
        transition: true,
      });
    },
    moviing_effect() {
      var detail = document.querySelectorAll(".moving-effect");
      var offset = 0;
      detail.forEach((element) => {
        var direction = element.getAttribute("data-direction");
        window.addEventListener("scroll", function () {
          offset = window.scrollY;
          var h = window.innerHeight;
          var i =
            element.getBoundingClientRect().top + window.scrollY - offset - h;
          if (element.getAttribute("data-reverse") == "yes") {
            i *= -1;
          }
          var x = direction === "x" ? (i * 70) / h : 0;
          var y = direction === "x" ? 0 : (i * 70) / h;
          if (element.getAttribute("data-reverse") == "yes") {
            i *= -1;
          }
          if (i * -1 < h + 300 && i < 300) {
            element.style.transform = `translate3d(${x}px,${y}px, 0px)`;
          }
        });
      });
    },
  };

  $(document).ready(function () {
    axo.init();
  }),
    $(window).on("load", function () {
      axo.preloader();
    });
})(jQuery);
