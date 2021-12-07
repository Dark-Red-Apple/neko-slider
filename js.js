let slideMain = document.querySelector('.slider-container')
let slides = document.querySelectorAll('.slider-container .slide')
let slideNav = document.querySelectorAll('.slider-container .slide-nav')
// slideMain.style.height = slides[0].querySelector('img').offsetHeight +'px'  
let curslide = 0
let prevSlide
let interv 
const transformType = "transform 1s linear"
const transformQuickType = "transform 0.2s linear"
let intervId = []
let timeOutId =[]
let timeOutNavIds = []
initNavs()
showSlide() // start slider on load

function showSlide(){ 
    
    rightInit()
    clearTimeoutInterval()
    interv = new IntervalTimer(function() {

        rightInit()
        setCurPrevSlides()        
        goToRight(curslide,prevSlide)

    }, 5000);

}

// to position slide in the right starting position
function leftInit(){
    // console.log(6)
    slides.forEach(function(slide){
        if(slides[curslide]!=slide) {            
            if(!(slides[curslide].getBoundingClientRect().x != 0  && slides[prevSlide] == slide)) {    
                slide.style.visibility = "hidden"        
                slide.style.transition = "unset"
                slide.style.transform = "translate(200%)"
            }
        }
    })

}
// to position slide in the right starting position
function rightInit(){
    slides.forEach(function(slide){
        if(slides[curslide]!=slide) {            
            if(!(slides[curslide].getBoundingClientRect().x != 0  && slides[prevSlide] == slide)) {    
                    slide.style.visibility = "hidden"
                    slide.style.transition = "unset"
                    slide.style.transform = "unset" 
            }
        }

    })
}

// Set the previous and current slide in right direction
function setCurPrevSlides(){
    prevSlide = curslide
    curslide++
    if(curslide>slides.length-1){
        curslide = 0      
    } 
}

// Set the previous and current slide in left direction
function setCurPrevSlidesToLeft(){
    prevSlide = curslide
    curslide--
    if(curslide<0){
        curslide = slides.length-1      
    } 
}

//Go to right, default
function goToRight(curslide, prevSlide){
    // console.log(4)
    slides[prevSlide].style.visibility = "visible"
    slides[prevSlide].style.transition = transformType
    slides[prevSlide].style.transform = "translate(200%)"   

    slides[curslide].style.visibility = "visible"
    slides[curslide].style.transform = "translate(100%)"
    slides[curslide].style.transition = transformType

    // slideMain.style.height = slides[curslide].querySelector('img').offsetHeight +'px'       

}

//If you want to make this default you have to run leftInit() before showSlide() or init slides positions in css 
// And use a similar setTimeout to positon slides into starting position after every move
function goToLeft(curslide, prevSlide){
    // console.log(5)
    slides[prevSlide].style.visibility = "visible"
    slides[prevSlide].style.transition = transformType
    slides[prevSlide].style.transform = "unset"
  
    slides[curslide].style.visibility = "visible"
    slides[curslide].style.transition = transformType
    slides[curslide].style.transform = "translate(100%)"

    // slideMain.style.height = slides[curslide].querySelector('img').offsetHeight +'px'      
}

// Init Navs and add EvenListeners
function initNavs(){
    const leftNav = slideMain.querySelector('.slide-nav.left')
    const rightNav = slideMain.querySelector('.slide-nav.right')

    rightNav.addEventListener('click',function(){
        //Clear Interval to prevent conflicts
        // console.log(x)
        clearTimeoutInterval()

        //This is used if the slider is on the move, since default direction is to right I just make it faster
        if(slides[curslide].getBoundingClientRect().x != 0){

            slides[prevSlide].style.transition = transformQuickType
            slides[curslide].style.transition = transformQuickType

        }

        //This is used if the slider is not on the move
        // rightInit() Bring the slides in to the right starting position
        // setCurPrevSlides() Set the previous and current slide
        // goToRight(curslide, prevSlide) move to right
        else{
            rightInit()
            // slides[curslide].addEventListener("transitionend", func)
            setCurPrevSlides()
            goToRight(curslide, prevSlide)
        }

        
        // function func(){
        //     slides.forEach((slide)=>slide.removeEventListener("transitionend", func))
        //     showSlide()  
        // }

        //I have made a timeout to prevent confilicts, 
        // also remove all the timeouts stored in timeOutNavIds if one clicks more than once on the nav
        let localTimeoutId = setTimeout(function(){
            timeOutNavIds.forEach((tiIdItem)=>clearTimeout(tiIdItem))
            showSlide()  
        },1000)    

        timeOutNavIds.push(localTimeoutId)         
    })

    leftNav.addEventListener('click',function(){
   

        // To left while on the move is more complicated since we should reverse the current direction
        // This part is a work in progess
        if(slides[curslide].getBoundingClientRect().x != 0){
            
            slides[prevSlide].style.transition = transformQuickType
            slides[curslide].style.transition = transformQuickType
            // let curslideX = 100 + (((slides[curslide].getBoundingClientRect().x)/slideMain.offsetWidth)*100)

            // slides[prevSlide].style.transition = "unset"
            // slides[prevSlide].style.transform = "unset"  
            // slides[curslide].style.transform = `translate(${curslideX}%)`
            // slides[prevSlide].style.transform = `translate(${100+curslideX}%)`
            // setCurPrevSlidesToLeft()  
            // goToLeft(curslide, prevSlide)  
        }

        else{
            clearTimeoutInterval()

            console.log(1)
            leftInit()
            setCurPrevSlidesToLeft()  
        
            //set a timeout here because put a gap between lefInit and  or transition is trigerred
            setTimeout(function(){
                goToLeft(curslide, prevSlide)
            })            

            //after transition is complete run the timer
            let localTimeoutId = setTimeout(function(){   
                timeOutNavIds.forEach((tiIdItem)=>clearTimeout(tiIdItem)) 
                rightInit()
                showSlide()                   
            },1000)    
    
            timeOutNavIds.push(localTimeoutId)
        }      

    })
}

function clearTimeoutInterval(){
    console.log(timeOutNavIds)
    timeOutNavIds.forEach((tiIdItem)=>clearTimeout(tiIdItem))
    timeOutNavIds = []
    console.log(intervId)
    intervId.forEach((intIdItem)=>clearInterval(intIdItem))
    intervId = []
    console.log(timeOutId)
    timeOutId.forEach((timIdItem)=>clearTimeout(timIdItem))
    timeOutId = []
}

// Found this code on the stackoverflow
function IntervalTimer(callback, interval) {
    var timerId, startTime, remaining = 0;
    var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

    this.pause = function () {
        if (state != 1) return;
        remaining = interval - (new Date() - startTime)%interval;
        intervId.forEach((intIdItem)=>clearInterval(intIdItem))
        state = 2;
        console.log(remaining)
    };

    this.resume = function () {
        if (state != 2) return;
        state = 3;
        timeOutId.push(window.setTimeout(this.timeoutCallback, remaining));
    };

    this.timeoutCallback = function () {
        if (state != 3) return;

        callback();

        startTime = new Date();
        timerId = window.setInterval(callback, interval);
        intervId.push(timerId)
        state = 1;
    };

    startTime = new Date();
    // console.log(4)
    timerId = window.setInterval(callback, interval);
    intervId.push(timerId)
    state = 1;
}

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
    clearTimeoutInterval()
    if(document[hidden]) {    
        interv.pause();
    }
    else {
        interv.resume();
    }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  // Handle page visibility change
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}