<template>
  <div class="container">
    <h1>Show Animal</h1>
    <div class="animal-details">
      <img :src="BASE_URL + Animal.picture" alt="Animal Image" v-if="Animal.picture" class="animal-image" />
      <p><strong>ID:</strong> {{ Animal.id }}</p>
      <p><strong>ชื่อ:</strong> {{ Animal.name }}</p>
      <p><strong>ที่อยู่อาศัย:</strong> {{ Animal.habitat }}</p>
      <p><strong>อาหาร:</strong> {{ Animal.food }}</p>
      <p><strong>ประเภท:</strong> {{ Animal.status }}</p>
    </div>
    <div class="button-group">
      <button v-on:click="navigateTo('/Animal/edit/' + Animal.id)" class="btn btn-primary">Edit</button>
      <button v-on:click="navigateTo('/Animal')" class="btn btn-secondary">Back</button>
    </div>
  </div>
</template>

<script>
import AnimalService from '@/services/AnimalService';

export default {
  data() {
    return {
      Animal: null,
      BASE_URL: 'http://localhost:8081/assets/uploads/', // ตั้งค่า URL เบสที่ถูกต้อง
    };
  },
  async created() {
    try {
      let AnimalId = this.$route.params.AnimalId;
      this.Animal = (await AnimalService.show(AnimalId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
/* Container styles */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s; /* เอฟเฟกต์การเคลื่อนไหว */
}

.container:hover {
  transform: scale(1.02); /* ขยายเมื่อวางเมาส์ */
}

/* Title */
h1 {
  text-align: center;
  color: #ff6347; /* สีส้มแดง */
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif; /* ใช้ฟอนต์ที่ทันสมัย */
}

/* Animal details styling */
.animal-details {
  margin-bottom: 20px;
}

.animal-details p {
  font-size: 18px;
  color: #555;
}

/* Image styling */
.animal-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px; /* มุมมน */
  margin-top: 10px;
  border: 2px solid #ff6347; /* ขอบที่สวยงาม */
}

/* Button group styling */
.button-group {
  display: flex;
  justify-content: center; /* จัดให้ปุ่มอยู่กลาง */
  gap: 15px; /* เพิ่มระยะห่างระหว่างปุ่ม */
  margin-top: 20px; /* เพิ่มระยะห่างระหว่างรายละเอียดและปุ่ม */
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s; /* เอฟเฟกต์การเคลื่อนไหวที่ราบรื่น */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* เงาให้ปุ่ม */
  font-family: 'Roboto', sans-serif; /* ฟอนต์ที่ทันสมัย */
}

.btn-primary {
  background-color: #ff6347; /* สีปุ่มหลัก */
  color: white;
}

.btn-primary:hover {
  background-color: #d9534f; /* สีเมื่อ hover */
  transform: translateY(-2px); /* ยกปุ่มขึ้นเมื่อ hover */
}

.btn-secondary {
  background-color: #6c757d; /* สีปุ่มรอง */
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268; /* สีเมื่อ hover */
  transform: translateY(-2px); /* ยกปุ่มขึ้นเมื่อ hover */
}
</style>
