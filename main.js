// locomotive
function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation()


// loader

function loader(){
    let tl = gsap.timeline()

tl.from(".line h1",{
    y:150,
    stagger:0.25,
    duration:0.6,
    delay:0.5
})
tl.from("#line1-part1",{
    opacity:0,
    onStart:function(){
        let h5timer = document.querySelector("#line1-part1 h5");
let grow = 0;
setInterval(function(){
    if(grow<100){
        h5timer.innerHTML = grow++
    }else{
        h5timer.innerHTML = grow
    }
},33)
    }
})
tl.to(".line h2",{
    animationName:"anime",
    opacity:1
})
tl.to("#loader",{
    opacity:0,
    duration:0.2,
    delay:4
})
tl.from("#page1",{
    delay:0.2,
    y:1600,
    opacity:0,
    duration:0.5,
    ease:Power4
})
tl.to("#loader",{
    display:"none"
})
tl.from("#nav",{
    opacity:0
})
tl.from("#hero1 h1,#hero2 h1, #hero3 h2, #hero4 h1",{
    y:140,
    stagger:0.2
})
tl.from("#hero1 , #page2",{
    opacity:0
},"-=1.2")
}
loader();


// flagAnimation
document.addEventListener("mousemove",function(dets){
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y
    })
})
document.querySelector("#hero3").addEventListener("mouseenter", function(){
    gsap.to("#flag",{
        opacity:1
    })
})
document.querySelector("#hero3").addEventListener("mouseleave", function(){
    gsap.to("#flag",{
        opacity:0
    })
})


// cursorAnimation
function cursorAnimation(){
    document.addEventListener("mousemove",function(dets){
        gsap.to("#crsr",{
            left:dets.x,
            top:dets.y
        })
    })
    
    // magnet
    Shery.makeMagnet("#nav-part2 h4", {
      });
}
cursorAnimation();



// video-containerAnimation
let videoContainer = document.querySelector("#video-container");
let video = document.querySelector("#video-container video");


videoContainer.addEventListener("mouseenter",function(){
    videoContainer.addEventListener("mousemove",function(dets){
        gsap.to("#crsr",{
            opacity: "0"
        })
        gsap.to("#video-cursor",{
            left:dets.x - 500,
            top:dets.y - 300
        })
    })
})
videoContainer.addEventListener("mouseleave",function(){
    gsap.to("#crsr",{
        opacity: "1"
    })
    gsap.to("#video-cursor",{
        top:"-15%",
        left:"70%"
    })
})

let flag = 0
let playerImg = document.querySelector("#player-img");
videoContainer.addEventListener("click",function(){
    if(flag == 0){
        video.play();
        playerImg.style.opacity = 0
        video.style.opacity = 1;
        document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-circle-line"></i>`
        gsap.to("#video-cursor",{
            scale:0.5
        })
        flag = 1
    }else{
        video.pause();
        playerImg.style.opacity = 1
        video.style.opacity = 0;
        document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-circle-line"></i>`
        gsap.to("#video-cursor",{
            scale:1
        })
        flag = 0
    }
})

// 3d-animation
function imgAnimation(){
    Shery.imageEffect(".image-div",{
        style:5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":-0.95,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272695760684946},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.27,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.44,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.46,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey:true
    })
}
imgAnimation()



// scrolltrigger animations


// page3


gsap.from(".image-div",{
    y:500,
    opacity:0,
    scrollTrigger:{
        trigger:"#page3",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})
gsap.from(".page3-circle1",{
    y:500,
    opacity:0,
    scrollTrigger:{
        trigger:"#page3",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})

gsap.from("#page3 h1",{
    y:100,
    opacity:0,
    scrollTrigger:{
        trigger:"#page3",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})

gsap.from("#undpg3",{
    y:100,
    scaleX:0,
    scrollTrigger:{
        trigger:"#page3",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})


// page4

gsap.from("#page4 h1",{
    y:100,
    opacity:0,
    scrollTrigger:{
        trigger:"#page4",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})
gsap.from("p",{
    y:600,
    opacity:0,
    scrollTrigger:{
        trigger:"#page4",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})
gsap.from("#pg4img",{
    y:600,
    opacity:0,
    scrollTrigger:{
        trigger:"#page4",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})

gsap.from("#undpg4",{
    y:100,
    scaleX:0,
    scrollTrigger:{
        trigger:"#page4",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})

gsap.from("#und1",{
    y:100,
    scaleX:0,
    scrollTrigger:{
        trigger:"#page4-blue-div",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})



// footer

gsap.from("#footer h1",{
    y:100,
    opacity:0,
    scrollTrigger:{
        trigger:"#footer",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})
gsap.from(".box",{
    y:600,
    opacity:0,
    scrollTrigger:{
        trigger:"#footer",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})

gsap.from("#undpg5",{
    y:100,
    scaleX:0,
    scrollTrigger:{
        trigger:"#footer",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})

gsap.from("#undpg6",{
    y:100,
    scaleX:0,
    scrollTrigger:{
        trigger:"#footer",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3
    }
})









// menubtn
let menubtn = document.querySelector("#menu-icon");
let full = document.querySelector("#full-scrn-nav");
let flag2 = 0
menubtn.addEventListener("click",function(){
    if(flag2 === 0){
        full.style.top = "0%"
        full.style.opacity = 1
    flag2 = 1
    }else{
        full.style.top = "-100vh"
        full.style.opacity = 0
    flag2 = 0
    }
})