const navLinks = document.querySelectorAll(".profile__nav-link");
const activityCards = document.querySelectorAll(".activity-card");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // Function to update the card values based on the selected timeframe
    const updateCards = (timeframe) => {
      activityCards.forEach((card) => {
        const title = card.querySelector(".activity-card__title").textContent;
        const current = card.querySelector(".activity-card__current");
        const previous = card.querySelector(".activity-card__previous");

        const activity = data.find((item) => item.title === title);
        if (activity) {
          current.textContent = `${activity.timeframes[timeframe].current}hrs`;
          previous.textContent = `Last Week - ${activity.timeframes[timeframe].previous}hrs`;
        }
      });
    };

    // Function to set the active link
    const setActiveLink = (activeLink) => {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      activeLink.classList.add("active");
    };

    // Add event listeners to the nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const timeframe = link.dataset.timeframe;
        updateCards(timeframe);
        setActiveLink(link);
      });
    });

    // Initialize with weekly data and set the active link
    updateCards("weekly");
    const weeklyLink = document.querySelector(
      ".profile__nav-link[data-timeframe='weekly']"
    );
    setActiveLink(weeklyLink);
  })
  .catch((error) => console.error("Error fetching data:", error));
