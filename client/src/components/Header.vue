<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{ name: 'blogs' }">Animal</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nv-navbar {
  background-color: #f7d774; /* Bright background color */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Shadow for aesthetics */
  padding: 15px 0;
  width: 100%;
}

.nv-navbar .nav {
  list-style: none;
  display: flex; /* Use Flexbox for layout */
  justify-content: center; /* Center the items */
  margin: 0;
  padding: 0;
}

.nv-navbar .nav li {
  margin: 0 15px; /* Spacing between menu items */
}

.nv-navbar .nav li a {
  text-decoration: none;
  color: #4a4a4a;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s, background-color 0.3s; /* Hover effects */
  padding: 8px 15px;
  border-radius: 5px;
}

.nv-navbar .nav li a:hover {
  background-color: #ffd700; /* Background color on hover */
  color: #333; /* Text color on hover */
}

.nv-navbar .nav li a.router-link-active {
  background-color: #ffd700;
  color: #333;
  border-bottom: 2px solid darkslategrey; /* Underline for active link */
}
</style>
