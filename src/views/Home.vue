<template>
  <div class="wedding-invitation">
    <!-- 封面 -->
       <span>日期：{{ weddingDate }}</span>
    <div ref="coverElement" class="cover" v-if="showCover">
      <div class="cover-content">
        <h1 class="title">婚礼邀请函</h1>
        <div class="names">
          <span class="groom">新郎：{{ groomName }}</span>
          <span class="heart">❤</span>
          <span class="bride">新娘：{{ brideName }}</span>
        </div>
        <button class="open-btn" @click="handleAcceptInvitation">接受邀请</button>
      </div>
    </div>
    <!-- 邀请函主体 -->
    <div class="invitation-content" v-else>
      <!-- 婚礼信息 -->
      <section class="wedding-info">
        <h2>诚挚邀请</h2>
        <p class="invitation-text">
          {{ invitationText }}
        </p>
        <div class="wedding-details">
          <div class="detail-item">
            <i class="icon">📅</i>
            <span>日期：{{ weddingDate }}</span>
          </div>
          <div class="detail-item">
            <i class="icon">⏰</i>
            <span>时间：{{ weddingTime }}</span>
          </div>
          <div class="detail-item">
            <i class="icon">📍</i>
            <span>地点：{{ weddingLocation }}</span>
          </div>
        </div>
      </section>

      <!-- 相册部分 -->
      <section class="gallery-section">
        <h2>我们的故事</h2>
        <div class="gallery">
          <div 
            v-for="(photo, index) in photos" 
            :key="index"
            class="photo-item"
            @click="openPhoto(index)"
          >
            <img :src="photo" :alt="'照片' + (index + 1)">
          </div>
        </div>
      </section>

      <!-- 照片查看器 -->
      <div class="photo-viewer" v-if="showViewer" @click="closeViewer">
        <div class="viewer-content">
          <img :src="photos[currentPhotoIndex]" alt="查看照片">
          <div class="photo-nav">
            <button @click.stop="prevPhoto" :disabled="currentPhotoIndex === 0">
              <
            </button>
            <span>{{ currentPhotoIndex + 1 }} / {{ photos.length }}</span>
            <button @click.stop="nextPhoto" :disabled="currentPhotoIndex === photos.length - 1">
              >
            </button>
          </div>
        </div>
      </div>

      <!-- 留言部分 -->
      <section class="wishes-section">
        <h2>祝福留言</h2>
        <div class="wishes-list">
          <div v-for="(wish, index) in wishes" :key="index" class="wish-item">
            <p class="wish-text">{{ wish.text }}</p>
            <span class="wish-author">- {{ wish.author }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router' 
import { ref, onMounted, onUnmounted } from 'vue' // 引入 onMounted 和 onUnmounted

// 响应式数据
const coverElement = ref(null); // 新增：声明 coverElement ref
const showCover = ref(true)
const showViewer = ref(false)
const currentPhotoIndex = ref(0)

// 婚礼信息
const groomName = ref('王超强')
const brideName = ref('安亚成')
const invitationText = ref('谨定于公历2024年X月X日，为张三先生和李四女士举行婚礼。恭请您的光临！')
const weddingDate = ref('2024年X月X日')
const weddingTime = ref('中午12:00')
const weddingLocation = ref('XX酒店XX厅')

// 相册照片（这里使用示例URL，实际使用时替换为真实照片URL）
const photos = ref([
  'https://picsum.photos/seed/wedding1/400/400.jpg',
  'https://picsum.photos/seed/wedding2/400/400.jpg',
  'https://picsum.photos/seed/wedding3/400/400.jpg',
  'https://picsum.photos/seed/wedding4/400/400.jpg',
  'https://picsum.photos/seed/wedding5/400/400.jpg',
  'https://picsum.photos/seed/wedding6/400/400.jpg'
])

// 祝福留言
const wishes = ref([
  { text: '祝新人百年好合，永浴爱河！', author: '朋友A' },
  { text: '新婚快乐，早生贵子！', author: '朋友B' },
  { text: '执子之手，与子偕老！', author: '朋友C' }
])

// 方法
const openInvitation = () => {
  showCover.value = false
  document.body.style.overflow = 'auto';
}

// 新增：处理接受邀请的逻辑
const router = useRouter()
const handleAcceptInvitation = () => {
  // 弹出一个输入框
  const userName = prompt('请输入您的姓名，以确认身份：');

  // 检查用户是否点击了取消，或者输入为空
  if (userName === null || userName.trim() === '') {
    alert('姓名不能为空！');
    return; // 终止函数执行
  }

  // 验证姓名
  if (userName === '王超强' || userName === '安亚成') {
    // 如果姓名匹配，跳转到游戏页面
    router.push('/game');
  } else {
    // 否则，正常打开邀请函
    openInvitation();
  }
}

const openPhoto = (index) => {
  currentPhotoIndex.value = index
  showViewer.value = true
}


const closeViewer = () => {
  showViewer.value = false
}

const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  }
}

const nextPhoto = () => {
  if (currentPhotoIndex.value < photos.value.length - 1) {
    currentPhotoIndex.value++
  }
}
const setCoverHeight = () => {
  if (coverElement.value) {
    // window.innerHeight 是最可靠的、不包含浏览器UI的视口高度
    coverElement.value.style.height = `${window.innerHeight}px`;
  }
};

onMounted(async () => { // 使用 async/await
  await nextTick(); // 等待下一次 DOM 更新

  // 现在可以安全地设置高度和添加监听器了
  setCoverHeight();
  window.addEventListener('resize', setCoverHeight);
});

onUnmounted(() => {
  // 组件卸载时，移除事件监听器，防止内存泄漏
  window.removeEventListener('resize', setCoverHeight);
});
</script>

<style scoped>
.wedding-invitation {
  font-family: 'Microsoft YaHei', sans-serif;
  max-width: 800px;
  margin: 0 auto;
}
.invitation-content {
  animation: fadeIn 1s ease-in-out;
  /* 为整个内容区域添加一个统一的内边距 */
  padding: 20px;
}

/* 封面样式 */
.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  overflow: hidden;
  background-image: url('@/assets/images/cover-bg.jpg');
  background-size: cover;
  background-position: center;
  /* 修改 flex 布局 */
  display: flex;
  flex-direction: column; /* 改为垂直布局 */
  justify-content: flex-end; /* 将内容推到底部 */
  align-items: center; /* 水平方向依然居中 */
  padding-bottom: 16vh; /* 关键：添加一个底部内边距，为 25% 的视口高度 */
  box-sizing: border-box; /* 确保 padding 不会撑大容器 */
}

/* 可选：添加一个半透明的遮罩层，让文字更清晰 */

.cover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.cover-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  animation: fadeIn 1s ease-in-out;
  text-shadow: 2px 2px 8px rgba(223, 223, 223, 0.9);
  /* 移除任何可能影响定位的 margin 或 transform */
}

.title {
  font-size: 3em;
  color: #333;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.names {
  font-size: 1.5em;
  margin-bottom: 40px;
}

.heart {
  color: #ff6b6b;
  margin: 0 20px;
  animation: pulse 1.5s infinite;
}

.open-btn {
  padding: 15px 40px;
  font-size: 1.2em;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s;
}

.open-btn:hover {
  transform: scale(1.05);
}

/* 主体内容样式 */
.invitation-content {
  animation: fadeIn 1s ease-in-out;
}

section {
  /* 移除原来的 margin-top，因为外层已经有 padding 了 */
  margin: 40px 0; /* 只保留上下边距 */
  margin-top: 0; /* 明确设置上边距为 0 */
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h2 {
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 20px;
}

.invitation-text {
  text-align: center;
  font-size: 1.2em;
  line-height: 1.6;
  margin: 20px 0;
}

.wedding-details {
  margin-top: 30px;
}

.detail-item {
  display: flex;
  align-items: center;
  margin: 15px 0;
  font-size: 1.1em;
}

.icon {
  margin-right: 10px;
  font-size: 1.3em;
}

/* 相册样式 */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.photo-item {
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.photo-item:hover {
  transform: scale(1.05);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 照片查看器样式 */
.photo-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.viewer-content {
  max-width: 90%;
  max-height: 90%;
  position: relative;
}

.viewer-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.photo-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: white;
}

.photo-nav button {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
}

.photo-nav button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 留言样式 */
.wishes-list {
  margin-top: 20px;
}

.wish-item {
  background: #f8f9fa;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
}

.wish-text {
  margin: 0 0 10px 0;
  font-size: 1.1em;
}

.wish-author {
  color: #666;
  font-style: italic;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 600px) {
  .title {
    font-size: 2em;
  }
  
  .names {
    font-size: 1.2em;
  }
  
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .cover {
    /* 确保在移动端也是全屏 */
    height: 100vh;
    width: 100vw;
  }

  .cover-content {
    padding: 0 20px; /* 给内容增加一些左右内边距，防止文字贴边 */
  }

  .title {
    font-size: 2.2em; /* 减小标题字体 */
    margin-bottom: 20px; /* 减小下边距 */
  }

  .names {
    font-size: 1.2em; /* 减小名字字体 */
    margin-bottom: 30px; /* 减小下边距 */
  }

  .heart {
    font-size: 1.2em; /* 调整心形大小以匹配文字 */
  }

  .open-btn {
    padding: 12px 30px; /* 适当减小按钮内边距 */
    font-size: 1.1em; /* 减小按钮字体 */
  }
}
</style>
