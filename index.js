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

await DOMLoadedPromise;

document.addEventListener("scroll", () => {
  let glowingText = null;
  const windowCenter = window.innerHeight / 2;

  cards.forEach((card, cardIndex) => {
    const rect = card.getBoundingClientRect();

    // Find the card that's in the viewport's center
    if (rect.top <= windowCenter && rect.bottom >= windowCenter) {
      const boldTexts = card.querySelectorAll("b");
      const numOfBoldTexts = boldTexts.length;
      const dividedHeight = rect.height / numOfBoldTexts;

      let heights = [];
      for (let i = 0; i < numOfBoldTexts; i++) {
        const top = rect.top + dividedHeight * i;
        heights.push(top);
      }

      // Find the bold text that is in the viewport's center
      heights.forEach((height, index) => {
        if (windowCenter >= height && windowCenter < height + dividedHeight) {
          glowingText = boldTexts[index];

          if (cardIndex === cards.length - 1) {
            metrics[index].classList.add("metric-visible");
          }
        }
      });
    }
  });

  // Remove the glow effect from all bold texts
  cards.forEach((card) =>
    card
      .querySelectorAll(".card b")
      .forEach((b) => b.classList.remove("glowing"))
  );
  // Remove metrics
  // metrics.forEach((metric) => metric.classList.remove("metric-visible"));

  // Add the glow effect to the currently visible bold text
  if (glowingText) {
    glowingText.classList.add("glowing");
  }
});

// glowing cursor

const cardContent = document.querySelector(".card > .content");
const glowingCursor = document.createElement("div");
glowingCursor.className = "glowing-cursor";
document.body.appendChild(glowingCursor);

document.addEventListener("mousemove", function (e) {
  glowingCursor.style.left = `${e.clientX}px`;
  glowingCursor.style.top = `${e.clientY + window.scrollY}px`;
});

cardContent.addEventListener("mouseenter", function () {
  glowingCursor.style.transform = "scale(1)";
});
cardContent.addEventListener("mouseleave", function () {
  glowingCursor.style.transform = "scale(0)"; // Hide the glow when the mouse leaves the card
});

// hide glow on glowing text
const boldTexts = cardContent.querySelectorAll("b");
boldTexts.forEach((b, index) => {
  b.addEventListener("mouseenter", () => {
    glowingCursor.style.transform = "scale(0)";
    b.classList.add("glowing");
    boldTexts.forEach((b, i) =>
      i !== index ? b.classList.remove("glowing") : null
    );
  });

  // show glow on text mouseleave
  b.addEventListener("mouseleave", () => {
    glowingCursor.style.transform = "scale(1)";
    b.classList.remove("glowing");
  });
});

export { pagespeedCard, cards, metrics };
