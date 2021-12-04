let slideMain = document.querySelector('.slider-container')
let slides = document.querySelectorAll('.slider-container .slide')
let slideNav = document.querySelectorAll('.slider-container .slide-nav')
slideMain.style.height = slides[0].querySelector('img').offsetHeight +'px'  
let curslide = 0
let prevSlide
let intervId
initNavs()
showSlide()

function showSlide(){    

    intervId = setInterval(function(){
        setCurPrevSlides()
        goToRight(curslide,prevSlide)

    }, 5000)

}

function goToRight(curslide, prevSlide){

    slides[prevSlide].style.transition = "transform 1s linear"
    slides[prevSlide].style.transform = "translate(200%)"
    setTimeout(function(){
        slides[prevSlide].style.transition = "unset"
        slides[prevSlide].style.transform = "unset"        
    },1000)

    slides[curslide].style.transform = "translate(100%)"
    slides[curslide].style.transition = "transform 1s linear"

    slideMain.style.height = slides[curslide].querySelector('img').offsetHeight +'px'       

}

function goToLeft(curslide, prevSlide){

    slides[prevSlide].style.transition = "transform 1s linear"
    slides[prevSlide].style.transform = "translate(0)"
    setTimeout(function(){
        slides[prevSlide].style.transition = "unset"
        slides[prevSlide].style.transform = "translate(200%)"        
    },1000)
    
    slides[curslide].style.transition = "transform 1s linear"
    slides[curslide].style.transform = "translate(100%)"

    slideMain.style.height = slides[curslide].querySelector('img').offsetHeight +'px'       

}
function leftInit(){
    slides.forEach(function(slide){
        if(slides[curslide]!= slide) {            
            slide.style.transition = "unset"
            slide.style.transform = "translate(200%)"
        }
    })
}

function initNavs(){
    slideNav.forEach(function(nav){
        nav.addEventListener('click',function(){
            clearInterval(intervId)
            setCurPrevSlides()
            goToRight(curslide, prevSlide)
            setTimeout(function(){
                showSlide()  
            },1000)            
        })
    })
}

function setCurPrevSlides(){
    prevSlide = curslide
    curslide++
    if(curslide>slides.length-1){
        curslide = 0      
    } 
}


