<template>
  <div class="video-container">
    <div class="video-wrapper">
      <video 
        ref="videoPlayer"
        :src="videoSrc" 
        controls 
        autoplay
      ></video>
      <button class="next-button" @click="goToNext">
        进入邀请函
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    default: '' // 请在此处替换为实际的视频路径
  }
})

const emit = defineEmits(['video-ended'])

const videoPlayer = ref(null)

const goToNext = () => {
  emit('video-ended')
}

// 确保视频自动播放
onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.play().catch(error => {
      console.error('自动播放失败:', error)
    })
  }
})
</script>

<style scoped>
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

video {
  max-width: 90%;
  max-height: 70vh;
  margin-bottom: 20px;
}

.next-button {
  padding: 12px 30px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid white;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  margin-top: 20px;
  z-index: 2001;
}

.next-button:hover {
  background-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}
</style>
