let slideMain = document.querySelector('.slider-container')
let slides = document.querySelectorAll('.slider-container .slide')
let slideNav = document.querySelectorAll('.slider-container .slide-nav')
// slideMain.style.height = slides[0].querySelector('img').offsetHeight +'px'  
let curslide = 0
let prevSlide
let intervId
let timeOutId
let timeOutNavIds = []
initNavs()
showSlide() // start slider on load

document.addEventListener('visibilitychange', function() {
    if(document.hidden) {
        timeOutNavIds.forEach((tiIdItem)=>clearTimeout(tiIdItem))
        console.log('haha')
        clearInterval(intervId)
    }
    else {
        timeOutNavIds.forEach((tiIdItem)=>clearTimeout(tiIdItem))
        clearInterval(intervId)
        showSlide() // start slider on load
    }
});


function showSlide(){    

    intervId = setInterval(function(){
        //Set the curent and previous slides numbers
        rightInit()
        setCurPrevSlides()        
        goToRight(curslide,prevSlide)

    }, 6000)
}

//Go to right, default
function goToRight(curslide, prevSlide){

    slides[prevSlide].style.visibility = "visible"
    slides[prevSlide].style.transition = "transform 1s linear"
    slides[prevSlide].style.transform = "translate(200%)"   

    slides[curslide].style.visibility = "visible"
    slides[curslide].style.transform = "translate(100%)"
    slides[curslide].style.transition = "transform 1s linear"


    // slideMain.style.height = slides[curslide].querySelector('img').offsetHeight +'px'       

}

//If you want to make this default you have to run leftInit() before showSlide() or init slides positions in css 
// And use a similar setTimeout to positon slides into starting position after every move
function goToLeft(curslide, prevSlide){

    slides[prevSlide].style.visibility = "visible"
    slides[prevSlide].style.transition = "transform 1s linear"
    slides[prevSlide].style.transform = "translate(0)"
  
    slides[curslide].style.visibility = "visible"
    slides[curslide].style.transition = "transform 1s linear"
    slides[curslide].style.transform = "translate(100%)"

    // slideMain.style.height = slides[curslide].querySelector('img').offsetHeight +'px'      
}
// to position slide in the right starting position
function leftInit(){
    slides.forEach(function(slide){
        if(slides[curslide]!= slide) {    
            slide.style.visibility = "hidden"        
            slide.style.transition = "unset"
            slide.style.transform = "translate(200%)"
        }
    })
}
// to position slide in the right starting position
function rightInit(){
    slides.forEach(function(slide){
        if(slides[curslide]!= slide) {            
            slide.style.visibility = "hidden"
            slide.style.transition = "unset"
            slide.style.transform = "unset"
        }
    })
}

// Init Navs and add EvenListeners
function initNavs(){
    const leftNav = slideMain.querySelector('.slide-nav.left')
    const rightNav = slideMain.querySelector('.slide-nav.right')

    rightNav.addEventListener('click',function(){
        //Clear Interval to prevent conflicts
        clearInterval(intervId)

        //This is used if the slider is on the move, since default direction is to right I just make it faster
        if(slides[curslide].getBoundingClientRect().x != 0){

            slides[prevSlide].style.transition = "transform 0.2s linear"
            slides[curslide].style.transition = "transform 0.2s linear"

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
        // This part is a progressing work
        if(slides[curslide].getBoundingClientRect().x != 0){

            // let curslideX = 100 + (((slides[curslide].getBoundingClientRect().x)/slideMain.offsetWidth)*100)

            // slides[prevSlide].style.transition = "unset"
            // slides[prevSlide].style.transform = "unset"  
            // slides[curslide].style.transform = `translate(${curslideX}%)`
            // slides[prevSlide].style.transform = `translate(${100+curslideX}%)`
            // setCurPrevSlidesToLeft()  
            // goToLeft(curslide, prevSlide)  
        }
        else{
            clearInterval(intervId)
            clearTimeout(timeOutId)
            leftInit()
            setCurPrevSlidesToLeft()  
        
            //set a timeout here because 
            setTimeout(function(){
                goToLeft(curslide, prevSlide)
            })            

            let localTimeoutId = setTimeout(function(){   
                timeOutNavIds.forEach((tiIdItem)=>clearTimeout(tiIdItem)) 
                rightInit()
                showSlide()                   
            },1000)    
    
            timeOutNavIds.push(localTimeoutId)
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

