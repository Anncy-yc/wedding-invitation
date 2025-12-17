<template>
  <div class="game-container">
    <div class="game-info">
      <p>已找到: <span>{{ foundDifferences }} / {{ totalDifferences }}</span></p>
      <p>用时: <span>{{ elapsedTime }} 秒</span></p>
      <button @click="restartGame">重新开始</button>
    </div>
    <canvas ref="gameCanvas" width="800" height="600"></canvas>
    <Transition name="modal">
      <div v-if="gameWon" class="game-won">
        <h2>恭喜你，找出了所有不同！</h2>
        <p>总用时: {{ elapsedTime }} 秒</p>
        <div class="modal-actions">
          <button @click="restartGame">再玩一次</button>
          <button @click="goHome">返回主页</button>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';


// --- 1. 定义响应式数据和游戏状态 ---
const gameCanvas = ref(null);
const ctx = ref(null);
const foundDifferences = ref(0);
const totalDifferences = ref(5); // 假设有5个不同之处
const elapsedTime = ref(0);
const gameWon = ref(false);
let timer;
let differences = []; // 存储差异区域的坐标信息
let foundMarkers = []; // 存储已找到的差异标记

// --- 2. 游戏核心函数 ---

// 初始化差异区域（实际项目中，这些数据应该从服务器或配置文件获取）
const initDifferences = () => {
  differences = [
    { x: 543, y: 333, radius: 25 }, // 示例差异1
    { x: 762, y: 286, radius: 25 }, // 示例差异2
    { x: 685, y: 494, radius: 25 }, // 示例差异3
    { x: 552, y: 197, radius: 25 }, // 示例差异4
    { x: 431, y: 127, radius: 25}, // 示例差异5
  ];
  foundMarkers = [];
  foundDifferences.value = 0;
  gameWon.value = false;
};

// 加载图片并开始游戏
const startGame = async () => {
  const originalImg = new Image();
  const modifiedImg = new Image();
  
  // 使用 Vite 的方式导入图片
  originalImg.src = new URL('@/assets/images/original.jpg', import.meta.url).href;
  modifiedImg.src = new URL('@/assets/images/modified.jpg', import.meta.url).href;

  // 等待两张图片都加载完成
  await Promise.all([
    new Promise(resolve => originalImg.onload = resolve),
    new Promise(resolve => modifiedImg.onload = resolve)
  ]);

  // 绘制初始画面
  ctx.value.drawImage(originalImg, 0, 0, 400, 600); // 左边是原图
  ctx.value.drawImage(modifiedImg, 400, 0, 400, 600); // 右边是修改图
};

// 处理画布点击事件
const handleCanvasClick = (event) => {
  if (gameWon.value) return;

  const rect = gameCanvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
    // --- 新增的调试代码 ---
  console.log(`点击坐标: (x: ${x}, y: ${y})`);
  // --- 调试代码结束 ---

  // 检查点击位置是否在任何差异区域内
  for (const diff of differences) {
    const distance = Math.sqrt(Math.pow(x - diff.x, 2) + Math.pow(y - diff.y, 2));
    if (distance < diff.radius) {
      // 检查是否已经找到过这个差异
      const isAlreadyFound = foundMarkers.some(marker => marker.x === diff.x && marker.y === diff.y);
      if (!isAlreadyFound) {
        // 标记为已找到
        foundMarkers.push(diff);
        foundDifferences.value++;
        
        // 在画布上画一个圆圈标记
        ctx.value.strokeStyle = '#0f0'; // 绿色标记
        ctx.value.lineWidth = 3;
        ctx.value.beginPath();
        ctx.value.arc(diff.x, diff.y, diff.radius + 5, 0, Math.PI * 2);
        ctx.value.stroke();

        // 检查是否获胜
        if (foundDifferences.value === totalDifferences.value) {
          gameWon.value = true;
          clearInterval(timer);
        }
      }
      break; // 找到一个后就退出循环
    }
  }
};

// 重新开始游戏
const restartGame = () => {
  clearInterval(timer);
  elapsedTime.value = 0;
  initDifferences();
  startGame();
  timer = setInterval(() => {
    elapsedTime.value++;
  }, 1000);
};

// 返回主页
const router = useRouter();
const goHome = () => {
  router.push('/');
};
// --- 3. 生命周期钩子 ---
onMounted(() => {
  ctx.value = gameCanvas.value.getContext('2d');
  gameCanvas.value.addEventListener('click', handleCanvasClick);
  restartGame(); // 页面加载时自动开始游戏

  onUnmounted(() => {
    gameCanvas.value.removeEventListener('click', handleCanvasClick);
    clearInterval(timer);
  });
});
</script>

<style scoped>
/* 整体容器：使用渐变背景并居中内容 */
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 使容器至少占满整个视口高度 */
  padding: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(45deg, #f0f2f5, #d9e2ec); /* 柔和的蓝灰色渐变 */
}

/* 游戏信息栏：使用 flexbox 布局，增加间距和圆角 */
.game-info {
  width: 100%;
  max-width: 800px; /* 与画布宽度保持一致 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* 增加与画布的间距 */
  padding: 12px 20px;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
  font-size: 1.1em;
  color: #333;
}

/* 游戏信息内的文字间距 */
.game-info p {
  margin: 0;
}

/* 统一的按钮样式 */
.game-info button, .game-won button {
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  color: #fff;
  background-color: #4a90e2; /* 醒目的蓝色 */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease; /* 平滑过渡效果 */
}

/* 按钮悬停效果 */
.game-info button:hover, .game-won button:hover {
  background-color: #357abd; /* 悬停时变深 */
  transform: translateY(-2px); /* 轻微上移 */
}

/* 画布：增加圆角和阴影，使其更立体 */
canvas {
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* 更明显的阴影 */
  cursor: crosshair;
  background-color: #fff; /* 确保图片加载前背景是白色 */
}

/* 游戏胜利弹窗：优化动画和样式 */
.game-won {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9); /* 初始时略微缩小 */
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

/* 当 game-won 显示时，触发动画 */
.game-won[v-if="gameWon"] {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.game-won h2 {
  margin-top: 0;
  color: #2c3e50;
}

.game-won p {
  color: #7f8c8d;
  margin-bottom: 20px;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}

/* 新增：为弹窗内的按钮组添加样式 */
.modal-actions {
  display: flex;
  gap: 15px; /* 按钮之间的间距 */
  justify-content: center;
  margin-top: 10px;
}
</style>
