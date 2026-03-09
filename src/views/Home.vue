<template>
  <div class="wedding-invitation">
    
    <Cover 
      v-if="showCover"
      :weddingDate="weddingDate"
      :groomName="groomName"
      :brideName="brideName"
      @openInvitation="openInvitation"
    />
    
    <VideoPlayer 
      v-else-if="showVideo"
      videoSrc="你的视频路径.mp4" 
      @video-ended="onVideoEnded"
    />
    
    <div v-else class="main-content">
      <Gallery :photos="photos" />
      <InvitationContent
        :invitationText="invitationText"
        :weddingDate="weddingDate"
        :weddingTime="weddingTime"
        :weddingLocation="weddingLocation"
        :wishes="wishes"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Cover from '@/components/Cover.vue'
import Gallery from '@/components/Gallery.vue'
import InvitationContent from '@/components/InvitationContent.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const showCover = ref(true)
const showVideo = ref(false)

const groomName = ref('王超强')
const brideName = ref('安亚成')
const invitationText = ref('谨定于公历2024年X月X日，为张三先生和李四女士举行婚礼。恭请您的光临！')
const weddingDate = ref('2024年X月X日')
const weddingTime = ref('中午12:00')
const weddingLocation = ref('XX酒店XX厅')

const photos = ref([
  '@/assets/images/images/中式.jpg',
  'https://picsum.photos/seed/wedding2/400/400.jpg',
  'https://picsum.photos/seed/wedding3/400/400.jpg',
  'https://picsum.photos/seed/wedding4/400/400.jpg',
  'https://picsum.photos/seed/wedding5/400/400.jpg',
  'https://picsum.photos/seed/wedding6/400/400.jpg'
])

const wishes = ref([
  { text: '祝新人百年好合，永浴爱河！', author: '朋友A' },
  { text: '新婚快乐，早生贵子！', author: '朋友B' },
  { text: '执子之手，与子偕老！', author: '朋友C' }
])

const openInvitation = () => {
  showCover.value = false
  showVideo.value = true
  document.body.style.overflow = 'hidden'
}

const onVideoEnded = () => {
  showVideo.value = false
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.wedding-invitation {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  background: linear-gradient(180deg, #FFF5F5 0%, #F0F8FF 100%);
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
}

.main-content {
  animation: fadeIn 1s ease-in-out;
}

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
</style>
