<template>
  <div class="edit-user-container">
    <h1>Edit User</h1>
    <form @submit.prevent="editUser" class="edit-user-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>
      <div class="form-group">
        <label for="lastname">Lastname:</label>
        <input type="text" id="lastname" v-model="user.lastname" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required />
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-button">Edit User</button>
        <button type="button" class="cancel-button" @click="goBack">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';

export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active', // เก็บสถานะผู้ใช้
      },
    };
  },
  async created() {
    try {
      const userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data; // ดึงข้อมูลผู้ใช้
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async editUser() {
      try {
        await UsersService.put(this.user); // อัปเดตข้อมูลผู้ใช้
        this.$router.push('/users'); // นำทางกลับไปยังหน้าผู้ใช้
      } catch (err) {
        console.log(err);
      }
    },
    goBack() {
      this.$router.push('/users'); // นำทางกลับไปยังหน้าผู้ใช้
    },
  },
};
</script>

<style scoped>
.edit-user-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background-color: #f3f4f6;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2rem; /* ขนาดตัวอักษร */
}

.edit-user-form {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff; /* สีน้ำเงินเมื่อ focus */
  outline: none; /* เอาออก outline */
}

.form-actions {
  display: flex;
  justify-content: center; /* จัดเรียงปุ่มให้ตรงกลาง */
  gap: 20px; /* เพิ่มระยะห่างระหว่างปุ่ม */
  margin-top: 20px;
}

.submit-button {
  background-color: #007bff; /* สีน้ำเงิน */
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; /* ขนาดตัวอักษร */
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #0056b3; /* สีเข้มขึ้นเมื่อ hover */
  transform: translateY(-2px); /* การเคลื่อนไหว */
}

.cancel-button {
  background-color: #6c757d; /* สีเทา */
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; /* ขนาดตัวอักษร */
  transition: background-color 0.3s, transform 0.2s;
}

.cancel-button:hover {
  background-color: #5a6268; /* สีเข้มขึ้นเมื่อ hover */
  transform: translateY(-2px); /* การเคลื่อนไหว */
}
</style>
