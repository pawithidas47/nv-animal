<template>
    <div class="container">
        <h2>All Animal</h2>
        <p><button class="btn btn-logout" @click="logout">Log out</button></p>

        <h4 class="count">จำนวนสัตว์: {{ filteredAnimal.length }} ตัว</h4>

        <div>
            <input class="search-input" type="text" v-model="searchQuery" placeholder="ค้นหา..." />
        </div><br>

        <div class="filter-buttons">
            <button class="btn btn-category" @click="filterAnimal('ทั้งหมด')">แสดงทั้งหมด</button>
            <button class="btn btn-category" @click="filterAnimal('สัตว์เลี้ยงลูกด้วยนม')">สัตว์เลี้ยงลูกด้วยนม</button>
            <button class="btn btn-category" @click="filterAnimal('สัตว์ปีก')">สัตว์ปีก</button>
            <button class="btn btn-category" @click="filterAnimal('สัตว์เลี้ยงเลื้อยคลาน')">สัตว์เลี้ยงเลื้อยคลาน</button>
            <button class="btn btn-category" @click="filterAnimal('สัตว์ครึ่งบกครึ่งน้ำ')">สัตว์ครึ่งบกครึ่งน้ำ</button>
            <button class="btn btn-category" @click="filterAnimal('สัตว์น้ำ')">สัตว์น้ำ</button>
        </div>

        <p><button class="btn btn-add" @click="navigateTo('/Animal/create')">Add Animal</button></p>

        <div class="animal-grid">
            <div v-for="Animal in filteredAnimal" :key="Animal.id" class="animal-card">
                <img :src="BASE_URL + Animal.picture" alt="Animal Image" v-if="Animal.picture" class="animal-image" />
                <div class="animal-info">
                    <p><strong>รหัส:</strong> {{ Animal.id }}</p>
                    <p><strong>ชื่อ:</strong> {{ Animal.name }}</p>
                    <p><strong>ที่อยู่อาศัย:</strong> {{ Animal.habitat }}</p>
                    <p><strong>อาหาร:</strong> {{ Animal.food }}</p>
                    <p><strong>ประเภท:</strong> <span class="status">{{ Animal.status }}</span></p>
                </div>
                <div class="button-group">
                    <button class="btn btn-view" @click="navigateTo('/Animal/' + Animal.id)">View</button>
                    <button class="btn btn-edit" @click="navigateTo('/Animal/edit/' + Animal.id)">Edit</button>
                    <button class="btn btn-delete" @click="deleteAnimal(Animal)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import AnimalService from '@/services/AnimalService'
import AnimalService from '@/services/AnimalService';
export default {
    data() {
        return {
            Animal: [],
            BASE_URL: 'http://localhost:8081/assets/uploads/',
            filter: 'ทั้งหมด',
            searchQuery: ''
        }
    },
    computed: {
        filteredAnimal() {
            let filtered = this.filter === 'ทั้งหมด' ? this.Animal : this.Animal.filter(Animal => Animal.status === this.filter);
            
            if (this.searchQuery) {
                const lowerSearchQuery = this.searchQuery.toLowerCase();
                filtered = filtered.filter(Animal => {
                    return Animal.id.toString().includes(lowerSearchQuery) || 
                           Animal.name.toLowerCase().includes(lowerSearchQuery) || 
                           Animal.habitat.toLowerCase().includes(lowerSearchQuery);
                });
            }
            return filtered;
        }
    },
    async created() {
        this.Animal = (await AnimalService.index()).data
    },
    methods: {
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setAnimal', null)
            this.$router.push({ name: 'login' })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteAnimal(Animal) {
            if (confirm("ต้องการลบข้อมูล?")) {
                try {
                    await AnimalService.delete(Animal)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.Animal = (await AnimalService.index()).data
        },
        filterAnimal(category) {
            this.filter = category
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #ffffff; /* เปลี่ยนพื้นหลังเป็นสีขาว */
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #2c3e50; /* Dark color for headings */
    font-size: 2.5rem; /* Increase font size */
}

.count {
    font-weight: bold;
    color: #16a085; /* Turquoise color */
    text-align: center;
    font-size: 1.5rem; /* Adjust font size */
}

.search-input {
    width: 100%;
    padding: 12px;
    border: 2px solid #27ae60; /* Green border */
    border-radius: 5px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.search-input:focus {
    border-color: #1abc9c; /* Darker green on focus */
    box-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
}

.filter-buttons {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.btn {
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    flex: 1 1 30%; 
    margin: 5px;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.btn-category {
    background-color: #0c79a4; /* Bright green */
    color: white;
}

.btn-category:hover {
    background-color: #38b6b6; /* Darker green on hover */
    transform: translateY(-2px);
}

.btn-add {
    background-color: #2980b9; /* Bright blue */
    color: white;
}

.btn-add:hover {
    background-color: #1f638d; /* Darker blue on hover */
    transform: translateY(-2px);
}

.animal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.animal-card {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #ffffff; /* White background for cards */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s, box-shadow 0.3s;
}

.animal-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.animal-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
}

.animal-info {
    margin: 10px 0;
}

.animal-card p {
    margin: 5px 0;
}

.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.btn-view {
    background-color: #3498db; /* Bright blue */
    color: white;
    flex: 1;
    margin-right: 5px;
    transition: background-color 0.3s, transform 0.3s;
}

.btn-edit {
    background-color: #f1c40f; /* Bright yellow */
    color: black;
    flex: 1;
    margin-right: 5px;
    transition: background-color 0.3s, transform 0.3s;
}

.btn-delete {
    background-color: #e74c3c; /* Bright red */
    color: white;
    flex: 1;
    transition: background-color 0.3s, transform 0.3s;
}

.btn-view:hover {
    background-color: #2980b9; /* Darker blue */
    transform: translateY(-2px);
}

.btn-edit:hover {
    background-color: #f39c12; /* Darker yellow */
    transform: translateY(-2px);
}

.btn-delete:hover {
    background-color: #c0392b; /* Darker red */
    transform: translateY(-2px);
}

/* Additional styling for status */
.status {
    font-weight: bold;
    color: #e67e22; /* Use a bright orange for status */
    text-transform: capitalize;
}

</style>
