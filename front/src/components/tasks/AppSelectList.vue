<template>
    <q-card>
        <h2>Déplacer la tâche dans une liste</h2>
        <q-select v-model="listSelected" :options="listsStore.lists" option-label="title" filled />
        <div class="row justify-between">
            <q-btn label="Annuler" v-close-popup/>
            <q-btn @click="setList" color="primary" label="Déplacer" v-close-popup/>
        </div>
    </q-card>
</template>
<script setup>
import { ref } from 'vue'
import { useListsStore } from 'stores/lists-store'

const props = defineProps({
  task: {
    type: Object
  }
})
const listsStore = useListsStore()
const task = ref(props.task)
const listSelected = ref(listsStore.getByID(task.value.list))

const setList = () => {
  task.value.list = listSelected.value._id
}
</script>
<style scoped>
.q-card {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
}

.q-field {
    margin: 1.5rem 0;
}
input {
    margin: 1rem;
}
</style>
