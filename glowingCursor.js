export default function glowingCursor() {
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
      // b.classList.remove("glowing");
    });
  });
}
