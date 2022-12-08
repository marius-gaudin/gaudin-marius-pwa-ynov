<template>
  <Modal title="Créer une tâche" @hide="close()">
    <q-input outlined v-model="title" label="Task" />
    <q-input outlined v-model="description" label="Description" type="textarea" />
    <q-btn @click="createTask" class="create" color="primary" label="Créer" :disabled="validate" />
  </Modal>
</template>
<script setup>
import { ref, computed } from 'vue'
import Modal from 'src/components/elements/AppModal.vue'
import { useTasksStore } from 'stores/tasks-store'

const props = defineProps({
  list: {
    type: String,
    default: null
  }
})

const title = ref('')
const description = ref('')
const tasksStore = useTasksStore()
const emit = defineEmits(['update:modelValue'])
const validate = computed(() => (title.value.length < 1 || description.value.length < 1))

const createTask = () => {
  tasksStore.addTask({
    title: title.value,
    description: description.value,
    list: props.list
  })
  close()
}

const close = () => {
  emit('update:modelValue', false)
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
