<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{ name: 'Animal' }">Animal</router-link></li>
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
  background: linear-gradient(135deg, #4CAF50, #1E88E5); /* Gradient background with nature colors */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* More prominent shadow */
  padding: 15px 0;
  width: 100%;
  position: sticky; /* Sticky navbar */
  top: 0; /* Stick to the top of the page */
  z-index: 1000; /* Ensure it stays above other content */
  transition: background 0.5s; /* Smooth background transition */
}

.nv-navbar:hover {
  background: linear-gradient(135deg, #4CAF50, #2196F3); /* Change gradient on hover */
}

.nv-navbar .nav {
  list-style: none;
  display: flex; /* Use Flexbox for layout */
  justify-content: center; /* Center the items */
  margin: 0;
  padding: 0;
}

.nv-navbar .nav li {
  margin: 0 30px; /* Increase spacing between menu items */
}

.nv-navbar .nav li a {
  text-decoration: none;
  color: #ffffff; /* White text color for contrast */
  font-size: 20px; /* Increased font size */
  font-weight: bold;
  transition: color 0.3s, transform 0.3s, background 0.3s; /* Added transform transition */
  padding: 10px 15px; /* Adjusted padding for better spacing */
  border-radius: 5px;
}

.nv-navbar .nav li a:hover {
  color: #fff; /* Change text color on hover */
  background-color: rgba(255, 255, 255, 0.2); /* Add background color on hover */
  transform: scale(1.1); /* Scale effect on hover */
}

.nv-navbar .nav li a.router-link-active {
  background-color: rgba(236, 227, 227, 0.3); /* Active link background with transparency */
  color: #ffffff; /* Active link text color */
  border-bottom: 3px solid rgba(255, 255, 255, 0.6); /* Thinner underline for active link */
}
</style>
