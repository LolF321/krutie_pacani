let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Размер игрового поля
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Параметры игры
const PADDLE_SIZE = 100;
const PUCK_SIZE = 20;
const PUCK_SPEED = 5;

// Объекты игры
let puck = {
  x: WIDTH / 2,
  y: HEIGHT / 2,
  vx: PUCK_SPEED,
  vy: PUCK_SPEED
};
let paddle1 = {
  x: WIDTH / 4,
  y: HEIGHT / 2 - PADDLE_SIZE / 2
};
let paddle2 = {
  x: 3 * WIDTH / 4,
  y: HEIGHT / 2 - PADDLE_SIZE / 2
};

// Функция отрисовки
function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Отрисовка шайбы
  ctx.beginPath();
  ctx.arc(puck.x, puck.y, PUCK_SIZE, 0, Math.PI * 2);
  ctx.fill();

  // Отрисовка ракеток
  ctx.fillRect(paddle1.x, paddle1.y, PADDLE_SIZE, 10);
  ctx.fillRect(paddle2.x, paddle2.y, PADDLE_SIZE, 10);
}

// Функция обновления игры
function update() {
  // Отражение шайбы от стенок
  if (puck.x < 0 || puck.x > WIDTH) {
    puck.vx = -puck.vx;
  }
  if (puck.y < 0 || puck.y > HEIGHT) {
    puck.vy = -puck.vy;
  }

  // Столкновение шайбы с ракетками
  if (puck.y < paddle1.y + PADDLE_SIZE && puck.x > paddle1.x - PUCK_SIZE && puck.x < paddle1.x + PADDLE_SIZE) {
    puck.vx = PUCK_SPEED;
  } else if (puck.y < paddle2.y + PADDLE_SIZE && puck.x > paddle2.x - PUCK_SIZE && puck.x < paddle2.x + PADDLE_SIZE) {
    puck.vx = -PUCK_SPEED;
  }

  // Перемещение шайбы
  puck.x += puck.vx;
  puck.y += puck.vy;
}

// Обработка событий
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 38) {
    paddle1.y -= 20;
  } else if (event.keyCode == 40) {
    paddle1.y += 20;
  }
});

// Запуск игры
setInterval(draw, 20);
setInterval(update, 20);
