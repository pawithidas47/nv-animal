<template>
  <div class="container">
    <h1>แก้ไขสัตว์</h1>
    <form @submit.prevent="editAnimal" class="form-container">
      <div class="form-group">
        <label for="name">ชื่อสัตว์:</label>
        <input type="text" id="name" v-model="Animal.name" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="habitat">ที่อยู่อาศัย:</label>
        <input type="text" id="habitat" v-model="Animal.habitat" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="food">อาหาร:</label>
        <input type="text" id="food" v-model="Animal.food" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="status">ประเภท:</label>
        <select id="status" v-model="Animal.status" class="form-input" required>
          <option value="สัตว์เลี้ยงลูกด้วยนม">สัตว์เลี้ยงลูกด้วยนม</option>
          <option value="สัตว์ปีก">สัตว์ปีก</option>
          <option value="สัตว์เลี้ยงเลื้อยคลาน">สัตว์เลี้ยงเลื้อยคลาน</option>
          <option value="สัตว์ครึ่งบกครึ่งน้ำ">สัตว์ครึ่งบกครึ่งน้ำ</option>
          <option value="สัตว์น้ำ">สัตว์น้ำ</option>
        </select>
      </div>

      <div class="form-group btn-group">
        <button type="submit" class="btn btn-primary">อัปเดตสัตว์</button>
        <!-- <button @click="navigateTo('/Animal')" type="button" class="btn btn-secondary">กลับ</button> -->
      </div>
    </form>
  </div>
</template>

<script>
import AnimalService from '@/services/AnimalService';

export default {
  data() {
    return {
      Animal: {
        name: '',
        habitat: '',
        food: '',
        status: '',
      },
    }
  },
  methods: {
    async editAnimal() {
      try {
        await AnimalService.put(this.Animal);
        this.$router.push({ name: 'Animal' });
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  async created() {
    try {
      let AnimalId = this.$route.params.AnimalId;
      this.Animal = (await AnimalService.show(AnimalId)).data;
    } catch (error) {
      console.log(error);
    }
  },
}
</script>

<style scoped>
/* Container styles */
.container {
  max-width: 500px; /* ความกว้างสูงสุด */
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff; /* สีพื้นหลังขาว */
  border-radius: 10px; /* มุมมน */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* เงาให้ดูลึก */
}

/* Title */
h1 {
  text-align: center;
  color: #333; /* สีตัวหนังสือ */
  margin-bottom: 20px;
  font-size: 28px; /* ขนาดฟอนต์ */
}

/* Form styling */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px; /* ระยะห่างระหว่างฟิลด์ */
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold; /* ตัวหนา */
  color: #333; /* สีตัวหนังสือ */
  margin-bottom: 5px; /* ระยะห่างระหว่าง label กับ input */
}

.form-input {
  padding: 10px; /* ช่องว่างใน input */
  font-size: 16px; /* ขนาดฟอนต์ */
  border: 2px solid #007bff; /* ขอบสีฟ้า */
  border-radius: 5px; /* มุมมน */
  outline: none; /* ไม่มีเส้นรอบ */
  transition: border-color 0.3s; /* เอฟเฟกต์การเคลื่อนไหว */
}

.form-input:focus {
  border-color: #ff6347; /* สีขอบเมื่อโฟกัส */
  box-shadow: 0 0 5px rgba(255, 99, 71, 0.5); /* เงาเมื่อโฟกัส */
}

/* Button styling */
.btn-group {
  display: flex;
  justify-content: space-between; /* จัดปุ่มให้ห่างกัน */
}

.btn {
  padding: 10px 20px; /* ช่องว่างในปุ่ม */
  font-size: 16px; /* ขนาดฟอนต์ */
  border: none; /* ไม่มีขอบ */
  border-radius: 4px; /* มุมมน */
  cursor: pointer; /* เปลี่ยนเป็นมือเมื่อวางเมาส์ */
  text-align: center;
  transition: background-color 0.3s, transform 0.3s; /* เอฟเฟกต์การเคลื่อนไหว */
}

.btn-primary {
  background-color: #007bff; /* สีปุ่มหลัก */
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3; /* สีเมื่อ hover */
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
