<template>
    <Modal @hide="close()">
        <template v-slot:header>
            <q-btn unelevated text-color="grey" icon="more_horiz" class="options" @click="showOptions = true"/>
        </template>
        <h3 class="text-grey-5">Task</h3>
        <h2>{{props.task?.title}}</h2>
        <h3 class="text-grey-5">Description</h3>
        <p>{{props.task?.description ?? 'Sans description'}}</p>
        <h3 class="text-grey-5">Terminée</h3>
        <p>{{props.task?.done ? 'Oui' : 'Non'}}</p>

        <q-dialog v-model="showOptions" position="bottom">
          <Options :options="options" title="Task options" />
        </q-dialog>

        <Edit :task="props.task" v-model="showEdit" />
    </Modal>
</template>
<script setup>
import { ref } from 'vue'
import Modal from 'src/components/elements/AppModal.vue'
import Options from 'src/components/elements/AppOptions.vue'
import Edit from 'src/components/tasks/AppEditTask.vue'
import { useTasksStore } from 'stores/tasks-store'

const props = defineProps({
  task: {
    type: Object,
    default: null
  }
})
const showOptions = ref(false)
const showEdit = ref(false)
const tasksStore = useTasksStore()
const emit = defineEmits(['update:modelValue'])

const edit = () => {
  showEdit.value = true
}

const remove = async () => {
  await tasksStore.removeTask(props.task._id)
  close()
}

const options = [
  { label: 'Editer', action: edit },
  { label: 'Déplacer la tâche', action: null },
  { label: 'Supprimer', action: remove, color: 'negative' }
]

const close = () => {
  emit('update:modelValue', false)
}

</script>
<style scoped>
  h3 {
    font-weight: normal;
    margin: 2rem 0 .5rem 0;
  }
</style>
