import Api from '@/services/Api'
export default {
    index() {
        return Api().get('Animal')
    },
    show(AnimalId) {
        return Api().get('Animal/' + AnimalId)
    },
    post(Animal) {
        return Api().post('Animal', Animal)
    },
    put(Animal) {
        return Api().put('Animal/' + Animal.id, Animal)
    },
    delete(Animal) {
        return Api().delete('Animal/' + Animal.id, Animal)
    },
}