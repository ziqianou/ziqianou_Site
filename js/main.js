import { initSlogan } from "./slogan.js";
import { initStarfield } from "./starfield.js";

function initBackgroundPosition() {
  const background = document.querySelector(".background");
  if (!background) return;

  let scheduled = false;

  const update = () => {
    scheduled = false;
    const threshold = window.innerHeight * 0.6;
    background.classList.toggle("fixed", window.scrollY > threshold);
  };

  window.addEventListener(
    "scroll",
    () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
}

function init() {
  initStarfield(document.getElementById("startrack"));
  initSlogan(document.getElementById("slogan"));
  initBackgroundPosition();

  console.log(
    "原作 Nekotora's Flag.Moe Homepage",
    "修改 by yzxll 2025.7.31",
    "二改 by ziqianou 2025.9.14",
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
