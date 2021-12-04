let slideMain = document.querySelector('.slider-container')
let slides = document.querySelectorAll('.slider-container .slide')
let slideNav = document.querySelectorAll('.slider-container .slide-nav')
slideMain.style.height = slides[0].querySelector('img').offsetHeight +'px'  
let curslide = 0
let prevSlide
let intervId
let tiId
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
    tiId = setTimeout(function(){
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
function rightInit(){
    slides.forEach(function(slide){
        if(slides[curslide]!= slide) {            
            slide.style.transition = "unset"
            slide.style.transform = "translate(0)"
        }
    })
}

function initNavs(){
    const leftNav = slideMain.querySelector('.slide-nav.left')
    const rightNav = slideMain.querySelector('.slide-nav.right')
    rightNav.addEventListener('click',function(){
        clearInterval(intervId)
        
        if(slides[curslide].getBoundingClientRect().x != 0){

            slides[prevSlide].style.transition = "transform 0.2s linear"
            slides[curslide].style.transition = "transform 0.2s linear"

        }
        else{
            rightInit()
            setCurPrevSlides()
            goToRight(curslide, prevSlide)
        }

        setTimeout(function(){
            showSlide()  
        },1000)            
    })

    leftNav.addEventListener('click',function(){
        clearInterval(intervId)
        clearInterval(tiId)

        if(slides[curslide].getBoundingClientRect().x != 0){
            let curslideX = 100 + (((slides[curslide].getBoundingClientRect().x)/slideMain.offsetWidth)*100)

            slides[prevSlide].style.transition = "unset"
            slides[prevSlide].style.transform = "unset"  
            slides[curslide].style.transform = `translate(${curslideX}%)`
            slides[prevSlide].style.transform = `translate(${100+curslideX}%)`
            setCurPrevSlidesToLeft()  
            goToLeft(curslide, prevSlide)  
        }
        else{
            leftInit()
            setCurPrevSlidesToLeft()  
 
            setTimeout(function(){
                goToLeft(curslide, prevSlide)  
    
            })
        }      

        setTimeout(function(){
            rightInit()
            showSlide()  
        },1000)
      
    })
}

function setCurPrevSlides(){
    prevSlide = curslide
    curslide++
    if(curslide>slides.length-1){
        curslide = 0      
    } 
}

function setCurPrevSlidesToLeft(){
    prevSlide = curslide
    curslide--
    if(curslide<0){
        curslide = slides.length-1      
    } 
}


