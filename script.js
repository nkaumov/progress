document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".student-section");
    const scrollDownBtn = document.getElementById("scroll-down-btn");
    const scrollUpBtn = document.getElementById("scroll-up-btn");
  
    // Индекс текущей секции (та, что в фокусе)
    let currentSectionIndex = 0;
  
    // Флаги, чтобы не пересоздавать графики
    let chartEIcreated = false;
    let chartLeadershipCreated = false;
    let chartBehaviorCreated = false;
  
    // Создание графиков
    function createChartEI() {
      const ctxEI = document.getElementById("chartEI").getContext("2d");
      new Chart(ctxEI, {
        type: "radar",
        data: {
          labels: ["Вовлечённость", "Инициатива", "Эмпатия", "Самосознание"],
          datasets: [
            {
              label: "Эмоциональный интеллект",
              data: [75, 85, 65, 90],
              backgroundColor: "rgba(248, 149, 64, 0.2)",
              borderColor: "rgba(248, 149, 64, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: {
            duration: 1000,
            easing: "easeOutBounce",
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
            },
          },
          responsive: true,
        },
      });
    }
  
    function createChartLeadership() {
      const ctxLeadership = document
        .getElementById("chartLeadership")
        .getContext("2d");
      new Chart(ctxLeadership, {
        type: "bar",
        data: {
          labels: ["Коммуникация", "Принятие решений", "Мотивация"],
          datasets: [
            {
              label: "Лидерство",
              data: [80, 70, 75],
              backgroundColor: "rgba(70, 130, 180, 0.2)",
              borderColor: "rgba(70, 130, 180, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: {
            duration: 1000,
            easing: "easeOutBounce",
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
          responsive: true,
        },
      });
    }
  
    function createChartBehavior() {
      const ctxBehavior = document.getElementById("chartBehavior").getContext("2d");
      new Chart(ctxBehavior, {
        type: "doughnut",
        data: {
          labels: ["Положительные", "Отрицательные"],
          datasets: [
            {
              label: "Поведение",
              data: [95, 5],
              backgroundColor: [
                "rgba(46, 204, 113, 0.6)",
                "rgba(231, 76, 60, 0.6)",
              ],
              borderColor: [
                "rgba(46, 204, 113, 1)",
                "rgba(231, 76, 60, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: {
            duration: 1000,
            easing: "easeOutBounce",
          },
          responsive: true,
        },
      });
    }
  
    // Intersection Observer: определяем, какая секция "главная" (с наибольшим intersectionRatio)
    const observerOptions = {
      root: null,
      threshold: 0.3,
    };
  
    const observer = new IntersectionObserver((entries) => {
      let maxRatio = 0;
      let indexOfMax = currentSectionIndex;
  
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          indexOfMax = Array.from(sections).indexOf(entry.target);
  
          // Активация секции (анимация появления)
          entry.target.classList.add("active");
  
          // Создаём графики при первом появлении секции
          if (entry.target.id === "section-1" && !chartEIcreated) {
            createChartEI();
            chartEIcreated = true;
          }
          if (entry.target.id === "section-2" && !chartLeadershipCreated) {
            createChartLeadership();
            chartLeadershipCreated = true;
          }
          if (entry.target.id === "section-3" && !chartBehaviorCreated) {
            createChartBehavior();
            chartBehaviorCreated = true;
          }
        }
      });
  
      currentSectionIndex = indexOfMax;
    }, observerOptions);
  
    sections.forEach((section) => observer.observe(section));
  
    // Кнопка «вниз»: скроллим к следующей секции
    scrollDownBtn.addEventListener("click", function () {
      const nextIndex = currentSectionIndex + 1;
      if (nextIndex < sections.length) {
        sections[nextIndex].scrollIntoView({ behavior: "smooth" });
      }
    });
  
    // Кнопка «вверх»: скроллим к предыдущей секции
    scrollUpBtn.addEventListener("click", function () {
      const prevIndex = currentSectionIndex - 1;
      if (prevIndex >= 0) {
        sections[prevIndex].scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  