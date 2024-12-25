const navLinks = document.querySelector(".profile__nav-list");
const activityCards = document.querySelectorAll(".activity-card");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // Function to update the card values based on the selected timeframe
    const updateCards = (timeframe) => {
      const previousText = {
        daily: "Yesterday",
        weekly: "Last Week",
        monthly: "Last Month",
      };

      activityCards.forEach((card) => {
        const title = card.querySelector(".activity-card__title").textContent;
        const current = card.querySelector(".activity-card__current");
        const previous = card.querySelector(".activity-card__previous");

        const activity = data.find((item) => item.title === title);
        if (activity) {
          current.textContent = `${activity.timeframes[timeframe].current}hrs`;
          previous.textContent = `${previousText[timeframe]} - ${activity.timeframes[timeframe].previous}hrs`;
        }
      });
    };

    // Function to set the active link
    const setActiveLink = (activeLink) => {
      document.querySelectorAll(".profile__nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      activeLink.classList.add("active");
    };

    // Event delegation for nav links
    navLinks.addEventListener("click", (event) => {
      if (event.target.classList.contains("profile__nav-link")) {
        event.preventDefault();
        const timeframe = event.target.dataset.timeframe;
        updateCards(timeframe);
        setActiveLink(event.target);
      }
    });

    // Initialize with weekly data and set the active link
    updateCards("weekly");
    const weeklyLink = document.querySelector(
      ".profile__nav-link[data-timeframe='weekly']"
    );
    setActiveLink(weeklyLink);
  })
  .catch((error) => console.error("Error fetching data:", error));
