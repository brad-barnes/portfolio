const nav = document.getElementById("mainNav");
const screenWidth = document.querySelector("html").clientWidth;
const cta = document.querySelector(".CTAbtn");
const name = document.querySelector(".name");
const btnArrow = document.querySelector(".btnArrow");

(function () {
  if (screenWidth < 800) {
    nav.classList.remove("navbar-dark");
    nav.classList.add("navbar-light");
    nav.classList.add("bg-light");
  }
})();

// cta.addEventListener("click", function () {
//   console.log("CLICKED");
// });

cta.addEventListener("mouseover", function () {
  name.classList.remove("nameOff");
  name.classList.add("nameOn");

  // btnArrow.classList.remove("btnArrowOff");
  // btnArrow.classList.add("btnArrowOn");

  cta.classList.remove("CTAbtnColorOff");
  cta.classList.add("CTAbtnColorOn");
});

cta.addEventListener("mouseout", function () {
  name.classList.remove("nameOn");
  name.classList.add("nameOff");

  // btnArrow.classList.remove("btnArrowOn");
  // btnArrow.classList.add("btnArrowOff");

  cta.classList.remove("CTAbtnColorOn");
  cta.classList.add("CTAbtnColorOff");
});

window.addEventListener("resize", function () {
  if (window.innerWidth < 800) {
    nav.classList.remove("navbar-dark");
    nav.classList.add("navbar-light");
    nav.classList.add("bg-light");
  }
  if (window.scrollY === 0 && window.innerWidth >= 800) {
    nav.classList.remove("navbar-light");
    nav.classList.remove("bg-light");
    nav.classList.add("navbar-dark");
  }
});

window.addEventListener("scroll", function () {
  if (window.scrollY === 0 && window.innerWidth > 800) {
    nav.classList.remove("navbar-light");
    nav.classList.remove("bg-light");
    nav.classList.add("navbar-dark");
  }
  if (window.scrollY > 0 && window.innerWidth > 800) {
    nav.classList.remove("navbar-dark");
    nav.classList.add("navbar-light");
    nav.classList.add("bg-light");
  }
});

window.onload = init();

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  canvas.width = 2000;
  canvas.height = window.innerHeight;
  canvas.addEventListener("mousemove", MouseMove, false);

  mouse = { x: 0, y: 0 };
  particleHolder = [];
  x = 100;
  y = 100;
  angle = 0.2;
  radius = 50;
  particleCount = 1000;

  color = [
    "rgba(192, 192, 192, 0.5)",
    "rgba(224, 224, 224, 0.5)",
    "rgba(160, 160, 160, 0.5)",
    "rgba(128, 128, 128, 0.5)",
    "rgba(96, 96, 96, 0.5)",
  ];

  function MouseMove(event) {
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetLeft;
  }
  for (i = 0; i < particleCount; i++) {
    particleHolder.push(new generateParticles());
  }
  function generateParticles() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.color = color[Math.floor(Math.random() * color.length)];
    this.rad = Math.floor(Math.random() * 7);
  }
  function vibrate() {
    // if (canvas.width < document.documentElement.clientWidth) {
    //   canvas.width = document.documentElement.clientWidth;
    //   generateParticles();
    // }

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var j = 0; j < particleHolder.length; j++) {
      var p = particleHolder[j];
      var distanceX = p.x - mouse.x;
      var distanceY = p.y - mouse.y;
      particleDistance = Math.sqrt(
        distanceX * distanceX + distanceY * distanceY
      );

      particleMouse = Math.max(
        Math.min(75 / (particleDistance / p.rad), 10),
        0.1
      );
      context.beginPath();
      context.fillStyle = p.color;
      context.arc(
        p.x + Math.sin(angle++ * Math.cos(radius++)),
        p.y - Math.cos(angle++ * Math.sin(radius++)),
        p.rad * particleMouse,
        Math.PI * 2,
        false
      );
      context.fill();
    }
  }
  setInterval(vibrate, 200);
}

// ScrollSpy
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
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
