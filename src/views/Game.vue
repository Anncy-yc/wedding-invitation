<template>
  <div class="game-container">
    <canvas ref="gameCanvas" width="400" height="600"></canvas>
    <div class="game-info">
      <p>得分: <span>{{ score }}</span></p>
      <p v-if="gameOver" class="game-over">游戏结束!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- 1. 定义响应式数据和游戏状态 ---
const gameCanvas = ref(null);
const ctx = ref(null);
const score = ref(0);
const gameOver = ref(false);
let animationId;

// 游戏对象
const player = {
  x: 200,
  y: 500,
  width: 50,
  height: 50,
  speed: 5,
  color: '#00f'
};

let bullets = [];
let enemies = [];
let keys = {};

// --- 2. 游戏核心函数 ---

// 创建子弹
const createBullet = () => {
  bullets.push({
    x: player.x + player.width / 2 - 2.5,
    y: player.y,
    width: 5,
    height: 10,
    speed: 7,
    color: '#f00'
  });
};

// 创建敌机
const createEnemy = () => {
  enemies.push({
    x: Math.random() * (gameCanvas.value.width - 40),
    y: -40,
    width: 40,
    height: 40,
    speed: 2 + Math.random() * 2,
    color: '#0f0'
  });
};

// 绘制矩形
const drawRect = (obj) => {
  ctx.value.fillStyle = obj.color;
  ctx.value.fillRect(obj.x, obj.y, obj.width, obj.height);
};

// 碰撞检测
const checkCollision = (obj1, obj2) => {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
};

// 游戏主循环
const gameLoop = () => {
  if (gameOver.value) {
    cancelAnimationFrame(animationId);
    return;
  }

  // 清空画布
  ctx.value.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);

  // --- 更新玩家位置 ---
  if (keys['ArrowLeft'] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys['ArrowRight'] && player.x < gameCanvas.value.width - player.width) {
    player.x += player.speed;
  }
  if (keys['ArrowUp'] && player.y > 0) {
    player.y -= player.speed;
  }
  if (keys['ArrowDown'] && player.y < gameCanvas.value.height - player.height) {
    player.y += player.speed;
  }

  // --- 更新和绘制子弹 ---
  bullets = bullets.filter(bullet => {
    bullet.y -= bullet.speed;
    if (bullet.y < 0) return false; // 移除飞出屏幕的子弹

    // 检查子弹是否击中敌机
    let hit = false;
    enemies = enemies.filter(enemy => {
      if (checkCollision(bullet, enemy)) {
        score.value += 10; // 得分
        hit = true;
        return false; // 移除被击中的敌机
      }
      return true;
    });
    
    return !hit;
  });
  bullets.forEach(drawRect);


  // --- 更新和绘制敌机 ---
  if (Math.random() < 0.02) { // 控制敌机生成频率
    createEnemy();
  }
  enemies = enemies.filter(enemy => {
    enemy.y += enemy.speed;
    if (enemy.y > gameCanvas.value.height) return false; // 移除飞出屏幕的敌机

    // 检查敌机是否撞到玩家
    if (checkCollision(enemy, player)) {
      gameOver.value = true;
    }
    
    return true;
  });
  enemies.forEach(drawRect);

  // --- 绘制玩家 ---
  drawRect(player);

  animationId = requestAnimationFrame(gameLoop);
};

// --- 3. 生命周期钩子 ---

onMounted(() => {
  ctx.value = gameCanvas.value.getContext('2d');
  
  // 键盘事件监听
  const handleKeyDown = (e) => { keys[e.key] = true; };
  const handleKeyUp = (e) => { keys[e.key] = false; };
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // 鼠标/触摸事件监听（用于移动和射击）
  const handleMouseMove = (e) => {
    const rect = gameCanvas.value.getBoundingClientRect();
    player.x = e.clientX - rect.left - player.width / 2;
  };
  const handleMouseClick = () => {
    createBullet();
  };
  gameCanvas.value.addEventListener('mousemove', handleMouseMove);
  gameCanvas.value.addEventListener('click', handleMouseClick);
  
  // 触摸事件支持
  gameCanvas.value.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = gameCanvas.value.getBoundingClientRect();
      const touch = e.touches[0];
      player.x = touch.clientX - rect.left - player.width / 2;
  });
  gameCanvas.value.addEventListener('touchstart', (e) => {
      e.preventDefault();
      createBullet();
  });

  // 启动游戏循环
  gameLoop();

  // 清理函数
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    gameCanvas.value.removeEventListener('mousemove', handleMouseMove);
    gameCanvas.value.removeEventListener('click', handleMouseClick);
    cancelAnimationFrame(animationId);
  });
});
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
}

canvas {
  border: 2px solid #333;
  background-color: #000;
}

.game-info {
  margin-top: 10px;
  font-size: 1.5em;
  color: #333;
}

.game-over {
  color: red;
  font-weight: bold;
}
</style>
