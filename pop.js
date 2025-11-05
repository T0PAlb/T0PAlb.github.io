
const gallerySlider = document.getElementById('gallerySlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const galleryPager = document.getElementById('galleryPager');

let currentSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

const itemsPerPage = window.innerWidth < 768 ? 1 : 3;
const totalItems = 12; 
const totalPages = Math.ceil(totalItems / itemsPerPage);


function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function setSliderPosition() {
    gallerySlider.style.transform = `translateX(${currentTranslate}px)`;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
    const slideWidth = gallerySlider.offsetWidth / itemsPerPage;
    currentTranslate = currentSlide * -slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}


gallerySlider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPos = getPositionX(e);
    animationID = requestAnimationFrame(animation);
    gallerySlider.style.cursor = 'grabbing';
});

gallerySlider.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
});

gallerySlider.addEventListener('mouseup', () => {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -100 && currentSlide < totalPages - 1) {
        currentSlide += 1;
    }
    
    if (movedBy > 100 && currentSlide > 0) {
        currentSlide -= 1;
    }
    
    setPositionByIndex();
    gallerySlider.style.cursor = 'grab';
});

gallerySlider.addEventListener('mouseleave', () => {
    if (isDragging) {
        setPositionByIndex();
        isDragging = false;
    }
});


function updatePager() {
    galleryPager.innerHTML = '';
    
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = `page-dot ${i === currentSlide ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentSlide = i;
            setPositionByIndex();
            updatePager();
        });
        galleryPager.appendChild(dot);
    }
}

prevBtn.addEventListener('click', () => {
    currentSlide = Math.max(currentSlide - 1, 0);
    setPositionByIndex();
    updatePager();
});

nextBtn.addEventListener('click', () => {
    currentSlide = Math.min(currentSlide + 1, totalPages - 1);
    setPositionByIndex();
    updatePager();
});


window.addEventListener('resize', () => {
    setPositionByIndex();
});


setPositionByIndex();
updatePager();
