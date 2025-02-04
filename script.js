document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".student-section");
    const nextButton = document.getElementById("next-section");
    const prevButton = document.getElementById("prev-section");
    const headerSection = document.getElementById("header-section");

    let currentSection = -1; // начинаем с заголовка

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.remove("active");
            section.classList.remove("animated-info");
            if (i === index) {
                section.classList.add("active");
                // запускаем анимацию инфографики
                setTimeout(() => {
                    section.classList.add("animated-info");
                }, 300);
            }
        });

        // Перемещение заголовка
        if (index >= 0) {
            headerSection.classList.add("moved-up");
            prevButton.style.display = "block";
            setTimeout(() => prevButton.style.opacity = "1", 500);
        } else {
            headerSection.classList.remove("moved-up");
            prevButton.style.opacity = "0";
            setTimeout(() => prevButton.style.display = "none", 500);
        }

        // Кнопки навигации
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

    // Запрещаем ручной скролл, если хотите управлять переходом только кнопками
    document.addEventListener("wheel", function (event) {
        event.preventDefault();
    }, { passive: false });

    document.addEventListener("touchmove", function (event) {
        event.preventDefault();
    }, { passive: false });

    // Инициализация диаграмм с дополнительными анимационными параметрами
    var ctxEI = document.getElementById('chartEI').getContext('2d');
    var chartEI = new Chart(ctxEI, {
        type: 'radar',
        data: {
            labels: ['Вовлечённость', 'Инициатива', 'Эмпатия', 'Самосознание'],
            datasets: [{
                label: 'Эмоциональный интеллект',
                data: [75, 85, 65, 90],
                backgroundColor: 'rgba(248, 149, 64, 0.2)',
                borderColor: 'rgba(248, 149, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 1000,
                easing: 'easeOutBounce'
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    var ctxLeadership = document.getElementById('chartLeadership').getContext('2d');
    var chartLeadership = new Chart(ctxLeadership, {
        type: 'bar',
        data: {
            labels: ['Коммуникация', 'Принятие решений', 'Мотивация'],
            datasets: [{
                label: 'Лидерство',
                data: [80, 70, 75],
                backgroundColor: 'rgba(70, 130, 180, 0.2)',
                borderColor: 'rgba(70, 130, 180, 1)',
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 1000,
                easing: 'easeOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    var ctxBehavior = document.getElementById('chartBehavior').getContext('2d');
    var chartBehavior = new Chart(ctxBehavior, {
        type: 'doughnut',
        data: {
            labels: ['Положительные', 'Отрицательные'],
            datasets: [{
                label: 'Поведение',
                data: [95, 5],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.6)',
                    'rgba(231, 76, 60, 0.6)'
                ],
                borderColor: [
                    'rgba(46, 204, 113, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 1000,
                easing: 'easeOutBounce'
            },
            responsive: true
        }
    });
});
