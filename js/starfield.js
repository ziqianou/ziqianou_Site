const STAR_COUNT = 20000;
const STAR_SIZE = 1.2;
const ROTATION_DEG = 0.01;
const RESIZE_DELAY_MS = 200;

function randomBetween(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

function createStars(width, height) {
  const stars = new Array(STAR_COUNT);
  for (let i = 0; i < STAR_COUNT; i += 1) {
    const r = randomBetween(120, 255);
    const g = randomBetween(120, 255);
    const b = randomBetween(120, 255);
    const a = randomBetween(30, 100) / 100;
    stars[i] = {
      x: randomBetween(-width, width),
      y: randomBetween(-height, height),
      color: `rgba(${r},${g},${b},${a})`,
    };
  }
  return stars;
}

function paintStars(ctx, stars) {
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, STAR_SIZE, 0, Math.PI * 2, true);
    ctx.fillStyle = star.color;
    ctx.closePath();
    ctx.fill();
  }
}

export function initStarfield(canvas) {
  if (!canvas) return () => {};

  const ctx = canvas.getContext("2d");
  const offscreen = document.createElement("canvas");
  const offscreenCtx = offscreen.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rotationStep = (ROTATION_DEG * Math.PI) / 180;

  let width = 0;
  let height = 0;
  let angle = 0;
  let rafId = 0;
  let running = false;
  let resizeTimer = 0;

  function paintFrame() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgba(21,21,21,1)";
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width, 0);
    ctx.rotate(angle);
    ctx.drawImage(offscreen, -offscreen.width / 2, -offscreen.height / 2);
  }

  function tick() {
    if (!running) return;
    angle += rotationStep;
    paintFrame();
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  function setup() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    const maxDimension = Math.max(width, height);

    canvas.width = width;
    canvas.height = height;
    offscreen.width = 2.6 * maxDimension;
    offscreen.height = 2.6 * maxDimension;

    offscreenCtx.clearRect(0, 0, offscreen.width, offscreen.height);
    paintStars(offscreenCtx, createStars(offscreen.width, offscreen.height));

    ctx.lineCap = "round";
    paintFrame();
  }

  setup();

  if (reduceMotion) return () => {};

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) start();
      else stop();
    }
  });
  observer.observe(canvas);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      stop();
      setup();
      start();
    }, RESIZE_DELAY_MS);
  });

  start();

  return () => {
    stop();
    observer.disconnect();
  };
}
