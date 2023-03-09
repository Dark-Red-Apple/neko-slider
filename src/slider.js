// NekoSlider
// Author: Alma Z
// ***! Copyright !****
// **Requirements:**
// el: slider container,
// slideClass: slide tags class,
// **Optional:**
// direction: 'left or right',
// loopTime: ms, if not given auto play is false
// leftNavIcon
// rightNavIcon
// transitionTime : in ms from 100 to 10000
// transitionStyle : linear, ease-out, ease-in, ease-out-in

class NekoSlider {
  curslide = 0
  prevSlide
  transitionTime = 1000
  transitionStyle = "ease-in-out"
  transitionTypeRight
  transitionTypeLeft
  transformQuickType
  loopTime
  intervId = []
  timeOutId = []
  auto = true
  direction = "right"
  slides
  hid = false // hidden is a keyword

  constructor(options) {
    this.options = options
    this.initilize()
    this.createNextPrevBut()
    if (this.auto) {
      this.showSlide()
      this.vis()
    }
  }

  initilize() {
    let { el: slideContainer, loopTime, direction, slideClass, transitionTime, transitionStyle } = this.options
    let transitionStyles = ["ease-in", "ease-in-out", "ease-out", "linear"]

    //Check if options exist
    if (!slideContainer) throw Error("The el does not exist")
    if (!loopTime) this.auto = false
    else if (!Number.isInteger(loopTime) || loopTime < 500) throw Error("The time duration is not a number more than 500ms")
    else this.loopTime = loopTime
    if (direction == "right" || direction == "left") this.direction = direction
    else if (direction != undefined) throw Error("The direction is not correct")
    if (transitionTime >= 100 && transitionTime <= 10000) this.transitionTime = transitionTime
    else if (transitionTime != undefined) throw Error("The transitionTime is not correct (ms from 100 to 1000)")
    if (transitionStyles.indexOf(transitionStyle) != -1) this.transitionStyle = transitionStyle
    else if (transitionStyle != undefined) throw Error("The transitionStyle is not correct")
    //assingments
    this.slides = slideContainer.querySelectorAll(`.${slideClass}`)
    const [activeSlide, ...inactiveSlides] = this.slides
    inactiveSlides.forEach((el) => el.classList.add(direction == "right" ? "left" : "right"))
    // this.direction=='right'? this.rightInit() : this.leftInit()
    this.transition = `right ${this.transitionTime}ms ${this.transitionStyle}`
    this.transitionTypeLeft = `left ${this.transitionTime}ms ${this.transitionStyle}`
    this.transformQuickType = `right 0.2s ${this.transitionStyle}`
  }

  createNextPrevBut() {
    const { el: slideContainer, rightNavIcon = "⪼", leftNavIcon = "⪻" } = this.options
    slideContainer.insertAdjacentHTML(
      "beforeend",
      `<i class="slide-nav right">${rightNavIcon}</i>
        <i class="slide-nav left">${leftNavIcon}</i>`
    )
    let leftNav = slideContainer.querySelector(".slide-nav.left")
    let rightNav = slideContainer.querySelector(".slide-nav.right")

    rightNav.addEventListener("click", () => {
      // This is used if the slider is not on the move, when reverse the direction, trouble
      // rightInit() Bring the slides in to the right starting position
      // setCurPrevSlides() Set the previous and current slide
      // goToRight(curslide, prevSlide) move to right
      // This part is a work in progess
      if (this.slides[this.curslide].offsetLeft == 0) {
        this.clearTimeoutInterval()
        this.rightInit()
        this.setCurPrevSlides()
        requestAnimationFrame(() => this.goToRight())

        // A timeout to prevent confilicts with transition time,
        // also remove all the timeouts stored in timeOutNavIds if one clicks more than once on the nav
        if (this.auto) {
          const localTimeoutId = setTimeout(() => {
            this.timeOutId.forEach((tiIdItem) => clearTimeout(tiIdItem))
            this.showSlide()
          }, this.transitionTime)
          this.timeOutId.push(localTimeoutId)
        }
      }
    })

    leftNav.addEventListener("click", () => {
      if (this.slides[this.curslide].offsetLeft == 0) {
        this.clearTimeoutInterval()
        this.leftInit()
        this.setCurPrevSlidesToLeft()

        // set a timeout or requestAnimFrame here to put a gap between first lefInit and goToLeft style changes, because it goes from -100 directly to 0. Strange. Only the first time.
        requestAnimationFrame(() => this.goToLeft())

        if (this.auto) {
          let localTimeoutId = setTimeout(() => {
            this.timeOutId.forEach((tiIdItem) => clearTimeout(tiIdItem))
            this.showSlide()
          }, this.transitionTime)
          this.timeOutId.push(localTimeoutId)
        }
      }
    })
  }

  showSlide() {
    this.clearTimeoutInterval()
    let intervId
    if (this.direction == "right") {
      intervId = this.requestInterval(() => {
        this.rightInit()
        this.setCurPrevSlides()
        this.goToRight()
      }, this.loopTime)
    } else {
      intervId = this.requestInterval(() => {
        this.leftInit()
        this.setCurPrevSlidesToLeft()
        this.goToLeft()
      }, this.loopTime)
    }

    // this.intervId.push(intervId.value)
  }

  requestInterval(fn, delay) {
    let requestAnimFrame = (function () {
        return (
          window.requestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60)
          }
        )
      })(),
      start = new Date().getTime(),
      handle = {}

    let loop = () => {
      handle.value = requestAnimFrame(loop)
      this.intervId.push(handle.value)
      let current = new Date().getTime()
      let delta = current - start

      //since the animFrame is cancled when hidden the second if won't run before this
      if (this.hid == true && delta >= delay / 2) {
        this.hid = false
        fn.call()
        start = new Date().getTime()
      } else if (delta >= delay) {
        fn.call()
        start = new Date().getTime()
      }
    }

    handle.value = requestAnimFrame(loop)
    this.intervId.push(handle.value)

    return handle
  }

  vis() {
    let hidden, visibilityChange
    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden"
      visibilityChange = "visibilitychange"
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden"
      visibilityChange = "msvisibilitychange"
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden"
      visibilityChange = "webkitvisibilitychange"
    }

    let handleVisibilityChange = () => {
      if (document[hidden]) {
        this.clearTimeoutInterval()
        this.hid = true
      } else {
        this.showSlide()
      }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || hidden === undefined) {
      console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.")
    } else {
      // Handle page visibility change
      document.addEventListener(visibilityChange, handleVisibilityChange, false)
    }
  }

  leftInit() {
    this.slides.forEach((slide) => {
      if (this.slides[this.curslide] != slide) {
        if (!(this.slides[this.curslide].style.right != 0 && this.slides[this.prevSlide] == slide)) {
          slide.style.transition = "unset"
          slide.classList.add("right")
          slide.classList.remove("active-slide")
          slide.classList.remove("prev-slide")
          slide.classList.remove("left")
        }
      }
    })
  }

  // to position slide in the right starting position
  rightInit() {
    this.slides.forEach((slide) => {
      if (this.slides[this.curslide] != slide) {
        if (!(this.slides[this.curslide].style.right != 0 && this.slides[this.prevSlide] == slide)) {
          slide.style.transition = "unset"
          slide.classList.add("left")
          slide.classList.remove("active-slide")
          slide.classList.remove("prev-slide")
          slide.classList.remove("right")
        }
      }
    })
  }

  //Go to right, default
  goToRight() {
    this.slides[this.curslide].classList.remove("right")
    this.slides[this.curslide].classList.remove("left")
    this.slides[this.curslide].classList.add("active-slide")
    this.slides[this.curslide].style.transition = this.transition

    this.slides[this.prevSlide].style.transition = this.transition
    this.slides[this.prevSlide].classList.remove("active-slide")
    this.slides[this.prevSlide].classList.add("left")
    this.slides[this.prevSlide].classList.add("prev-slide")
    this.slides[this.prevSlide].classList.add("right")
  }

  goToLeft() {
    this.slides[this.curslide].classList.remove("prev-slide")
    this.slides[this.curslide].classList.remove("right")
    this.slides[this.curslide].classList.add("left")
    this.slides[this.curslide].classList.add("active-slide")
    this.slides[this.curslide].style.transition = this.transition

    this.slides[this.prevSlide].style.transition = this.transition
    this.slides[this.prevSlide].classList.remove("active-slide")
    this.slides[this.prevSlide].classList.add("prev-slide")
    this.slides[this.prevSlide].classList.add("left")
  }

  clearTimeoutInterval() {
    this.intervId.forEach((idIn) => cancelAnimationFrame(idIn))
    this.intervId = []
    this.timeOutId.forEach((timIdItem) => clearTimeout(timIdItem))
    this.timeOutId = []
  }

  // Set the previous and current slide in right direction
  setCurPrevSlides() {
    this.prevSlide = this.curslide
    this.curslide++
    if (this.curslide > this.slides.length - 1) this.curslide = 0
  }

  // Set the previous and current slide in left direction
  setCurPrevSlidesToLeft() {
    this.prevSlide = this.curslide
    this.curslide--
    if (this.curslide < 0) this.curslide = this.slides.length - 1
  }
}

export default NekoSlider

// //⪻ ⪼
// let neko = new NekoSlider({
//     el: document.querySelector('#slider1'),
//     slideClass: 'slide',
//     loopTime: 6000,
//     direction: 'right',
//     rightNavIcon: '&#10095;',
//     leftNavIcon: '&#10094;',
//     transitionTime: 1000,
//     transitionStyle:"ease-in-out"
//     }
// )
// //⪻ ⪼
// let neko1 = new NekoSlider({
//     el: document.querySelector('#slider2'),
//     slideClass: 'slide',
//     loopTime: 4000,
//     direction: 'right',
//     rightNavIcon: '⪼',
//     leftNavIcon: '⪻',
//     transitionTime: 500,
//     transitionStyle:"ease-in-out"
//     }
// )
