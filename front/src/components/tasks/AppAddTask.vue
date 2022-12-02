<template>
  <q-input outlined v-model="title" label="Task" />
  <q-input outlined v-model="description" label="Description" type="textarea" />
  <q-btn @click="addNewTask" class="create" color="primary" label="Créer" :disabled="(title.length < 1)" />
</template>
<script setup>
import { ref } from 'vue'
import { addTask } from 'services/tasks'

const props = defineProps({
  listId: {
    type: String,
    default: null
  }
})

const title = ref('')
const description = ref('')
const emit = defineEmits(['addTask'])

async function addNewTask () {
  const { data } = await addTask({ list: props.listId, description: description.value, title: title.value })
  emit('addTask', data)
}

</script>
<style scoped>
.q-field {
    margin: 1rem 0;
}
.create {
    width: 100%;
}

</style>
