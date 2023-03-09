import NekoSlider from "./slider"

//⪻ ⪼
const neko = new NekoSlider({
  el: document.querySelector("#slider1"),
  slideClass: "slide",
  loopTime: 6000,
  direction: "right",
  rightNavIcon: "&#10095;",
  leftNavIcon: "&#10094;",
  transitionTime: 1000,
  transitionStyle: "ease-in-out",
})

//⪻ ⪼
const neko1 = new NekoSlider({
  el: document.querySelector("#slider2"),
  slideClass: "slide",
  loopTime: 4000,
  direction: "right",
  rightNavIcon: "⪼",
  leftNavIcon: "⪻",
  transitionTime: 500,
  transitionStyle: "ease-in-out",
})
