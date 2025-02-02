document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".student-section");
    const nextButton = document.getElementById("next-section");
    const prevButton = document.getElementById("prev-section");
    const headerSection = document.getElementById("header-section");

    let currentSection = -1; // Начинаем с заголовка

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.remove("active");
            if (i === index) {
                section.classList.add("active");
            }
        });

        // Перемещение заголовка вверх после первого нажатия
        if (index >= 0) {
            headerSection.classList.add("moved-up");
            prevButton.style.display = "block";
            setTimeout(() => prevButton.style.opacity = "1", 500);
        } else {
            headerSection.classList.remove("moved-up");
            prevButton.style.opacity = "0";
            setTimeout(() => prevButton.style.display = "none", 500);
        }

        if (index === sections.length - 1) {
            nextButton.style.display = "none";
        } else {
            nextButton.style.display = "block";
        }
    }

    nextButton.addEventListener("click", function () {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showSection(currentSection);
        }
    });

    prevButton.addEventListener("click", function () {
        currentSection = -1;
        showSection(currentSection);
    });

    // Запрещаем скролл вручную
    document.addEventListener("wheel", function (event) {
        event.preventDefault();
    }, { passive: false });

    document.addEventListener("touchmove", function (event) {
        event.preventDefault();
    }, { passive: false });
});
