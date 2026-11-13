
/* AKHIL PORTFOLIO — INTERACTIONS */

// Add your Google Drive project links here when ready.
const projectLinks = {
    project1: "",
    project2: "",
    project3: ""
};

// MOBILE NAVIGATION
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("mobile-open");

        menuButton.textContent = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("mobile-open");
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open menu");
        });
    });
}

// PROJECT BUTTONS
document.querySelectorAll("[data-drive]").forEach(button => {
    button.addEventListener("click", event => {
        const projectId = button.dataset.drive;
        const driveUrl = projectLinks[projectId];

        if (!driveUrl) {
            event.preventDefault();
            alert("Project link coming soon. Please check back later!");
            return;
        }

        button.href = driveUrl;
        button.target = "_blank";
        button.rel = "noopener noreferrer";
    });
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .timeline-item, " +
    ".work-card, .skill-card, .education-card"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

// ACTIVE NAVIGATION
const pageSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navigation a");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            }
        });
    }, {
        threshold: 0.35
    });

    pageSections.forEach(section => sectionObserver.observe(section));
}

// CURSOR GLOW
const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", event => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

// FOOTER YEAR
const footerMessage = document.querySelector("footer p");

if (footerMessage) {
    footerMessage.textContent =
        `© ${new Date().getFullYear()} AKHIL KUMAR. ALL RIGHTS RESERVED.`;
}

console.log("AKHIL — TVA creative portfolio loaded.");

// LOGO SLIDER - AUTOMATIC + MANUAL

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("logoSlider");

    if (!slider) return;

    const track = slider.querySelector(".logo-track");
    const slides = slider.querySelectorAll(".logo-slide");
    const dots = slider.querySelectorAll(".logo-dot");
    const prev = slider.querySelector(".logo-prev");
    const next = slider.querySelector(".logo-next");

    let currentIndex = 0;
    let autoSlide;

    function showSlide(index) {

        currentIndex = (index + slides.length) % slides.length;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function startAutoSlide() {
        clearInterval(autoSlide);

        autoSlide = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 3000);
    }

    function manualSlide(index) {
        showSlide(index);
        startAutoSlide();
    }

    next.addEventListener("click", () => {
        manualSlide(currentIndex + 1);
    });

    prev.addEventListener("click", () => {
        manualSlide(currentIndex - 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            manualSlide(index);
        });
    });

    slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    slider.addEventListener("mouseleave", startAutoSlide);

    showSlide(0);
    startAutoSlide();

});


// MAGICAL DOLL INTERACTION

const magicDoll = document.getElementById("magicDoll");

if (magicDoll) {
    function activateMagic() {
        magicDoll.classList.remove("magic-active");

        void magicDoll.offsetWidth;

        magicDoll.classList.add("magic-active");

        setTimeout(() => {
            magicDoll.classList.remove("magic-active");
        }, 1000);
    }

    magicDoll.addEventListener("click", activateMagic);

    magicDoll.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activateMagic();
        }
    });
}

// ========================================
// CV VIEWER — AKHIL PORTFOLIO
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const viewCV = document.getElementById("viewCV");
    const cvModal = document.getElementById("cvModal");
    const closeCV = document.getElementById("closeCV");

    if (!viewCV || !cvModal || !closeCV) {
        console.warn("CV viewer elements not found.");
        return;
    }

    // OPEN CV VIEWER
    function openCV() {
        cvModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    // CLOSE CV VIEWER
    function closeCVViewer() {
        cvModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    // VIEW BUTTON
    viewCV.addEventListener("click", openCV);

    // CLOSE BUTTON
    closeCV.addEventListener("click", closeCVViewer);

    // CLOSE WHEN CLICKING OUTSIDE
    cvModal.addEventListener("click", (event) => {
        if (event.target === cvModal) {
            closeCVViewer();
        }
    });

    // CLOSE USING ESCAPE KEY
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" &&
            cvModal.classList.contains("active")) {
            closeCVViewer();
        }
    });

});

console.log("AKHIL CV Viewer Ready!");

