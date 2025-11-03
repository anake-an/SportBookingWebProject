// js/slideshows.js
// Handles all slideshow components

export function initSlideshows() {

    // --- 2. SLIDESHOW CODE (for index.html) ---
    const slideshow = document.querySelector(".hero-slideshow");
    if (slideshow) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        let slideIndex = 0;
        let slideTimer;

        function showSlide(n) {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.opacity = "0";
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            if (n > slides.length) { slideIndex = 1; }
            else if (n < 1) { slideIndex = slides.length; }
            else { slideIndex = n; }
            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].style.opacity = "1";
            }
            if (dots[slideIndex - 1]) {
                dots[slideIndex - 1].className += " active";
            }
        }
        function autoShowSlides() {
            slideIndex++;
            showSlide(slideIndex);
            slideTimer = setTimeout(autoShowSlides, 5000);
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", function () {
                clearTimeout(slideTimer);
                showSlide(i + 1);
            });
        }
        showSlide(1);
        slideTimer = setTimeout(autoShowSlides, 5000);
    }

    // --- 13. AI SUGGESTION SLIDESHOW (for user_dashboard.html) ---
    const aiSlideshow = document.querySelector(".ai-slideshow");
    if (aiSlideshow) {
        const aiSlides = aiSlideshow.getElementsByClassName("ai-slide");
        const aiDots = aiSlideshow.getElementsByClassName("ai-dot");
        let aiSlideIndex = 0;
        let aiSlideTimer;

        function showAiSlide(n) {
            for (let i = 0; i < aiSlides.length; i++) {
                aiSlides[i].style.opacity = "0";
            }
            for (let i = 0; i < aiDots.length; i++) {
                aiDots[i].className = aiDots[i].className.replace(" active", "");
            }
            if (n > aiSlides.length) { aiSlideIndex = 1; }
            else if (n < 1) { aiSlideIndex = aiSlides.length; }
            else { aiSlideIndex = n; }

            if (aiSlides[aiSlideIndex - 1]) {
                aiSlides[aiSlideIndex - 1].style.opacity = "1";
            }
            if (aiDots[aiSlideIndex - 1]) {
                aiDots[aiSlideIndex - 1].className += " active";
            }
        }
        function autoShowAiSlides() {
            aiSlideIndex++;
            showAiSlide(aiSlideIndex);
            aiSlideTimer = setTimeout(autoShowAiSlides, 5000);
        }
        for (let i = 0; i < aiDots.length; i++) {
            aiDots[i].addEventListener("click", function () {
                clearTimeout(aiSlideTimer);
                showAiSlide(i + 1);
            });
        }
        showAiSlide(1);
        aiSlideTimer = setTimeout(autoShowAiSlides, 5000);
    }
}