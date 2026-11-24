// Gentle pointer parallax for the atmospheric background.
const scene = document.querySelector(".scene");
const backdrop = document.querySelector(".portrait-backdrop");
if (scene && backdrop && window.matchMedia("(pointer:fine)").matches) {
  scene.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * 6;
    backdrop.style.transform = `scale(1.045) translate(${x}px, ${y}px)`;
  });
  scene.addEventListener("pointerleave", () => {
    backdrop.style.transform = "scale(1.035) translate(0, 0)";
  });
}

// Soft tilt on the glass panel, with restrained movement.
const panel = document.querySelector(".glass-panel");
if (panel && window.matchMedia("(pointer:fine)").matches) {
  const sceneEl = document.querySelector(".scene");
  sceneEl.addEventListener("pointermove", (event) => {
    const bounds = panel.getBoundingClientRect();
    const px = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
    const py = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
    if (Math.abs(px) < 1.4 && Math.abs(py) < 1.4) {
      panel.style.setProperty("--tilt-x", `${(-py * 1.1).toFixed(2)}deg`);
      panel.style.setProperty("--tilt-y", `${(px * 1.1).toFixed(2)}deg`);
      panel.style.transform = `translate(0,-45%) perspective(1000px) rotateX(${-py * 1.1}deg) rotateY(${px * 1.1}deg)`;
    }
  });
  sceneEl.addEventListener("pointerleave", () => {
    panel.style.transform = "";
  });
}
