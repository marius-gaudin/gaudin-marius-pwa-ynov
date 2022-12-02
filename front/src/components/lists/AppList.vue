<template>
  <h3 :set="tasksNotCompleted = getTasksCompleted(false)">Tasks - {{tasksNotCompleted?.length}}</h3>
  <div class="column">
      <q-checkbox v-for="(task, index) in tasksNotCompleted" :key="index" v-model="task.done" :label="task.title" />
  </div>
  <h3 :set="tasksCompleted = getTasksCompleted(true)">Tasks Completed - {{tasksCompleted?.length}}</h3>
  <div class="column">
      <q-checkbox v-for="(task, index) in tasksCompleted" :key="index" v-model="task.done" :label="task.title" />
  </div>
  <Modal :show="showAddTask" title="Créer une tâche" @show="(showAddTask = false)">
    <AddTask :listId="listSelected?.list?._id" @addTask="addTask" />
  </Modal>

  <div class="add row justify-center" @click="(showAddTask = true)"><button class=" material-icons">add</button></div>
</template>
<script setup>
import { ref } from 'vue'
import AddTask from 'src/components/tasks/AppAddTask.vue'
import Modal from 'src/components/elements/AppModal.vue'
const props = defineProps({
  listSelected: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['addTask'])
const showAddTask = ref(false)

function getTasksCompleted (completed) {
  return props.listSelected?.tasks?.filter(task => task.done === completed)
}

function addTask (task) {
  emit('addTask', task)
  showAddTask.value = false
}

</script>
<style scoped>
    .add {
        width: 100%;
        position: absolute;
        bottom: 2rem;
        left: 0;
    }

    .add button {
        background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        border: none;
        font-size: 1.8rem;
        color: white;
    }

    h3 {
        margin: 1rem 0;
    }
</style>
