// Add glow to a bold text in the viewport's center
// and show the relevant image
export default function scrollReveal(cards, metrics) {
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
}
