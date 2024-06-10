const sliderWrapper = document.querySelector(".slider-wrapper");
const rightSlide = document.querySelector(".slide-right");
const leftSlide = document.querySelector(".slide-left");
const buttonUp = document.querySelector(".button-up");
const buttonDown = document.querySelector(".button-down");
const numberOfSlides = rightSlide.querySelectorAll("div").length;

let currentSlideIndex = 0;

leftSlide.style.top = `-${(numberOfSlides - 1) * 100}vh`;

const moveSlide = (direction) => {
  const sliderHeight = sliderWrapper.clientHeight;
  if (direction === "up") {
    currentSlideIndex++;
    if (currentSlideIndex > numberOfSlides - 1) currentSlideIndex = 0;
  } else if (direction === "down") {
    currentSlideIndex--;
    if (currentSlideIndex < 0) currentSlideIndex = numberOfSlides - 1;
  }
  rightSlide.style.transform = `translateY(-${currentSlideIndex * sliderHeight}px)`;
  leftSlide.style.transform = `translateY(${currentSlideIndex * sliderHeight}px)`;
};

buttonUp.addEventListener("click", () => moveSlide("up"));
buttonDown.addEventListener("click", () => moveSlide("down"));
