<template>
  <div class="container">
    <h1>Create Animal</h1>
    <form v-on:submit.prevent="createAnimal" class="form-container" enctype="multipart/form-data">
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

      <div class="form-group">
        <p>
        Upload photo:
        <input type="file" @change="filesChange($event.target.files)" accept="image/*" />
        <ul class="pictures">
          <li v-if="pictures.length > 0" :key="pictures[0].id">
            <br />
            <img :src="pictures[0].url" alt="picture image" style="width: 200px;" />
          </li>
        </ul>
      </p>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import AnimalService from "@/services/AnimalService";
import UploadService from "@/services/UploadService"; // เพิ่มการนำเข้า UploadService

export default {
  data() {
    return {
      Animal: {
        name: "",
        habitat: "",
        food: "",
        status: "",
        picture: "",
        BASE_URL: "http://localhost:8081/assets/uploads/",
      },
      pictures: [], // เปลี่ยนให้สามารถเก็บภาพได้เพียง 1 ภาพ
    };
  },
  methods: {
    async createAnimal() {
      if (this.pictures.length === 0) {
        alert("Please upload a picture.");
        return;
      }

      // อัปเดตชื่อไฟล์ภาพใน Animal ก่อนส่งไปยังเซิร์ฟเวอร์
      this.Animal.picture = this.pictures[0].name; // ใช้เฉพาะภาพแรก

      try {
        await AnimalService.post(this.Animal);
        this.$router.push({ name: "Animal" });
      } catch (err) {
        console.log(err);
      }
    },
    async filesChange(fileList) {
      const formData = new FormData();
      this.pictures = []; // ล้าง pictures ก่อนหน้านี้
      const file = fileList[0]; // รับเพียงไฟล์แรก
      if (file) {
        formData.append("images", file);
        const url = URL.createObjectURL(file); // สร้าง URL สำหรับแสดงภาพ
        this.pictures.push({ id: 1, name: file.name, url }); // เก็บ URL ด้วย
      }

      // อัปโหลดไฟล์ภาพไปยังเซิร์ฟเวอร์
      await UploadService.upload(formData);
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
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Title */
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Form styling */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.form-input:focus {
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(128, 189, 255, 0.5);
}

/* Button styling */
.btn {
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
