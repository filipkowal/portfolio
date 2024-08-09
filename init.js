let pagespeedCard;
let cards;
let metrics;

const DOMLoadedPromise = new Promise((resolve) => {
  window.addEventListener("DOMContentLoaded", () => {
    cards = document.querySelectorAll(".card");
    pagespeedCard = document.querySelector(".pagespeed-card");
    metrics = pagespeedCard.querySelectorAll(".metric");
    resolve();
  });
});

export { DOMLoadedPromise, cards, pagespeedCard, metrics };
