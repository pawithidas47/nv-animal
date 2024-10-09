<template>
  <div class="container">
    <h1>Get All Users</h1>
    <div class="action-button">
      <button v-on:click="navigateTo('/user/create')" class="btn btn-primary">Create User</button>
    </div>
    <hr>
    <div v-if="users.length">
      <div class="user-count"><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div><b>ID:</b> {{ user.id }}</div>
        <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
        <div><b>อีเมล:</b> {{ user.email }}</div>
        <div><b>สถานะ:</b> {{ user.status }}</div>
        <!-- <div><b>ประเภท:</b> {{ user.type }}</div> -->
        <div class="button-group">
          <button v-on:click="navigateTo('/user/' + user.id)" class="btn btn-info">ดูข้อมูล</button>
          <button v-on:click="navigateTo('/user/edit/' + user.id)" class="btn btn-warning">แก้ไขข้อมูล</button>
          <button v-on:click="deleteUser(user)" class="btn btn-danger">ลบข้อมูล</button>
        </div>
        <hr>
      </div>
    </div>
    <div>
      <button v-on:click="logout" class="btn btn-secondary">Logout</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    await this.refreshData();
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({ name: 'login' });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Roboto', sans-serif; /* ฟอนต์ที่ดูทันสมัย */
  background-color: #ffffff; /* พื้นหลังสีขาวเพื่อความสะอาด */
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.action-button {
  text-align: center;
  margin-bottom: 20px; /* ระยะห่างระหว่างปุ่มสร้างผู้ใช้กับส่วนอื่น */
}

.user-count {
  font-size: 18px;
  font-weight: bold;
  color: #555;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center; /* จัดให้อยู่กลาง */
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-primary {
  background-color: #5a67d8; /* สีม่วง */
  color: white;
}

.btn-info {
  background-color: #38b2ac; /* สีฟ้าเขียว */
  color: white;
}

.btn-warning {
  background-color: #f6e05e; /* สีเหลือง */
  color: black;
}

.btn-danger {
  background-color: #e53e3e; /* สีแดง */
  color: white;
}

.btn-secondary {
  background-color: #a0aec0; /* สีเทา */
  color: white;
}

.btn:hover {
  opacity: 0.9; /* ความโปร่งใสเมื่อ hover */
  transform: translateY(-3px); /* เคลื่อนย้ายขึ้นเมื่อ hover */
}

.user-card {
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  background-color: #f9f9f9; /* พื้นหลังการ์ดผู้ใช้ */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s; /* การเคลื่อนไหวเมื่อ hover */
}

.user-card:hover {
  transform: scale(1.03); /* ขยายเมื่อ hover */
}

.user-card div {
  margin-bottom: 5px;
}
</style>
