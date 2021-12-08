//Author: Alma Ziaabadi

class NikoSlider{
    curslide = 0
    prevSlide
    // interv
    transitionTime = 1000
    transitionTypeRight = `right ${this.transitionTime}ms linear`
    transitionTypeLeft = `left ${this.transitionTime}ms linear`
    transformQuickType = "right 0.2s linear"
    loopTime
    intervId = []
    timeOutId =[]
    auto = true
    direction = 'right'
    slides
    leftNav
    rightNav
    

    constructor(options){
        this.options = options
        this.initilize()
        this.createNextPrevBut()
        this.slides = document.querySelector('.slider-container').querySelectorAll(`.${options.slideClass}`)
        this.showSlide() 
       
    }

    initilize(){
        let {el: slideContainer, loopTime, direction, slideClass} = this.options

        //Check if options exist
        if(!slideContainer) throw Error('The el does not exist')
        if(!loopTime) this.auto = false
        else if(!Number.isInteger(loopTime) || loopTime < 500) throw Error('The time duration is not a number more than 500ms')
        else this.loopTime = loopTime
        if(direction) this.direction = direction
        this.xPosition = slideContainer.getBoundingClientRect().x
        this.slides = document.querySelector('.slider-container').querySelectorAll(`.${slideClass}`)
    }

    createNextPrevBut(){
        const slideContainer= this.options.el
        slideContainer.innerHTML +='<i class="slide-nav right">⪼</i><i class="slide-nav left">⪻</i>'
        this.leftNav = slideContainer.querySelector('.slide-nav.left')
        this.rightNav = slideContainer.querySelector('.slide-nav.right')
    
        this.rightNav.addEventListener('click',()=>{
            //Clear Interval to prevent conflicts
            this.clearTimeoutInterval()
    
            //This is used if the slider is on the move, since default direction is to right I just make it faster
            if(this.slides[this.curslide].style.right != 0){
    
            }
    
            //This is used if the slider is not on the move
            // rightInit() Bring the slides in to the right starting position
            // setCurPrevSlides() Set the previous and current slide
            // goToRight(curslide, prevSlide) move to right
            else{
                this.rightInit()
                // slides[curslide].addEventListener("transitionend", func)
                this.setCurPrevSlides()
                this.goToRight()
            }
    
  
            //I have made a timeout to prevent confilicts, 
            // also remove all the timeouts stored in timeOutNavIds if one clicks more than once on the nav
            const localTimeoutId = setTimeout(()=>{
                this.timeOutId.forEach((tiIdItem)=>clearTimeout(tiIdItem))
                this.showSlide()  
            },this.transitionTime)    
    
            this.timeOutId.push(localTimeoutId)         
        })
    
        this.leftNav.addEventListener('click',()=>{       
    
            // To left while on the move is more complicated since we should reverse the current direction
            // This part is a work in progess
            if(this.slides[this.curslide].style.right != 0){

            }else{
                this.clearTimeoutInterval()    
                this.leftInit()
                this.setCurPrevSlidesToLeft()  
                
                //set a timeout here because put a gap between lefInit and  or transition is trigerred
                setTimeout(()=>{
                    this.goToLeft()
                })            
    
                //after transition is complete run the timer
                let localTimeoutId = setTimeout(()=>{   
                    this.timeOutId.forEach((tiIdItem)=>clearTimeout(tiIdItem)) 
                    this.rightInit()
                    this.showSlide()                   
                },this.transitionTime)    
        
                this.timeOutId.push(localTimeoutId)
            }      
    
        })   
    
    }

    showSlide(){
        const startTime = new Date()
        this.clearTimeoutInterval()
        const hidden = this.checkBrowserHidden()

        let intervId = setInterval(() =>{
            if(!document[hidden]) {    
                if(this.slides[this.curslide].style.right == 0){
                    if((this.loopTime - (new Date() - startTime)%this.loopTime) >= this.loopTime/2 ){                
                        this.rightInit()
                        this.setCurPrevSlides()        
                        this.goToRight() 
                    }       
                }                
            }     
        }, this.loopTime);

        this.intervId.push(intervId)
    }

    checkBrowserHidden(){
        let hidden, visibilityChange;
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
        return(hidden)
    }
    leftInit(){
        // console.log(6)
        this.slides.forEach(slide=>{
            if(this.slides[this.curslide]!=slide) {            
                if(!(this.slides[this.curslide].style.right != 0 && this.slides[this.prevSlide] == slide)) {    
                    slide.classList.remove('active-slide')
                    slide.classList.remove('prev-slide')
                    slide.classList.add('right')
                    slide.classList.remove('left')
                }
            }
            // if(this.slides[curslide]==slide) {          
            //         slide.style.visibility = "visible"        
            //         slide.style.transition = transitionTypeLeft
            //         slide.style.left = "0"
            //         slide.style.right = "unset"
            // }
        })
    }
    
    // to position slide in the right starting position
    rightInit(){
        this.slides.forEach((slide)=>{
            if(this.slides[this.curslide]!=slide) {            
                if(!(this.slides[this.curslide].style.right != 0  && this.slides[this.prevSlide] == slide)) {    
                    slide.classList.remove('active-slide')
                    slide.classList.remove('prev-slide')
                    slide.classList.add('left')
                    slide.classList.remove('right')
                }
            }  
        })
    }
    
    // Set the previous and current slide in right direction
    setCurPrevSlides(){
        this.prevSlide = this.curslide
        this.curslide++
        if(this.curslide>this.slides.length-1){
            this.curslide = 0      
        } 
    }
    
    // Set the previous and current slide in left direction
    setCurPrevSlidesToLeft(){
        this.prevSlide = this.curslide
        this.curslide--
        if(this.curslide<0){
            this.curslide = this.slides.length-1      
        } 
    }
    
    //Go to right, default
    goToRight(){

        this.slides[this.curslide].classList.remove('right')
        this.slides[this.curslide].classList.remove('left')
        this.slides[this.curslide].classList.add('active-slide')

        this.slides[this.prevSlide].classList.remove('active-slide')
        this.slides[this.prevSlide].classList.add('left')
        this.slides[this.prevSlide].classList.add('prev-slide')
        this.slides[this.prevSlide].classList.add('right')
        
     
    }
    
    //If you want to make this default you have to run leftInit() before showSlide() 
    // And use a similar setTimeout to positon slides into starting position after every move
    goToLeft(){
        
        this.slides[this.curslide].classList.remove('prev-slide')
        this.slides[this.curslide].classList.remove('right')
        this.slides[this.curslide].classList.add('left')
        this.slides[this.curslide].classList.add('active-slide')

        this.slides[this.prevSlide].classList.remove('active-slide')
        this.slides[this.prevSlide].classList.add('prev-slide')
        this.slides[this.prevSlide].classList.add('left')

    }
    
    clearTimeoutInterval(){
        // timeOutNavIds.forEach((tiIdItem)=>clearTimeout(tiIdItem))
        // timeOutNavIds = []
        this.intervId.forEach((intIdItem)=>clearInterval(intIdItem))
        this.intervId = []
        this.timeOutId.forEach((timIdItem)=>clearTimeout(timIdItem))
        this.timeOutId = []
    }
}

let niko = new NikoSlider({
    el: document.querySelector('.slider-container'),
    direction: 'left',
    slideClass: 'slide',
    loopTime: 5000
    }
)

// Found this code on the stackoverflow
// function IntervalTimer(callback, interval) {
//     var timerId, startTime, remaining = 0;
//     var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

//     this.pause = function () {
//         if (state != 1) return;
//         remaining = interval - (new Date() - startTime)%interval;
//         this.clearTimeoutInterval()
//         state = 2;
//         // console.log(remaining)
//     };

//     this.resume = function () {
//         if (state != 2) return;
//         state = 3;
//         niko.timeOutId.push(window.setTimeout(this.timeoutCallback, remaining));
//     };

//     this.timeoutCallback = function () {
//         if (state != 3) return;

//         callback();

//         startTime = new Date();
//         timerId = window.setInterval(callback, interval);
//         niko.intervId.push(timerId)
//         state = 1;
//     };

//     startTime = new Date();
//     // console.log(4)
//     timerId = window.setInterval(callback, interval);
//     niko.intervId.push(timerId)
//     state = 1;
// }


// Set the name of the hidden property and the change event for visibility


// function handleVisibilityChange() {
//     // clearTimeoutInterval()
//     if(document[hidden]) {    
//         niko.interv.pause();
//     }
//     else {
//         niko.interv.resume();
//     }
// }

// // Warn if the browser doesn't support addEventListener or the Page Visibility API
// if (typeof document.addEventListener === "undefined" || hidden === undefined) {
//   console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
// } else {
//   // Handle page visibility change
// //   document.addEventListener(visibilityChange, handleVisibilityChange, false);
// }

