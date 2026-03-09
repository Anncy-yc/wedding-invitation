<template>
  <div class="countdown">
    <div class="countdown-item">
      <span class="countdown-number">{{ days }}</span>
      <span class="countdown-label">天</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number">{{ hours }}</span>
      <span class="countdown-label">时</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number">{{ minutes }}</span>
      <span class="countdown-label">分</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number">{{ seconds }}</span>
      <span class="countdown-label">秒</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  /**
   * 婚礼日期，格式：YYYY-MM-DD
   * 示例：2024-12-31
   */
  weddingDate: {
    type: String,
    required: true,
    validator: (value) => {
      // 验证日期格式 YYYY-MM-DD
      return /^\d{4}-\d{2}-\d{2}$/.test(value)
    }
  },
  /**
   * 婚礼时间，格式：HH:MM
   * 示例：12:00
   */
  weddingTime: {
    type: String,
    default: '12:00',
    validator: (value) => {
      // 验证时间格式 HH:MM
      return /^\d{2}:\d{2}$/.test(value)
    }
  }
})

// 倒计时相关变量
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let countdownTimer = null

// 计算倒计时
const calculateCountdown = () => {
  try {
    // 解析婚礼日期和时间
    const [year, month, day] = props.weddingDate.split('-').map(Number)
    const [hour, minute] = props.weddingTime.split(':').map(Number)
    
    const weddingDate = new Date(year, month - 1, day, hour, minute, 0)
    const now = new Date()
    
    const diff = Math.max(0, weddingDate - now)
    
    days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
  } catch (error) {
    console.error('倒计时计算错误:', error)
    // 错误时重置为0
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
  }
}

onMounted(() => {
  // 初始计算
  calculateCountdown()
  // 每秒更新一次
  countdownTimer = setInterval(calculateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
.countdown {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
}

.countdown-item {
  width: 80px;
  height: 80px;
  border: 2px solid #e94840;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.countdown-number {
  font-size: 24px;
  font-weight: bold;
  color: #e94840;
}

.countdown-label {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .countdown {
    gap: 10px;
  }
  
  .countdown-item {
    width: 60px;
    height: 60px;
  }
  
  .countdown-number {
    font-size: 18px;
  }
  
  .countdown-label {
    font-size: 12px;
  }
}
</style>