import train from "./img/train_engine.svg";
import bar from "./img/train_bar.svg";
import car from "./img/train_car.svg";
import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";

const imageSlider = (slider) => {
  function svgComponent(source) {
    const element = document.createElement("object");

    element.data = source;
    element.type = "image/svg+xml";
    element.classList += "svg-object";
    element.style.position = "absolute";

    return element;
  }

  const entities = [];

  const barC = svgComponent(bar);
  const trainC = svgComponent(train);

  const cars = [...slider.children];

  cars.forEach((c) => {
    c.style.position = "absolute";
    const carC = svgComponent(car);

    entities.push(carC, c);
    slider.appendChild(carC);

    carC.addEventListener("load", () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      carC.contentDocument.getElementById(
        "rect43422",
      ).style.fill = `rgb(${r},${g},${b})`;
    });
  });

  // Must go below car append because entities should not contain the bar or train
  slider.append(trainC, barC);

  const pauseBtn = document.createElement("div");
  const playBtn = document.createElement("div");
  const forwardBtn = document.createElement("div");
  const backwardBtn = document.createElement("div");
  const playIcon = document.createElement("i");
  const pauseIcon = document.createElement("i");
  const forwardIcon = document.createElement("i");
  const backwardIcon = document.createElement("i");
  playIcon.classList.add("fa-solid", "fa-play");
  pauseIcon.classList.add("fa-solid", "fa-pause");
  forwardIcon.classList.add("fa-solid", "fa-forward");
  backwardIcon.classList.add("fa-solid", "fa-backward");

  playBtn.appendChild(playIcon);
  pauseBtn.appendChild(pauseIcon);
  forwardBtn.appendChild(forwardIcon);
  backwardBtn.appendChild(backwardIcon);

  slider.append(pauseBtn, playBtn, forwardBtn, backwardBtn);

  let screenOffset;

  let play = true;
  let pauseTime;

  const cartWidth = 382;
  const engineWidth = 600;
  const minX = 0;
  const maxX = (cartWidth * entities.length) / 2;

  let posX = cartWidth / 2;
  const posDt = 3;
  let angle = Math.PI;
  const angleDt = 0.002;

  function animate(time, lastTime) {
    if (posX > maxX + screenOffset) {
      posX = -screenOffset - engineWidth;
    }

    if (lastTime != null) {
      angle += (time - lastTime) * angleDt;
    }

    barC.style.top = `${368 - Math.sin(angle) * 30}px`;
    barC.style.left = `${
      -posX + 130 + Math.cos(angle) * 30 + screenOffset - engineWidth
    }px`;
    trainC.style.top = "50px";
    trainC.style.left = `${-posX + screenOffset - engineWidth}px`;

    for (let i = 0; i < entities.length; i += 2) {
      entities[i].style.top = `${320}px`;
      entities[i].style.left = `${
        -posX + (i / 2) * cartWidth + 558 + screenOffset - engineWidth
      }px`;
      entities[i + 1].style.top = `${0}px`;
      entities[i + 1].style.left = `${
        -posX + (i / 2) * cartWidth + 658 + screenOffset - engineWidth
      }px`;
    }

    if (play) {
      posX += posDt;
      requestAnimationFrame((newTime) => animate(newTime, time));
    } else {
      pauseTime = time;
    }
  }

  pauseBtn.addEventListener("click", () => {
    play = false;
  });

  playBtn.addEventListener("click", () => {
    if (!play) {
      requestAnimationFrame((newTime) => animate(newTime, pauseTime));
      play = true;
    }
  });

  forwardBtn.addEventListener("click", () => {
    if (posX < maxX - cartWidth / 2) {
      play = false;

      posX += cartWidth - (posX % cartWidth);
      posX = posX < minX ? 0 : posX;

      posX = posX <= maxX ? posX : maxX;
      posX += cartWidth / 2;

      requestAnimationFrame((newTime) => animate(newTime, pauseTime));
    }
  });

  backwardBtn.addEventListener("click", () => {
    if (posX > minX + cartWidth / 2) {
      play = false;

      posX -= posX % cartWidth === 0 ? cartWidth : posX % cartWidth;

      posX = posX >= minX ? posX : minX;
      posX -= cartWidth / 2;

      requestAnimationFrame((newTime) => animate(newTime, pauseTime));
    }
  });

  window.addEventListener("load", () => {
    screenOffset = document.body.offsetWidth / 2;
    posX = -screenOffset - engineWidth;
    requestAnimationFrame(animate);
  });

  window.addEventListener("resize", () => {
    screenOffset = document.body.offsetWidth / 2;
    posX = -screenOffset - engineWidth;
  });
};

export default imageSlider;
