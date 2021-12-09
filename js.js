
//Author: Alma Z

class NikoSlider{
    curslide = 0
    prevSlide
    // interv
    transitionTime = 1000
    transitionTypeRight = `right ${this.transitionTime}ms ease-in-out`
    transitionTypeLeft = `left ${this.transitionTime}ms ease-in-out`
    transformQuickType = "right 0.2s ease-in-out"
    loopTime
    intervId = []
    timeOutId =[]
    auto = true
    direction = 'right'
    slides
    leftNav
    rightNav
    tabInactive = 0
    

    constructor(options){
        this.options = options
        this.initilize()
        this.createNextPrevBut()
        this.slides = document.querySelector('.slider-container').querySelectorAll(`.${options.slideClass}`)
        console.log('0',this.intervId)
        window.addEventListener('focus', this.focusListener);
        window.addEventListener('blur', this.blurListener);  
        this.showSlide() 
       
    }

    focusListener(){
        this.showSlide() 
        this.tabInactive = 0
        console.log('focux')
    }
    blurListener(){
        this.clearTimeoutInterval() 
        this.tabInactive = 1
        console.log('blur')
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
        // console.log(this.intervId)
        this.clearTimeoutInterval()
        // this.intervId=[]
        console.log('1',this.intervId)
        this.intervId.forEach((idIn)=>cancelAnimationFrame(idIn))
        console.log('2',this.intervId)
        const hidden = this.checkBrowserHidden()

        let intervId = this.requestInterval(() =>{
            // if(!document[hidden]) {    
                // if(this.slides[this.curslide].style.right == 0){
                    // if((this.loopTime - (new Date() - startTime)%this.loopTime) >= this.loopTime/2 ){                
                        this.rightInit()
                        this.setCurPrevSlides()        
                        this.goToRight() 
                    // }     
                // }                
            // }               
  
        }, this.loopTime);

        this.intervId.push(intervId.value)
        console.log(this.intervId)

 
    }

    requestInterval (fn, delay) {
        let requestAnimFrame = (function () {
          return window.requestAnimationFrame || function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
          };
        })(),
        hidden = this.checkBrowserHidden(),
        start = new Date().getTime(),
        handle = {},
        deltaHidden,
        flag = 0,
        startHidden;

        let loop = () => {
            handle.value = requestAnimFrame(loop);  
            let current = new Date().getTime();

            // if(!document[hidden]) {          
            //     let delta = current - start;
            //     flag = 0   
            //      // Active
             
            //     if(deltaHidden){    
            //         console.log('hha')  
            //         startHidden = new Date().getTime();  
            //         deltaHidden = current - startHidden + delta;                                
            //         if (deltaHidden >= delay) {
            //             console.log('visi')
            //             fn.call();                        
            //             deltaHidden = undefined;
            //             return
            //         }   
            //     }else if(delta >= delay){
            //         console.log('jjj')
            //         fn.call();
            //         start = new Date().getTime();
            //     }              
                
            // } else{
            //     console.log('hidden')
            //     if(flag==0) deltaHidden = current - start;
            //     flag=1
            // }

            if(!this.tabInactive) {          
                let delta = current - start;
                flag = 0   
                 // Active
             
                if(deltaHidden){    
                    console.log('hha')  
                    startHidden = new Date().getTime();  
                    deltaHidden = current - startHidden + delta;                                
                    if (deltaHidden >= delay) {
                        console.log('visi')
                        fn.call();                        
                        deltaHidden = undefined;
                        return
                    }   
                }else if(delta >= delay){
                    console.log('jjj')
                    fn.call();
                    start = new Date().getTime();
                }              
                
            } else{
                console.log('hidden')
                if(flag==0) deltaHidden = current - start;
                flag=1
            }

        }
        handle.value = requestAnimFrame(loop);
        return handle;
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
        // console.log(this.intervId)
        this.intervId.forEach((idIn)=>cancelAnimationFrame(idIn))
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

