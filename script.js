const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const puck = {
  x: 400,
  y: 300,
  vx: 5,
  vy: 5
};

const player1 = {
  x: 100,
  y: 200
};

const player2 = {
  x: 700,
  y: 200
};

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.fillRect(puck.x - 10, puck.y - 10, 20, 20);

  ctx.fillStyle = "blue";
  ctx.fillRect(player1.x - 50, player1.y - 25, 100, 50);
  ctx.fillStyle = "red";
  ctx.fillRect(player2.x - 50, player2.y - 25, 100, 50);

  puck.x += puck.vx;
  puck.y += puck.vy;

  if (puck.x < 0 || puck.x > canvas.width) {
    puck.vx = -puck.vx;
  }
  if (puck.y < 0 || puck.y > canvas.height) {
    puck.vy = -puck.vy;
  }

  if (puck.y > player1.y - 25 && puck.y < player1.y + 25 &&
    (puck.x > player1.x - 50 && puck.x < player1.x + 50)) {
    puck.vx = -puck.vx;
  } else if (puck.y > player2.y - 25 && puck.y < player2.y + 25 &&
    (puck.x > player2.x - 50 && puck.x < player2.x + 50)) {
    puck.vx = -puck.vx;
  }


  if (puck.x < 0) {
    updateScore(2);
    resetPuck();
  } else if (puck.x > canvas.width) {
    updateScore(1);
    resetPuck();
  }
}

function updateScore(player) {
  const scoreElement = player === 1 ? document.getElementById("player1-score") : document.getElementById("player2-score");
  const currentScore = parseInt(scoreElement.textContent);
  scoreElement.textContent = currentScore + 1;
}

function resetPuck() {
  puck.x = canvas.width / 2;
  puck.y = canvas.height / 2;
  puck.vx *= -1;
  puck.vy = Math.random() * 2 - 1;
}

document.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "w":
      player1.y -= 10;
      break;
    case "s":
      player1.y += 10;
      break;
    case "Up":
      player2.y -= 10;
      break;
    case "Down":
      player2.y += 10;
      break;
  }
});

function animate() {
  update();
  requestAnimationFrame(animate);
}

animate();


