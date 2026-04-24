const slider = document.getElementById("pontuacao");
const sliderTooltip = document.getElementById("sliderTooltip");
const themeToggle = document.getElementById("themeToggle");
const buttons = document.querySelectorAll(".btn");

const THEME_KEY = "oficinando-style-theme";
const THEME_WARM = "warm";
const THEME_NEUTRAL = "neutral";
const THEME_DARK = "dark";
const THEME_GRAY = "gray";
const THEME_OCEAN = "ocean";
const THEME_FOREST = "forest";
const THEMES = [THEME_WARM, THEME_NEUTRAL, THEME_DARK, THEME_GRAY, THEME_OCEAN, THEME_FOREST];
const PRESSED_CLASS = "is-pressed";

const setTheme = (theme) => {
    const nextTheme = THEMES.includes(theme) ? theme : THEME_WARM;
    document.body.dataset.theme = nextTheme;
    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", "true");
        themeToggle.textContent = `Tema atual: ${nextTheme}`;
    }
};

const savedTheme = localStorage.getItem(THEME_KEY);
setTheme(savedTheme || THEME_WARM);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.body.dataset.theme || THEME_WARM;
        const currentIndex = THEMES.indexOf(currentTheme);
        const safeIndex = currentIndex >= 0 ? currentIndex : 0;
        const nextTheme = THEMES[(safeIndex + 1) % THEMES.length];

        document.body.classList.add("theme-transition");
        setTheme(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);

        window.setTimeout(() => {
            document.body.classList.remove("theme-transition");
        }, 300);
    });
}

buttons.forEach((button) => {
    let releaseTimeoutId;

    const clearPressed = () => {
        window.clearTimeout(releaseTimeoutId);
        button.classList.remove(PRESSED_CLASS);
    };

    button.addEventListener("pointerdown", () => {
        if (button.disabled) {
            return;
        }

        window.clearTimeout(releaseTimeoutId);
        button.classList.add(PRESSED_CLASS);
    });

    button.addEventListener("pointerup", clearPressed);
    button.addEventListener("pointercancel", clearPressed);
    button.addEventListener("mouseleave", clearPressed);
    button.addEventListener("blur", clearPressed);

    button.addEventListener("keydown", (event) => {
        if ((event.key === " " || event.key === "Enter") && !button.disabled) {
            window.clearTimeout(releaseTimeoutId);
            button.classList.add(PRESSED_CLASS);
        }
    });

    button.addEventListener("keyup", (event) => {
        if (event.key === " " || event.key === "Enter") {
            clearPressed();
        }
    });
});

if (slider && sliderTooltip) {
    const sliderOuter = slider.closest(".slider-outer");
    const syncSlider = () => {
        const value = Number(slider.value);
        const min = Number(slider.min) || 0;
        const max = Number(slider.max) || 100;
        const pct = ((value - min) / (max - min)) * 100;
        slider.style.setProperty("--slider-progress", `${pct}%`);
        if (sliderOuter) {
            sliderOuter.style.setProperty("--slider-progress", `${pct}%`);
        }
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


