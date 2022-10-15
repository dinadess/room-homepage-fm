"use strict";

//Mobile Menu Handler
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const backdropEl = document.querySelector(".backdrop");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", function () {
  nav.classList.add("opened");
  backdropEl.classList.add("visible");
});

const closeNav = function () {
  if (nav.classList.contains("opened")) {
    nav.classList.remove("opened");
    backdropEl.classList.remove("visible");
  }
};

closeBtn.addEventListener("click", closeNav);
backdropEl.addEventListener("click", closeNav);

//Slider
const slides = document.querySelectorAll(".slide");
const sliderNav = document.querySelector(".slider-nav");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

let slideIndex = 0;
const maxSlide = slides.length - 1;
let browserWidth = window.innerWidth;

const positionSliderNav = function () {
  sliderNav.style.top =
    slides[0].querySelector("picture").clientHeight -
    sliderNav.clientHeight +
    "px";
};

if (browserWidth <= 768) {
  window.addEventListener("resize", function () {
    browserWidth = window.innerWidth;
    positionSliderNav();
  });
  window.addEventListener("load", function () {
    positionSliderNav();
  });
}

let loadSlide = function (slide) {
  slides.forEach((s, i) => {
    // Slides are positioned relatively, each one has the same value of translateX
    s.style.transform = `translateX( ${-100 * slideIndex}%)`;
    s.style.visibility = "hidden";

    if (slide === i) {
      s.style.visibility = "visible";
    }
  });
};

loadSlide(0);

const prevSlide = function () {
  if (slideIndex === 0) {
    slideIndex = maxSlide;
  } else {
    slideIndex--;
  }

  loadSlide(slideIndex);
  closeNav();
};

const nextSlide = function () {
  if (slideIndex === maxSlide) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }

  loadSlide(slideIndex);
  closeNav();
};

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Load new slide when user clicks left or right buttons on keyboard
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});
