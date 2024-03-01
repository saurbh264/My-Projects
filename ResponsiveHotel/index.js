gsap.registerPlugin(ScrollTrigger);
 
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".wrapper"),
  smooth: true,
  smoothMobile: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".wrapper" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".wrapper", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".wrapper").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const h1=document.querySelectorAll("h1")
h1.forEach(function(ele){
    clutter=""
    var temp=ele.textContent.split("")
    temp.forEach((ele)=>{
        clutter+=`<span>${ele}</span>`
    })
    ele.innerHTML=clutter;
})

gsap.to(".page2 h1 span",{
    color:"#E3E3C4",
    duration:1,
    stagger:0.1,
    scrollTrigger:{
        trigger:".page2 h1 span",
        scroller:".wrapper", // Whenever you're using the locomotive dont forget to make the scroller wrapper or your topmost entity.Also don't set any height to the wrapper otherwise it won't work.
        start:"top 50%",
        end:"top -20%",
        scrub:1
    }
})

var t1=gsap.timeline()
t1.from(".page1 img",{
    scale:0.4,
    duration:1.5,
})

t1.from(".page1 .nav,h1,h2",{
    y:-50,
    opacity:0,
    duration:1,
    stagger:0.5
})

gsap.from(".page3 img",{
    opacity:0,
    duration:1,
    scrollTrigger:{
        trigger:".page3 img",
        scroller:".wrapper",
        start:"top 80%",
        end:"top 0%",
        scrub:1
    }
})