<p align="center">
  <a href="https://getbootstrap.com/">
    <img src="https://github.githubassets.com/images/icons/emoji/unicode/1f63c.png?v8" alt="Bootstrap logo" width="20" height="20">
  </a>
  <p align="center">  
    <a href="https://img.shields.io/apm/l/npm?style=flat-square">
     <img src="https://img.shields.io/apm/l/npm?style=flat-square">
    </a>
  </p>
  
</p>
<p align="center">
  Simple right to left Slider
  <br>
  <a href="https://github.com/Dark-Red-Apple/neko-slider" ><strong>NekoSlider</strong></a>
</p>

# NekoSlider

A simple left to right(or right to left slider, optional).
This slider is pure js code.
<br>
You can see a demo Here: <a href="https://dark-red-apple.github.io/neko-slider/" target="__blank">demo</a>.
<br>
The npm link: <a href="https://www.npmjs.com/package/nekoslider" target="__blank">NekoSlider</a>

## How To Use

You can install it via npm:

```
npm install nekoslider
```

Import the package:

```
import NekoSlider from 'nekoslider'
```

Create an instance of it:

```
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
```

<h3>Properties:<h3>

<h4>**Requirements:**</h4>

- el: slider container
- slideClass: slide tags class

<h4> **Optional:** </h4>

- direction: 'left or right'
- loopTime: ms, if not given auto play is false
- leftNavIcon
- rightNavIcon
- transitionTime : in ms from 100 to 10000
- transitionStyle : linear, ease-out, ease-in, ease-out-in

<h4> HTML format </h4>

<p>You should provide your container as a javascript dom element.</p>
<p>You can name your single slide class what you want but you need to provide the name<p>

```
<div class="slider-container" id="slider2" style="width: 90%; border-radius: unset; margin-bottom: 30px">
  <div class="slide"><img src="./media/pic(5).png" onerror="this.onerror=null; this.src=''" alt="" /></div>
  <div class="slide"><img src="./media/pic(6).jpg" onerror="this.onerror=null; this.src=''" alt="" /></div>
  <div class="slide"><img src="./media/pic(7).jpg" onerror="this.onerror=null; this.src=''" alt="" /></div>
  <div class="slide"><img src="./media/pic(8).jpg" onerror="this.onerror=null; this.src=''" alt="" /></div>
</div>
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
NekoSlider/
├── src/
│   └── index.js
│   └── slider.js
├──css
│   └── css.css
└── index.html

```
