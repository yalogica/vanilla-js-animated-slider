const slider = function() {
    // init slider
    this.init = () => {
        // find all unready sliders and turn them on
        const $sliders = document.querySelectorAll('.slider:not(.slider-ready)');
        for(const $slider of $sliders) {
            build($slider);
        }
    }
    
    const build = ($slider) => {
        // bind nav controls
        const $prev = $slider.querySelector('.slider-nav .slider-prev');
        const $next = $slider.querySelector('.slider-nav .slider-next');

        $prev.addEventListener('click', prev);
        $next.addEventListener('click', next);

        // init animation for images
        const $images = $slider.querySelectorAll('.slider-slides .slider-slide img');
        for(const $image of $images) {
            $image.classList.add('animate__animated');
        }

        // get the first slide and show it
        const $slide = $slider.querySelector('.slider-slides .slider-slide');
        show($slide);



        // we're ready
        $slider.classList.add('slider-ready');
    }

    const show = ($slide) => {
        if(!$slide) return;

        const animationClass = 'animate__jackInTheBox';

        // hide currect active slide
        const $slideActive = $slide.parentNode.querySelector('.slider-slide.slider-active');
        if($slideActive) {
            $slideActive.classList.remove('slider-active');
            $slideActive.querySelector('img').classList.remove(animationClass);
        }
        
        // show new slide
        $slide.classList.add('slider-active');

        // enable show animation
        $slide.querySelector('img').classList.add(animationClass);
    }

    // find the closest element
    const closest = (el, selector) => {       
        do {
            if(Element.prototype.matches.call(el, selector)) return el;
            el = el.parentNode;
        } while (el !== null && el.nodeType === 1); // nodeType === Node.ELEMENT_NODE
        
        return null;
    }

    // go to the prev slide
    const prev = (e) => {
        const $slider = closest(e.target, '.slider');
        const $slides = $slider.querySelectorAll('.slider-slide');
        for(let i=0; i<$slides.length; i++) {
            if($slides[i].classList.contains('slider-active')) {
                i = i>0 ? i-1 : $slides.length-1;
                show($slides[i]);
                break;
            }
        }
    }

    // go to the next slide
    const next = (e) => {
        const $slider = closest(e.target, '.slider');
        const $slides = $slider.querySelectorAll('.slider-slide');
        for(let i=0; i<$slides.length; i++) {
            if($slides[i].classList.contains('slider-active')) {
                i = i<$slides.length-1 ? i+1 : 0;
                show($slides[i]);
                break;
            }
        }
    }

    return this;
}();


window.onload = () => {
    slider.init();
};