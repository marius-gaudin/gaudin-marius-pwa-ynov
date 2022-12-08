<template>
  <Modal :title="list.title" @hide="close">
    <template v-slot:header>
      <q-btn unelevated text-color="grey" icon="more_horiz" class="options" @click="(showOptions = true)" />
    </template>

    <h3 :set="tasksNotCompleted = tasksStore.getCompletedTasksList(false, props.listSelected)">Tasks - {{tasksNotCompleted?.length}}</h3>
    <div class="column">
      <q-btn @click="openTask(task)" class="items-start text-capitalize" unelevated color="grey-3" text-color="dark" v-for="(task, index) in tasksNotCompleted" :key="index" >
        <q-checkbox v-model="task.done" />{{task.title}}
      </q-btn>
    </div>

    <h3 :set="tasksCompleted = tasksStore.getCompletedTasksList(true, props.listSelected)">Tasks Completed - {{tasksCompleted?.length}}</h3>
    <div class="column">
      <q-btn @click="openTask(task)" class="items-start text-capitalize" unelevated color="grey-3" text-color="dark" v-for="(task, index) in tasksCompleted" :key="index" >
        <q-checkbox v-model="task.done" />{{task.title}}
      </q-btn>
    </div>

    <Task v-if="showTask" v-model="showTask" :task="taskSelected" />

    <AddTask v-if="showAddTask" :list="list._id" v-model="showAddTask" />

    <ListOptions v-model="showOptions" :idList="list._id" @delete="onDelete" @edit="(showEditList = true)" />

    <EditList v-if="showEditList" v-model="showEditList" :list="list._id" />

    <div class="add row justify-center" @click="(showAddTask = true)"><button class=" material-icons">add</button></div>
  </Modal>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useTasksStore } from 'stores/tasks-store'
import { useListsStore } from 'stores/lists-store'
import Modal from 'src/components/elements/AppModal.vue'
import AddTask from 'src/components/tasks/AppAddTask.vue'
import Task from 'src/components/tasks/AppTask.vue'
import ListOptions from 'src/components/lists/AppListOptions.vue'
import EditList from 'src/components/lists/AppEditList.vue'

const props = defineProps({
  listSelected: {
    type: String,
    default: null
  }
})
const emit = defineEmits(['update:modelValue'])

const tasksStore = useTasksStore()
const listsStore = useListsStore()

const showAddTask = ref(false)
const showTask = ref(false)
const showOptions = ref(false)
const showEditList = ref(false)
const taskSelected = ref(null)

const list = ref(listsStore.getByID(props.listSelected))

watch(() => props.listSelected, (value, oldValue) => {
  list.value = listsStore.getByID(value)
})

const openTask = (task) => {
  taskSelected.value = task
  showTask.value = true
}

const close = () => {
  emit('update:modelValue', false)
}

const onDelete = () => {
  showOptions.value = false
  close()
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
