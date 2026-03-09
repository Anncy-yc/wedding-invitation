<template>
  <section class="gallery-section">
    <!-- 标题仅在非轮播模式下显示，或者可以保留作为轮播的标题 -->
    <h2 v-if="!isCarouselMode">我们的故事</h2>
    
    <!-- 网格列表模式：仅当 isCarouselMode 为 false 时显示 -->
    <div v-if="!isCarouselMode" class="gallery">
      <div 
        v-for="(photo, index) in photos" 
        :key="index"
        class="photo-item"
        @click="openPhoto(index)"
      >
        <img :src="photo" :alt="'照片' + (index + 1)">
      </div>
    </div>

    <!-- 轮播查看器：默认显示，或者点击列表后显示 -->
    <div class="photo-viewer" :class="{ 'active': showViewer || isCarouselMode }" @click.self="closeViewer">
      <div class="viewer-content">
        <img :src="photos[currentPhotoIndex]" alt="查看照片">
        
        <div class="photo-nav">
          <button class="nav-btn prev" @click.stop="prevPhoto" :disabled="currentPhotoIndex === 0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <div class="photo-indicator">
            <span>{{ currentPhotoIndex + 1 }}</span>
            <span class="divider">/</span>
            <span>{{ photos.length }}</span>
          </div>
          
          <button class="nav-btn next" @click.stop="nextPhoto" :disabled="currentPhotoIndex === photos.length - 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- 关闭按钮 -->
        <button class="close-btn" @click.stop="closeViewer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  photos: {
    type: Array,
    required: true
  },
  // 新增属性：是否默认为轮播模式
  isCarouselMode: {
    type: Boolean,
    default: true // 默认为 true，即直接进入轮播模式
  }
})

const showViewer = ref(false)
const currentPhotoIndex = ref(0)

// 组件挂载时，如果是轮播模式，自动打开查看器
onMounted(() => {
  if (props.isCarouselMode) {
    showViewer.value = true
  }
})

const openPhoto = (index) => {
  currentPhotoIndex.value = index
  showViewer.value = true
}
const closeViewer = () => {
  // 如果是轮播模式，不允许关闭，只能通过父组件控制
  if (props.isCarouselMode) return
  showViewer.value = false
}

const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  } else {
    // 可选：循环播放
    currentPhotoIndex.value = props.photos.length - 1
  }
}

const nextPhoto = () => {
  if (currentPhotoIndex.value < props.photos.length - 1) {
    currentPhotoIndex.value++
  } else {
    // 可选：循环播放
    currentPhotoIndex.value = 0
  }
}
</script>

<style scoped>
.gallery-section {
  margin: 40px 0;
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
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.photo-viewer.active {
  opacity: 1;
  pointer-events: auto;
}

.viewer-content {
  max-width: 90%;
  max-height: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.viewer-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.photo-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: white;
  width: 100%;
}

.nav-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.4);
  transform: scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.photo-indicator {
  margin: 0 30px;
  font-size: 18px;
  font-weight: 500;
}

.photo-indicator .divider {
  margin: 0 5px;
  opacity: 0.7;
}

.close-btn {
  position: absolute;
  top: 10px;       /* 修改：改为正值，距离顶部 10px */
  right: 10px;     /* 修改：距离右侧 10px，防止贴边 */
  background: rgba(0, 0, 0, 0.5); /* 修改：添加半透明背景，增强对比度 */
  border-radius: 50%; /* 修改：圆形背景 */
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;    /* 修改：增加内边距，使点击区域更大 */
  transition: all 0.3s ease;
  z-index: 10;     /* 修改：确保按钮在图片上方 */
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.8); /* 修改：悬停时背景变深 */
  transform: rotate(90deg);
}

.close-btn:hover {
  transform: rotate(90deg);
}

@media (max-width: 600px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .viewer-content img {
    max-height: 70vh;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
  }
  
  .photo-indicator {
    margin: 0 20px;
    font-size: 16px;
  }
}
</style>
