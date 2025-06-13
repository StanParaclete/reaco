'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

$('.dropdown-toggle').click(function(event) {
  event.preventDefault();
  $('.dropdown-menu').toggle();
});

$(document).click(function (e) {
  if (!$('.dropdown').has(e.target).length) {
      $('.dropdown-menu').hide();
  }
});







// Live Updates Configuration
const liveUpdates = [
  {
    image: "images/about-abs-image.jpg",
    title: "BPM Workshop 2024",
    date: "2024-07-15",
    text: "Register now for Built Professionals Masterclass!",
    link: "event-details.html?id=1"
  },
  {
    image: "images/about-abs-image.png",
    title: "Environmental Summit",
    date: "2024-08-20",
    text: "Early bird registration open",
    link: "event-details.html?id=2"
  },
  {
    image: "images/about-banner.png",
    title: "REACO Conference",
    date: "2024-09-10",
    text: "Call for papers now open",
    link: "event-details.html?id=3"
  }
];

// Double the array for seamless looping
const duplicatedUpdates = [...liveUpdates, ...liveUpdates];

function updateLiveTicker() {
  const container = document.getElementById('live-updates-container');
  container.innerHTML = duplicatedUpdates.map((update, index) => `
    <div class="update-item">
      <div class="update-image">
        <img src="${update.image}" alt="${update.title}">
      </div>
      <div class="update-content">
        <h3 class="update-title">${update.title}</h3>
        <p class="update-date">${new Date(update.date).toLocaleDateString()}</p>
        <p class="update-text">${update.text}</p>
      </div>
    </div>
  `).join('');
}

// Initialize
updateLiveTicker();

// Reset animation when it completes
document.querySelector('.ticker-content').addEventListener('animationiteration', () => {
  // Remove and re-add animation to maintain smoothness
  const content = document.querySelector('.ticker-content');
  content.style.animation = 'none';
  void content.offsetWidth; // Trigger reflow
  content.style.animation = 'ticker 40s linear infinite';
});

// Pause on hover
document.querySelector('.live-ticker').addEventListener('mouseenter', () => {
  document.querySelector('.ticker-content').style.animationPlayState = 'paused';
});

document.querySelector('.live-ticker').addEventListener('mouseleave', () => {
  document.querySelector('.ticker-content').style.animationPlayState = 'running';
});