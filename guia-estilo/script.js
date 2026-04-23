const slider = document.getElementById("pontuacao");
const sliderTooltip = document.getElementById("sliderTooltip");
const clickDemoBtn = document.getElementById("clickDemoBtn");
const clickDemoText = document.getElementById("clickDemoText");

if (slider && sliderTooltip) {
    const syncSlider = () => {
        const value = Number(slider.value);
        const min = Number(slider.min) || 0;
        const max = Number(slider.max) || 100;
        const pct = ((value - min) / (max - min)) * 100;
        slider.style.setProperty("--slider-progress", `${pct}%`);
        sliderTooltip.textContent = `${value}%`;
        // Align tooltip center with thumb position
        const thumbRadius = 11;
        const trackW = slider.offsetWidth - thumbRadius * 2;
        const leftPx = thumbRadius + (trackW * pct) / 100;
        sliderTooltip.style.left = `${leftPx}px`;
    };

    slider.addEventListener("input", syncSlider);
    window.addEventListener("resize", syncSlider);
    // Delay first sync so offsetWidth is available
    requestAnimationFrame(syncSlider);
}

if (clickDemoBtn && clickDemoText) {
    let clicks = 0;

    clickDemoBtn.addEventListener("pointerdown", () => {
        clickDemoBtn.classList.add("is-pressing");
        clickDemoText.textContent = "Pressionando...";
        clickDemoText.classList.add("is-reacted");
    });

    const releasePress = () => {
        clickDemoBtn.classList.remove("is-pressing");
    };

    clickDemoBtn.addEventListener("pointerup", () => {
        clicks += 1;
        clickDemoText.textContent = `Pressões registradas: ${clicks}`;
        releasePress();
    });

    clickDemoBtn.addEventListener("pointercancel", releasePress);
    clickDemoBtn.addEventListener("pointerleave", releasePress);
}
