<template>
  <div class="invitation-content">
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
</template>

<script setup>
defineProps({
  invitationText: String,
  weddingDate: String,
  weddingTime: String,
  weddingLocation: String,
  wishes: Array
})
</script>

<style >
.invitation-content {
  animation: fadeIn 1s ease-in-out;
  padding: 20px;
}

section {
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
