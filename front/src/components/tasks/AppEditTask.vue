<template>
    <Modal title="Modifier une tâche" class="column" @hide="close">
      <q-input outlined v-model="newTask.title" label="Task" />
      <q-input outlined v-model="newTask.description" label="Description" type="textarea" />
      <q-btn @click="update" class="update" color="primary" label="Modifier" :disabled="(newTask.title.length < 1)" />
    </Modal>
</template>
<script setup>
import { ref } from 'vue'
import Modal from 'src/components/elements/AppModal.vue'

const props = defineProps({
  task: {
    type: Object,
    default: null
  }
})

const newTask = ref({ ...props.task })
const task = ref(props.task)
const emit = defineEmits(['update:modelValue'])

const update = () => {
  task.value.title = newTask.value.title
  task.value.description = newTask.value.description
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
.update {
    width: 100%;
    margin-top: auto;
}
</style>
