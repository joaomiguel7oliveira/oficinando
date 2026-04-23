const slider = document.getElementById("pontuacao");
const sliderTooltip = document.getElementById("sliderTooltip");

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

