/*
The animations herein were forked from Animate.css (https://animate.style/) and are subject to the following license.

---

The MIT License (MIT)

Copyright (c) 2020 Daniel Eden

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
export default {
  bounce: [
    {
      offset: 0,
      transform: 'translate(0)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.2,
      transform: 'translate(0)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.4,
      transform: 'translateY(-30px)',
      easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
    },
    {
      offset: 0.43,
      transform: 'translateY(-30px)',
      easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
    },
    {
      offset: 0.53,
      transform: 'translate(0)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.7,
      transform: 'translateY(-15px)',
      easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
    },
    {
      offset: 0.8,
      transform: 'translate(0)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.9,
      transform: 'translateY(-4px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 1,
      transform: 'translate(0)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    }
  ],
  flash: [
    {
      offset: 0,
      opacity: 1
    },
    {
      offset: 0.25,
      opacity: 0
    },
    {
      offset: 0.5,
      opacity: 1
    },
    {
      offset: 0.75,
      opacity: 0
    },
    {
      offset: 1,
      opacity: 1
    }
  ],
  jello: [
    {
      offset: 0,
      transform: 'skewX(0deg) skewY(0deg)',
      transformOrigin: 'center'
    },
    {
      offset: 0.111,
      transform: 'skewX(0deg) skewY(0deg)',
      transformOrigin: 'center'
    },
    {
      offset: 0.222,
      transform: 'skewX(-12.5deg) skewY(-12.5deg)',
      transformOrigin: 'center'
    },
    {
      offset: 0.333,
      transform: 'skewX(6.25deg) skewY(6.25deg)',
      transformOrigin: 'center'
    },
    {
      offset: 0.444,
      transform: 'skewX(-3.125deg) skewY(-3.125deg)',
      transformOrigin: 'center'
    },
    {
      offset: 0.555,
      transform: 'skewX(1.5625deg) skewY(1.5625deg)',
      transformOrigin: 'center'
    },
    {
      offset: 0.666,
      transform: 'skewX(-0.78125deg) skewY(-0.78125deg)',
      transformOrigin: 'center'
    },
    {
      offset: 0.777,
      transform: 'skewX(0.390625deg) skewY(0.390625deg)',
      transformOrigin: 'center'
    },
    {
      offset: 0.888,
      transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)',
      transformOrigin: 'center'
    },
    {
      offset: 1,
      transform: 'skewX(0deg) skewY(0deg)',
      transformOrigin: 'center'
    }
  ],
  pulse: [
    {
      offset: 0,
      transform: 'scale(1)'
    },
    {
      offset: 0.5,
      transform: 'scale(1.05)'
    },
    {
      offset: 1,
      transform: 'scale(1)'
    }
  ],
  rotate: [
    {
      offset: 0,
      transform: 'rotate(0deg)'
    },
    {
      offset: 0.25,
      transform: 'rotate(90deg)'
    },
    {
      offset: 0.5,
      transform: 'rotate(180deg)'
    },
    {
      offset: 0.75,
      transform: 'rotate(270deg)'
    },
    {
      offset: 1,
      transform: 'rotate(360deg)'
    }
  ],
  shake: [
    {
      offset: 0,
      transform: 'translateX(0px)'
    },
    {
      offset: 0.1,
      transform: 'translateX(-10px)'
    },
    {
      offset: 0.2,
      transform: 'translateX(10px)'
    },
    {
      offset: 0.3,
      transform: 'translateX(-10px)'
    },
    {
      offset: 0.4,
      transform: 'translateX(10px)'
    },
    {
      offset: 0.5,
      transform: 'translateX(-10px)'
    },
    {
      offset: 0.6,
      transform: 'translateX(10px)'
    },
    {
      offset: 0.7,
      transform: 'translateX(-10px)'
    },
    {
      offset: 0.8,
      transform: 'translateX(10px)'
    },
    {
      offset: 0.9,
      transform: 'translateX(-10px)'
    },
    {
      offset: 1,
      transform: 'translateX(0px)'
    }
  ],
  swing: [
    {
      offset: 0,
      transform: 'rotate(0deg)',
      transformOrigin: 'top center'
    },
    {
      offset: 0.2,
      transform: 'rotate(15deg)',
      transformOrigin: 'top center'
    },
    {
      offset: 0.4,
      transform: 'rotate(-10deg)',
      transformOrigin: 'top center'
    },
    {
      offset: 0.6,
      transform: 'rotate(5deg)',
      transformOrigin: 'top center'
    },
    {
      offset: 0.8,
      transform: 'rotate(-5deg)',
      transformOrigin: 'top center'
    },
    {
      offset: 1,
      transform: 'rotate(0deg)',
      transformOrigin: 'top center'
    }
  ],
  'rubber-band': [
    {
      offset: 0,
      transform: 'scale(1, 1)'
    },
    {
      offset: 0.3,
      transform: 'scale(1.25, 0.75)'
    },
    {
      offset: 0.4,
      transform: 'scale(0.75, 1.25)'
    },
    {
      offset: 0.5,
      transform: 'scale(1.15, 0.85)'
    },
    {
      offset: 0.65,
      transform: 'scale(0.95, 1.05)'
    },
    {
      offset: 0.75,
      transform: 'scale(1.05, 0.95)'
    },
    {
      offset: 1,
      transform: 'scale(1, 1)'
    }
  ],
  tada: [
    {
      offset: 0,
      transform: 'scale(1) rotate(0deg)'
    },
    {
      offset: 0.1,
      transform: 'scale(0.9) rotate(-3deg)'
    },
    {
      offset: 0.2,
      transform: 'scale(0.9) rotate(-3deg)'
    },
    {
      offset: 0.3,
      transform: 'scale(1.1) rotate(-3deg)'
    },
    {
      offset: 0.4,
      transform: 'scale(1.1) rotate(3deg)'
    },
    {
      offset: 0.5,
      transform: 'scale(1.1) rotate(-3deg)'
    },
    {
      offset: 0.6,
      transform: 'scale(1.1) rotate(3deg)'
    },
    {
      offset: 0.7,
      transform: 'scale(1.1) rotate(-3deg)'
    },
    {
      offset: 0.8,
      transform: 'scale(1.1) rotate(3deg)'
    },
    {
      offset: 0.9,
      transform: 'scale(1.1) rotate(3deg)'
    },
    {
      offset: 1,
      transform: 'scale(1) rotate(0deg)'
    }
  ],
  wobble: [
    {
      offset: 0,
      transform: 'translate(0) rotate(0deg)'
    },
    {
      offset: 0.15,
      transform: 'translateX(-25%) rotate(-5deg)'
    },
    {
      offset: 0.3,
      transform: 'translateX(20%) rotate(3deg)'
    },
    {
      offset: 0.45,
      transform: 'translateX(-15%) rotate(-3deg)'
    },
    {
      offset: 0.6,
      transform: 'translateX(10%) rotate(2deg)'
    },
    {
      offset: 0.75,
      transform: 'translateX(-5%) rotate(-1deg)'
    },
    {
      offset: 1,
      transform: 'translate(0) rotate(0deg)'
    }
  ],
  'heart-beat': [
    {
      offset: 0,
      transform: 'scale(1)',
      easing: 'ease-in-out'
    },
    {
      offset: 0.14,
      transform: 'scale(1.3)',
      easing: 'ease-in-out'
    },
    {
      offset: 0.28,
      transform: 'scale(1)',
      easing: 'ease-in-out'
    },
    {
      offset: 0.42,
      transform: 'scale(1.3)',
      easing: 'ease-in-out'
    },
    {
      offset: 0.7,
      transform: 'scale(1)',
      easing: 'ease-in-out'
    },
    {
      offset: 1,
      transform: 'scale(1)',
      easing: 'ease-in-out'
    }
  ],
  'bounce-in': [
    {
      offset: 0,
      opacity: 0,
      transform: 'scale(0.3)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.2,
      opacity: 0,
      transform: 'scale(1.1)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.4,
      opacity: 0,
      transform: 'scale(0.9)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.6,
      opacity: 1,
      transform: 'scale(1.03)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.8,
      opacity: 1,
      transform: 'scale(0.97)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'scale(1)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    }
  ],
  'bounce-in-up': [
    {
      offset: 0,
      opacity: 0,
      transform: 'translateY(3000px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.6,
      opacity: 1,
      transform: 'translateY(-20px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.75,
      opacity: 1,
      transform: 'translateY(10px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.9,
      opacity: 1,
      transform: 'translateY(-5px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'translateY(0px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    }
  ],
  'bounce-in-down': [
    {
      offset: 0,
      opacity: 0,
      transform: 'translateY(-3000px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.6,
      opacity: 1,
      transform: 'translateY(25px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.75,
      opacity: 1,
      transform: 'translateY(-10px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 0.9,
      opacity: 1,
      transform: 'translateY(5px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'translateY(0px)',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    }
  ],
  'bounce-in-right': [
    {
      offset: 0,
      fillMode: 'both',
      transform: 'translateX(600px)',
      easing: 'ease-in',
      opacity: 0
    },
    {
      offset: 0.38,
      fillMode: 'both',
      transform: 'translateX(0)',
      easing: 'ease-out',
      opacity: 1
    },
    {
      offset: 0.55,
      fillMode: 'both',
      transform: 'translateX(68px)',
      easing: 'ease-in',
      opacity: 1
    },
    {
      offset: 0.72,
      fillMode: 'both',
      transform: 'translateX(0)',
      easing: 'ease-out',
      opacity: 1
    },
    {
      offset: 0.81,
      fillMode: 'both',
      transform: 'translateX(32px)',
      easing: 'ease-in',
      opacity: 1
    },
    {
      offset: 0.9,
      fillMode: 'both',
      transform: 'translateX(0)',
      easing: 'ease-out',
      opacity: 1
    },
    {
      offset: 0.95,
      fillMode: 'both',
      transform: 'translateX(8px)',
      easing: 'ease-in',
      opacity: 1
    },
    {
      offset: 1,
      fillMode: 'both',
      transform: 'translateX(0)',
      easing: 'ease-out',
      opacity: 1
    }
  ],
  'bounce-in-left': [
    {
      offset: 0,
      fillMode: 'both',
      transform: 'translateX(-600px)',
      easing: 'ease-in',
      opacity: 0
    },
    {
      offset: 0.38,
      fillMode: 'both',
      transform: 'translateX(0)',
      easing: 'ease-out',
      opacity: 1
    },
    {
      offset: 0.55,
      fillMode: 'both',
      transform: 'translateX(-68px)',
      easing: 'ease-in',
      opacity: 1
    },
    {
      offset: 0.72,
      fillMode: 'both',
      transform: 'translateX(0)',
      easing: 'ease-out',
      opacity: 1
    },
    {
      offset: 0.81,
      fillMode: 'both',
      transform: 'translateX(-28px)',
      easing: 'ease-in',
      opacity: 1
    },
    {
      offset: 0.9,
      fillMode: 'both',
      transform: 'translateX(0)',
      easing: 'ease-out',
      opacity: 1
    },
    {
      offset: 0.95,
      fillMode: 'both',
      transform: 'translateX(-8px)',
      easing: 'ease-in',
      opacity: 1
    },
    {
      offset: 1,
      fillMode: 'both',
      transform: 'translateX(0)',
      easing: 'ease-out',
      opacity: 1
    }
  ],
  'bounce-out': [
    {
      offset: 0,
      opacity: 1,
      transform: 'scale(1)'
    },
    {
      offset: 0.2,
      opacity: 1,
      transform: 'scale(0.9)'
    },
    {
      offset: 0.5,
      opacity: 1,
      transform: 'scale(1.11)'
    },
    {
      offset: 0.55,
      opacity: 1,
      transform: 'scale(1.11)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'scale(1)'
    }
  ],
  'bounce-out-up': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateY(0px)'
    },
    {
      offset: 0.2,
      opacity: 1,
      transform: 'translateY(-10px)'
    },
    {
      offset: 0.4,
      opacity: 1,
      transform: 'translateY(20px)'
    },
    {
      offset: 0.45,
      opacity: 1,
      transform: 'translateY(20px)'
    },
    {
      offset: 0.55,
      opacity: 1,
      transform: 'translateY(20px)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateY(-100vh)'
    }
  ],
  'bounce-out-down': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateY(0px)'
    },
    {
      offset: 0.2,
      opacity: 1,
      transform: 'translateY(10px)'
    },
    {
      offset: 0.4,
      opacity: 1,
      transform: 'translateY(-20px)'
    },
    {
      offset: 0.45,
      opacity: 1,
      transform: 'translateY(-20px)'
    },
    {
      offset: 0.55,
      opacity: 1,
      transform: 'translateY(-20px)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateY(100vh)'
    }
  ],
  'bounce-out-right': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateX(0px)'
    },
    {
      offset: 0.2,
      opacity: 1,
      transform: 'translateX(10px)'
    },
    {
      offset: 0.4,
      opacity: 1,
      transform: 'translateX(-20px)'
    },
    {
      offset: 0.45,
      opacity: 1,
      transform: 'translateX(-20px)'
    },
    {
      offset: 0.55,
      opacity: 1,
      transform: 'translateX(-20px)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateX(100vw)'
    }
  ],
  'bounce-out-left': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateX(0px)'
    },
    {
      offset: 0.2,
      opacity: 1,
      transform: 'translateX(-10px)'
    },
    {
      offset: 0.4,
      opacity: 1,
      transform: 'translateX(20px)'
    },
    {
      offset: 0.45,
      opacity: 1,
      transform: 'translateX(20px)'
    },
    {
      offset: 0.55,
      opacity: 1,
      transform: 'translateX(20px)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateX(-100vw)'
    }
  ],
  'fade-in': [
    {
      offset: 0,
      opacity: 0
    },
    {
      offset: 1,
      opacity: 1
    }
  ],
  'fade-in-up': [
    {
      offset: 0,
      opacity: 0,
      transform: 'translateY(100%)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'translateY(0)'
    }
  ],
  'fade-in-up-big': [
    {
      offset: 0,
      opacity: 0,
      transform: 'translateY(100vh)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'translateY(0px)'
    }
  ],
  'fade-in-down': [
    {
      offset: 0,
      opacity: 0,
      transform: 'translateY(-100%)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'translateY(0)'
    }
  ],
  'fade-in-down-big': [
    {
      offset: 0,
      opacity: 0,
      transform: 'translateY(-100vh)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'translateY(0px)'
    }
  ],
  'fade-in-right': [
    {
      offset: 0,
      easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
      fillMode: 'both',
      transform: 'translateX(50px)',
      opacity: 0
    },
    {
      offset: 1,
      easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
      fillMode: 'both',
      transform: 'translateX(0)',
      opacity: 1
    }
  ],
  'fade-in-right-big': [
    {
      offset: 0,
      opacity: 0,
      transform: 'translateX(100vw)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'translateX(0px)'
    }
  ],
  'fade-in-left': [
    {
      offset: 0,
      easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
      fillMode: 'both',
      transform: 'translateX(-50px)',
      opacity: 0
    },
    {
      offset: 1,
      easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
      fillMode: 'both',
      transform: 'translateX(0)',
      opacity: 1
    }
  ],
  'fade-in-left-big': [
    {
      offset: 0,
      opacity: 0,
      transform: 'translateX(-100vw)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'translateX(0px)'
    }
  ],
  'fade-out': [
    {
      offset: 0,
      opacity: 1
    },
    {
      offset: 1,
      opacity: 0
    }
  ],
  'fade-out-up': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateY(0)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateY(-100%)'
    }
  ],
  'fade-out-up-big': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateY(0px)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateY(-100vh)'
    }
  ],
  'fade-out-down': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateY(0)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateY(100%)'
    }
  ],
  'fade-out-down-big': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateY(0px)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateY(100vh)'
    }
  ],
  'fade-out-right': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateX(0)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateX(100%)'
    }
  ],
  'fade-out-right-big': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateX(0px)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateX(100vw)'
    }
  ],
  'fade-out-left': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateX(0)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateX(-100%)'
    }
  ],
  'fade-out-left-big': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateX(0px)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateX(-100vw)'
    }
  ],
  flip: [
    {
      offset: 0,
      backfaceVisibility: 'visible',
      easing: 'ease-out',
      transform: 'perspective(400px) scale(1) translateZ(0) rotateY(-360deg)'
    },
    {
      offset: 0.4,
      backfaceVisibility: 'visible',
      easing: 'ease-out',
      transform: 'perspective(400px) scale(1) translateZ(150px) rotateY(-190deg)'
    },
    {
      offset: 0.5,
      backfaceVisibility: 'visible',
      easing: 'ease-in',
      transform: 'perspective(400px) scale(1) translateZ(150px) rotateY(-170deg)'
    },
    {
      offset: 0.8,
      backfaceVisibility: 'visible',
      easing: 'ease-in',
      transform: 'perspective(400px) scale(0.95) translateZ(0) rotateY(0deg)'
    },
    {
      offset: 1,
      backfaceVisibility: 'visible',
      easing: 'ease-in',
      transform: 'perspective(400px) scale(1) translateZ(0) rotateY(0deg)'
    }
  ],
  'flip-in-x': [
    {
      offset: 0,
      backfaceVisibility: 'visible',
      opacity: 0,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateX(90deg)'
    },
    {
      offset: 0.4,
      backfaceVisibility: 'visible',
      opacity: 0.5,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateX(-20deg)'
    },
    {
      offset: 0.6,
      backfaceVisibility: 'visible',
      opacity: 1,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateX(10deg)'
    },
    {
      offset: 0.8,
      backfaceVisibility: 'visible',
      opacity: 1,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateX(-5deg)'
    },
    {
      offset: 1,
      backfaceVisibility: 'visible',
      opacity: 1,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateX(0deg)'
    }
  ],
  'flip-in-y': [
    {
      offset: 0,
      backfaceVisibility: 'visible',
      opacity: 0,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateY(90deg)'
    },
    {
      offset: 0.4,
      backfaceVisibility: 'visible',
      opacity: 0.5,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateY(-20deg)'
    },
    {
      offset: 0.6,
      backfaceVisibility: 'visible',
      opacity: 1,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateY(10deg)'
    },
    {
      offset: 0.8,
      backfaceVisibility: 'visible',
      opacity: 1,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateY(-5deg)'
    },
    {
      offset: 1,
      backfaceVisibility: 'visible',
      opacity: 1,
      easing: 'ease-in',
      transform: 'perspective(400px) rotateY(0deg)'
    }
  ],
  'flip-out-x': [
    {
      offset: 0,
      backfaceVisibility: 'visible',
      opacity: 1,
      transform: 'perspective(400px) rotateX(0deg)'
    },
    {
      offset: 0.3,
      backfaceVisibility: 'visible',
      opacity: 1,
      transform: 'perspective(400px) rotateX(-15deg)'
    },
    {
      offset: 1,
      backfaceVisibility: 'visible',
      opacity: 0,
      transform: 'perspective(400px) rotateX(90deg)'
    }
  ],
  'flip-out-y': [
    {
      offset: 0,
      backfaceVisibility: 'visible',
      opacity: 1,
      transform: 'perspective(400px) rotateY(0deg)'
    },
    {
      offset: 0.3,
      backfaceVisibility: 'visible',
      opacity: 1,
      transform: 'perspective(400px) rotateY(-15deg)'
    },
    {
      offset: 1,
      backfaceVisibility: 'visible',
      opacity: 0,
      transform: 'perspective(400px) rotateY(90deg)'
    }
  ],
  'light-speed-in': [
    {
      offset: 0,
      easing: 'ease-out',
      opacity: 0,
      transform: 'translateX(200px) skewX(-30deg)'
    },
    {
      offset: 0.6,
      easing: 'ease-out',
      opacity: 1,
      transform: 'translateX(0px) skewX(20deg)'
    },
    {
      offset: 0.8,
      easing: 'ease-out',
      opacity: 1,
      transform: 'translateX(0px) skewX(-5deg)'
    },
    {
      offset: 1,
      easing: 'ease-out',
      opacity: 1,
      transform: 'translateX(0px) skewX(0deg)'
    }
  ],
  'light-speed-out': [
    {
      offset: 0,
      easing: 'ease-in',
      opacity: 1,
      transform: 'translateX(0px) skewX(0deg)'
    },
    {
      offset: 1,
      easing: 'ease-in',
      opacity: 0,
      transform: 'translateX(200px) skewX(30deg)'
    }
  ],
  'rotate-in': [
    {
      offset: 0,
      opacity: 0,
      transform: 'rotateZ(180deg)',
      transformOrigin: 'center'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'center'
    }
  ],
  'rotate-in-clockwise': [
    {
      offset: 0,
      opacity: 0,
      transform: 'rotateZ(-180deg)',
      transformOrigin: 'center'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'center'
    }
  ],
  'rotate-in-down-left': [
    {
      offset: 0,
      opacity: 0,
      transform: 'rotateZ(-45deg)',
      transformOrigin: 'left bottom'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'left bottom'
    }
  ],
  'rotate-in-down-right': [
    {
      offset: 0,
      opacity: 0,
      transform: 'rotateZ(45deg)',
      transformOrigin: 'right bottom'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'right bottom'
    }
  ],
  'rotate-in-up-left': [
    {
      offset: 0,
      opacity: 0,
      transform: 'rotateZ(45deg)',
      transformOrigin: 'left bottom'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'left bottom'
    }
  ],
  'rotate-in-up-right': [
    {
      offset: 0,
      opacity: 0,
      transform: 'rotateZ(-45deg)',
      transformOrigin: 'right bottom'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'right bottom'
    }
  ],
  'rotate-out': [
    {
      offset: 0,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'center'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'rotateZ(180deg)',
      transformOrigin: 'center'
    }
  ],
  'rotate-out-clockwise': [
    {
      offset: 0,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'center'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'rotateZ(-180deg)',
      transformOrigin: 'center'
    }
  ],
  'rotate-out-down-left': [
    {
      offset: 0,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'left bottom'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'rotateZ(45deg)',
      transformOrigin: 'left bottom'
    }
  ],
  'rotate-out-down-right': [
    {
      offset: 0,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'right bottom'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'rotateZ(-45deg)',
      transformOrigin: 'right bottom'
    }
  ],
  'rotate-out-up-left': [
    {
      offset: 0,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'left bottom'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'rotateZ(-45deg)',
      transformOrigin: 'left bottom'
    }
  ],
  'rotate-out-up-right': [
    {
      offset: 0,
      opacity: 1,
      transform: 'rotateZ(0deg)',
      transformOrigin: 'right bottom'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'rotateZ(45deg)',
      transformOrigin: 'right bottom'
    }
  ],
  'slide-in-up': [
    {
      offset: 0,
      transform: 'translateY(100%)',
      visibility: 'hidden'
    },
    {
      offset: 1,
      transform: 'translateY(0)',
      visibility: 'visible'
    }
  ],
  'slide-in-down': [
    {
      offset: 0,
      transform: 'translateY(-100%)',
      visibility: 'hidden'
    },
    {
      offset: 1,
      transform: 'translateY(0)',
      visibility: 'visible'
    }
  ],
  'slide-in-left': [
    {
      offset: 0,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fillMode: 'both',
      transform: 'translateX(-100vw)',
      opacity: 0
    },
    {
      offset: 1,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fillMode: 'both',
      transform: 'translateX(0)',
      opacity: 1
    }
  ],
  'slide-in-right': [
    {
      offset: 0,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fillMode: 'both',
      transform: 'translateX(100vw)',
      opacity: 0
    },
    {
      offset: 1,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fillMode: 'both',
      transform: 'translateX(0)',
      opacity: 1
    }
  ],
  'slide-out-up': [
    {
      offset: 0,
      transform: 'translateY(0)',
      visibility: 'visible'
    },
    {
      offset: 1,
      transform: 'translateY(-100%)',
      visibility: 'hidden'
    }
  ],
  'slide-out-down': [
    {
      offset: 0,
      transform: 'translateY(0)',
      visibility: 'visible'
    },
    {
      offset: 1,
      transform: 'translateY(100%)',
      visibility: 'hidden'
    }
  ],
  'slide-out-left': [
    {
      offset: 0,
      transform: 'translateX(0)',
      visibility: 'visible'
    },
    {
      offset: 1,
      transform: 'translateX(-100%)',
      visibility: 'hidden'
    }
  ],
  'slide-out-right': [
    {
      offset: 0,
      transform: 'translateX(0)',
      visibility: 'visible'
    },
    {
      offset: 1,
      transform: 'translateX(100%)',
      visibility: 'hidden'
    }
  ],
  'zoom-in': [
    {
      offset: 0,
      opacity: 0,
      transform: 'scale(1)'
    },
    {
      offset: 0.5,
      opacity: 0,
      transform: 'scale(0.3)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'scale(1)'
    }
  ],
  'zoom-in-up': [
    {
      offset: 0,
      opacity: 0,
      transform: 'scale(0.1) translateY(-100vh)',
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    },
    {
      offset: 0.6,
      opacity: 1,
      transform: 'scale(0.475) translateY(60px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'scale(1) translateY(0px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    }
  ],
  'zoom-in-down': [
    {
      offset: 0,
      opacity: 0,
      transform: 'scale(0.1) translateY(100vh)',
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    },
    {
      offset: 0.6,
      opacity: 1,
      transform: 'scale(0.475) translateY(-60px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'scale(1) translateY(0px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    }
  ],
  'zoom-in-left': [
    {
      offset: 0,
      opacity: 0,
      transform: 'scale(0.1) translateX(-100vw)',
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    },
    {
      offset: 0.6,
      opacity: 1,
      transform: 'scale(0.475) translateX(10px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'scale(1) translateX(0px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    }
  ],
  'zoom-in-right': [
    {
      offset: 0,
      opacity: 0,
      transform: 'scale(0.1) translateX(100vw)',
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    },
    {
      offset: 0.6,
      opacity: 1,
      transform: 'scale(0.475) translateX(-10px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'scale(1) translateX(0px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    }
  ],
  'zoom-out': [
    {
      offset: 0,
      opacity: 1,
      transform: 'scale(1)'
    },
    {
      offset: 0.5,
      opacity: 0,
      transform: 'scale(0.3)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'scale(0)'
    }
  ],
  'zoom-out-up': [
    {
      offset: 0,
      opacity: 1,
      transform: 'scale(1) translateY(0px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
      transformOrigin: 'center'
    },
    {
      offset: 0.4,
      opacity: 1,
      transform: 'scale(0.475) translateY(60px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
      transformOrigin: 'center'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'scale(0.1) translateY(-100vh)',
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      transformOrigin: 'center bottom'
    }
  ],
  'zoom-out-down': [
    {
      offset: 0,
      opacity: 1,
      transform: 'scale(1) translateY(0px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
      transformOrigin: 'center'
    },
    {
      offset: 0.4,
      opacity: 1,
      transform: 'scale(0.475) translateY(-60px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
      transformOrigin: 'center'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'scale(0.1) translateY(100vh)',
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      transformOrigin: 'center bottom'
    }
  ],
  'zoom-out-left': [
    {
      offset: 0,
      opacity: 1,
      transform: 'scale(1) translateX(0px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    },
    {
      offset: 0.4,
      opacity: 1,
      transform: 'scale(0.475) translateX(10px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'scale(0.1) translateX(-100vw)',
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    }
  ],
  'zoom-out-right': [
    {
      offset: 0,
      opacity: 1,
      transform: 'scale(1) translateX(0px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    },
    {
      offset: 0.4,
      opacity: 1,
      transform: 'scale(0.475) translateX(-10px)',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'scale(0.1) translateX(100vw)',
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    }
  ],
  hinge: [
    {
      offset: 0,
      transform: 'rotate(0)',
      opacity: 1,
      transformOrigin: 'top left',
      easing: 'ease-in-out'
    },
    {
      offset: 0.2,
      transform: 'rotateZ(80deg)',
      opacity: 1,
      transformOrigin: 'top left',
      easing: 'ease-in-out'
    },
    {
      offset: 0.4,
      transform: 'rotateZ(60deg)',
      opacity: 1,
      transformOrigin: 'top left',
      easing: 'ease-in-out'
    },
    {
      offset: 0.6,
      transform: 'rotateZ(80deg)',
      opacity: 1,
      transformOrigin: 'top left',
      easing: 'ease-in-out'
    },
    {
      offset: 0.8,
      transform: 'rotateZ(60deg)',
      opacity: 1,
      transformOrigin: 'top left',
      easing: 'ease-in-out'
    },
    {
      offset: 1,
      opacity: 0,
      transformOrigin: 'top left',
      easing: 'ease-in-out',
      transform: 'translateY(700px)'
    }
  ],
  'jack-in-the-box': [
    {
      offset: 0,
      opacity: 0,
      transform: 'scale(0.1) rotate(30deg)',
      transformOrigin: 'center bottom'
    },
    {
      offset: 0.5,
      opacity: 0.3,
      transform: 'rotate(-10deg)',
      transformOrigin: '50% 50% 0'
    },
    {
      offset: 0.7,
      opacity: 0.6,
      transform: 'rotate(3deg)',
      transformOrigin: '50% 50% 0'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'scale(1)',
      transformOrigin: '50% 50% 0'
    }
  ],
  'roll-in': [
    {
      offset: 0,
      opacity: 0,
      transform: 'translateX(-100%) rotateZ(-120deg)'
    },
    {
      offset: 1,
      opacity: 1,
      transform: 'translateX(0%)'
    }
  ],
  'roll-out': [
    {
      offset: 0,
      opacity: 1,
      transform: 'translateX(0%)'
    },
    {
      offset: 1,
      opacity: 0,
      transform: 'translateX(100%) rotateZ(120deg)'
    }
  ]
};
