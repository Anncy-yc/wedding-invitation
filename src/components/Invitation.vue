<template>
  <div class="invitation-container">
    <!-- 封面区域 -->
    <section class="cover-section">
      <div class="art-text">
        <!-- 切图替换 -->
        <div class="chinese-art">好久不见</div>
        <div class="english-art">LONG TIME NO SEE</div>
      </div>
      <div class="top-msg">
        <p>wellcome our wedding</p>
        <p>bleano gerio gjieor gio</p>
      </div>
      <div class="couple-photo">
        <img :src="couplePhoto" alt="新人照片">
      </div>
      <div class="wedding-tag">
        <span>我们婚礼见</span>
      </div>
    </section>

    <!-- 邀请信息区域 -->
    <section class="invitation-section">
      <div class="couple-names">
        {{ groomName }} ❤️ {{ brideName }}
      </div>
      <div class="wedding-description">
        <p>
          协同我们的父母
          <br>
          Together with our parents
        </p>
        <p>
          真诚地邀请您
          <br>
          We sincerely invite you to
        </p>
        <p>
          出席我们的新婚喜宴
          <br>
          Attend our wedding reception
        </p>
      </div>
      <div class="wedding-date">
        {{ weddingDate }}我们要结婚啦！💓💓💓
      </div>
      
      <!-- 倒计时组件 -->
      <Countdown 
        :weddingDate="weddingDate" 
        :weddingTime="weddingTime"
      />
      
      <div class="invitation-text">
        诚邀您出席我们的婚礼
      </div>
      <div class="wedding-photo">
        <img :src="weddingPhoto" alt="婚礼照片">
      </div>
    </section>

    <!-- 照片布局区域 -->
    <section class="photos-section">
      <!-- 第一张照片 -->
      <div class="photo-item full-width">
        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20wedding%20photo%20of%20couple%20in%20formal%20attire%2C%20white%20background%2C%20professional%20photography&image_size=portrait_4_3" alt="婚纱照1">
      </div>
      
      <!-- 两张照片并排 -->
      <div class="photo-grid two-col">
        <div class="photo-item">
          <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bride%20and%20groom%20outdoor%20wedding%20photo%2C%20natural%20light%2C%20professional%20photography&image_size=portrait_4_3" alt="婚纱照2">
        </div>
        <div class="photo-item">
          <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bride%20in%20white%20wedding%20dress%2C%20groom%20in%20black%20suit%2C%20romantic%20pose%2C%20professional%20photography&image_size=portrait_4_3" alt="婚纱照3">
        </div>
      </div>
      
      <!-- 婚礼详情 -->
      <div class="wedding-details">
        <h3>婚礼详情</h3>
        <div class="detail-item">
          <span class="detail-label">时间：</span>
          <span class="detail-value">2024年X月X日 12:00</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">地点：</span>
          <span class="detail-value">XX酒店XX厅</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">导航：</span>
          <span class="detail-value">点击查看地图</span>
        </div>
      </div>
      
      <!-- 更多照片 -->
      <div class="photo-grid three-col">
        <div class="photo-item">
          <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=couple%20in%20wedding%20attire%2C%20garden%20setting%2C%20romantic%20moment%2C%20professional%20photography&image_size=portrait_4_3" alt="婚纱照4">
        </div>
        <div class="photo-item">
          <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bride%20and%20groom%20holding%20hands%2C%20sunset%2C%20romantic%20lighting%2C%20professional%20photography&image_size=portrait_4_3" alt="婚纱照5">
        </div>
        <div class="photo-item">
          <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20wedding%20portrait%2C%20couple%20in%20formal%20attire%2C%20artistic%20lighting%2C%20professional%20photography&image_size=portrait_4_3" alt="婚纱照6">
        </div>
      </div>
      
      <div class="photo-item full-width">
        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=couple%20walking%20down%20aisle%2C%20wedding%20ceremony%2C%20emotional%20moment%2C%20professional%20photography&image_size=portrait_4_3" alt="婚纱照7">
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Countdown from './Countdown.vue'

const props = defineProps({
  groomName: {
    type: String,
    default: '王超强'
  },
  brideName: {
    type: String,
    default: '安亚成'
  },
  weddingDate: {
    type: String,
  },
  weddingTime: {
    type: String,
  },
  couplePhoto: {
    type: String,
    default: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20wedding%20photo%20of%20couple%20in%20formal%20attire%2C%20white%20background%2C%20professional%20photography&image_size=portrait_4_3'
  },
  weddingPhoto: {
    type: String,
    default: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20couple%20at%20wedding%2C%20bride%20in%20white%20dress%2C%20groom%20in%20black%20suit%2C%20outdoor%20setting%2C%20professional%20photography&image_size=portrait_4_3'
  }
})
</script>

<style scoped>
.invitation-container {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  background: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

/* 封面区域 */
.cover-section {
  position: relative;
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
}
.cover-section .top-msg {
  font-size: 14px;
  text-align: right;
  color: #c95555;
  margin-bottom: 36px;
}

.art-text {
  position: absolute;
  top: 40px;
  left: 40px;
  text-align: left;
}

.chinese-art {
  font-size: 48px;
  font-weight: bold;
  color: #e94840;
  font-family: 'STKaiti', 'KaiTi', serif;
  writing-mode: vertical-rl;
  text-orientation: upright;
  margin-bottom: 20px;
}

.english-art {
  font-size: 24px;
  font-weight: 300;
  color: #333;
  letter-spacing: 2px;
}

.couple-photo {
  margin: 60px 0 20px;
}

.couple-photo img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.wedding-tag {
  position: absolute;
  bottom: 40px;
  right: 40px;
  background: rgba(233, 72, 64, 0.9);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
}

/* 邀请信息区域 */
.invitation-section {
  padding: 40px 20px;
  text-align: center;
  background: #ffffff;
  color: #333;
}
.invitation-section .wedding-description {
  color: #999999;
  text-align: left;
  margin: 48px 0;
  margin-left: 15%;
}

.invitation-section .wedding-description p {
  margin-bottom: 16px;
}

.couple-names {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.wedding-date {
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
}

.wedding-title {
  font-size: 24px;
  font-weight: bold;
  color: #e94840;
  margin-bottom: 30px;
}

/* 倒计时样式 */
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

.invitation-text {
  font-size: 18px;
  color: #666;
  margin: 30px 0;
  line-height: 1.4;
}

.wedding-photo {
  margin-top: 20px;
}

.wedding-photo img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 照片布局区域 */
.photos-section {
  padding: 40px 20px;
  background: #ffffff;
  border-top: 1px solid #f0f0f0;
}

.photo-item {
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.photo-item:hover {
  transform: scale(1.02);
}

.photo-item img {
  width: 100%;
  height: auto;
  display: block;
}

.photo-item.full-width {
  width: 100%;
}

.photo-grid {
  display: grid;
  gap: 15px;
  margin-bottom: 20px;
}

.photo-grid.two-col {
  grid-template-columns: repeat(2, 1fr);
}

.photo-grid.three-col {
  grid-template-columns: repeat(3, 1fr);
}

.wedding-details {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin: 30px 0;
  text-align: left;
}

.wedding-details h3 {
  color: #e94840;
  margin-bottom: 15px;
  text-align: center;
  font-size: 20px;
}

.wedding-details .detail-item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.wedding-details .detail-item:last-child {
  border-bottom: none;
}

.wedding-details .detail-label {
  font-weight: bold;
  color: #333;
}

.wedding-details .detail-value {
  color: #666;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .art-text {
    top: 20px;
    left: 20px;
  }

  .chinese-art {
    font-size: 36px;
  }

  .english-art {
    font-size: 18px;
  }

  .cover-section {
    padding: 20px;
  }

  .couple-photo {
    margin: 40px 0 20px;
  }

  .wedding-tag {
    bottom: 20px;
    right: 20px;
    padding: 8px 16px;
    font-size: 14px;
  }

  .invitation-section {
    padding: 30px 20px;
  }

  .couple-names {
    font-size: 24px;
  }

  .parents-info,
  .invitation-text,
  .wedding-event {
    font-size: 16px;
  }

  .photos-section {
    padding: 20px;
  }

  .photo-grid.two-col {
    grid-template-columns: 1fr;
  }

  .photo-grid.three-col {
    grid-template-columns: repeat(2, 1fr);
  }

  .wedding-details {
    padding: 15px;
  }

  .wedding-details .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .interaction-buttons {
    gap: 5px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    width: 80%;
    text-align: center;
  }
}
</style>