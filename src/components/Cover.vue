<template>
  <div ref="coverElement" class="cover">
    <div class="cover-content">
      <h1 class="title">婚礼邀请函</h1>
      <div class="names">
        <span class="groom">新郎：{{ groomName }}</span>
        <span class="heart">❤</span>
        <span class="bride">新娘：{{ brideName }}</span>
      </div>
      <button class="open-btn" @click="handleAcceptInvitation">接受邀请</button>
      
      <div class="name-input-modal" v-if="showNameInput">
        <div class="modal-content">
          <h3>请输入您的姓名</h3>
          <input 
            type="text" 
            v-model="inputName"
            placeholder="请输入姓名"
            @keyup.enter="confirmName"
          >
          <div class="modal-buttons">
            <button @click="confirmName" class="confirm-btn">确认</button>
            <button @click="cancelInput" class="cancel-btn">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  weddingDate: String,
  groomName: String,
  brideName: String
})

const emit = defineEmits(['openInvitation'])

const router = useRouter()
const coverElement = ref(null)
const showNameInput = ref(false)
const inputName = ref('')

const handleAcceptInvitation = () => {
  showNameInput.value = true
}

const confirmName = () => {
  if (inputName.value.trim() === '') {
    const errorMsg = document.querySelector('.error-message')
    if (!errorMsg) {
      const error = document.createElement('div')
      error.className = 'error-message'
      error.textContent = '姓名不能为空！'
      document.querySelector('.modal-content').insertBefore(error, document.querySelector('.modal-buttons'))
    }
    return
  }

  if (inputName.value === props.groomName || inputName.value === props.brideName) {
    router.push('/game')
  } else {
    emit('openInvitation')
  }
  showNameInput.value = false
  inputName.value = ''
}

const cancelInput = () => {
  showNameInput.value = false
  inputName.value = ''
}

const setCoverHeight = () => {
  if (coverElement.value) {
    coverElement.value.style.height = `${window.innerHeight}px`
  }
}

onMounted(async () => {
  await nextTick()
  setCoverHeight()
  window.addEventListener('resize', setCoverHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', setCoverHeight)
})
</script>

<style >
.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  overflow: hidden;
  background-image: url('@/assets/images/cover-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 16vh;
  box-sizing: border-box;
}

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

.name-input-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.modal-content h3 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.modal-content input {
  width: 100%;
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: border-color 0.3s;
}

.modal-content input:focus {
  outline: none;
  border-color: #ff6b6b;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.modal-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s;
}

.confirm-btn {
  background: #ff6b6b;
  color: white;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.modal-buttons button:hover {
  transform: scale(1.05);
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  margin-bottom: 10px;
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

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .cover {
    height: 100vh;
    width: 100vw;
  }

  .cover-content {
    padding: 0 20px;
  }

  .title {
    font-size: 2.2em;
    margin-bottom: 20px;
  }

  .names {
    font-size: 1.2em;
    margin-bottom: 30px;
  }

  .heart {
    font-size: 1.2em;
  }

  .open-btn {
    padding: 12px 30px;
    font-size: 1.1em;
  }
}
</style>
