<template>
  <div class="user-container">
    <h1>Show User</h1>
    <div class="user-card">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Lastname:</strong> {{ user.lastname }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Password:</strong> {{ user.password }}</p>
      <p><strong>Status:</strong> {{ user.status }}</p>
      <!-- <p><strong>Type:</strong> {{ user.type }}</p> -->
      <p><strong>Created At:</strong> {{ user.createdAt }}</p>
    </div>
    <div class="button-container">
      <button class="back-button" @click="goBack">Back</button>
      <button class="edit-button" @click="editUser">Edit</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default { 
  data() {
    return {
      user: {}
    };
  },
  async created() {
    try {
      const userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    editUser() {
      this.$router.push(`/user/edit/${this.user.id}`);
    }
  }
}
</script>

<style scoped>
.user-container {
  max-width: 700px; /* เพิ่มความกว้าง */
  margin: 0 auto;
  padding: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* ฟอนต์ที่ดูดี */
  background-color: #f3f4f6; /* พื้นหลังที่อ่อนนุ่ม */
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.5rem; /* ขนาดตัวอักษรที่ใหญ่ขึ้น */
}

.user-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

p {
  margin: 12px 0;
  line-height: 1.6;
  color: #34495e; /* สีตัวอักษรที่เข้มขึ้น */
}

strong {
  color: #2c3e50;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 20px; /* เพิ่มระยะห่างระหว่างปุ่ม */
}

.back-button,
.edit-button {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* เพิ่มเอฟเฟกต์เมื่อ hover */
}

.back-button {
  background-color: #007bff; /* สีน้ำเงิน */
  color: white;
}

.back-button:hover {
  background-color: #0056b3; /* สีเข้มขึ้นเมื่อ hover */
  transform: translateY(-2px); /* เพิ่มการเคลื่อนไหว */
}

.edit-button {
  background-color: #ffca2c; /* สีเหลือง */
  color: #333;
}

.edit-button:hover {
  background-color: #e1b022; /* สีเข้มขึ้นเมื่อ hover */
  transform: translateY(-2px); /* เพิ่มการเคลื่อนไหว */
}
</style>
