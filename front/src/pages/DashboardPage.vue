<template>
    <div class="row justify-between">
        <h2>Dashboard</h2>
        <div>
            <q-btn unelevated round color="grey-4" icon="person" text-color="grey"/>
        </div>
    </div>

    <h1>Bonjour, <div>Tom Dupont ! 👋</div></h1>
    <div>
        <q-card class="card" v-for="(list, index) in lists" :key="index">
            <q-card-section class="card-section top row items-center justify-between">
                <h2>{{list.title}}</h2>
                <q-btn unelevated text-color="grey" icon="more_horiz" class="more" @click="(showEdit = !showEdit)" />
            </q-card-section>
            <q-card-section class="card-section">
                <div class="column" :set="listTasks = getTasks(list._id)">
                    <q-checkbox v-for="(task, index) in listTasks" :key="index" v-model="task.done" :label="task.title" />
                    <p v-if="listTasks.length < 1">Cette liste ne contient aucune tâches ajoutez en une depuis la liste</p>
                </div>
                <q-separator inset />
                <button class="voir-list" @click="openList(list)">Voir la liste complète</button>
            </q-card-section>
        </q-card>
    </div>

    <Modal :show="showList" :title="listSelected?.list?.title" @show="(showList = false)">
      <template v-slot:header>
        <q-btn unelevated text-color="grey" icon="more_horiz" class="more" @click="(showEdit = !showEdit)" />
      </template>
      <List :listSelected="listSelected" @addTask="addTask" />
    </Modal>

    <q-dialog v-model="showEdit" position="bottom">
      <q-card style="width: 100%">
        <q-card-section class="row items-center justify-between">
          <h2>List Option</h2>
          <q-btn flat color="primary" @click="(showEdit = !showEdit)">close</q-btn>
        </q-card-section>
        <q-card-section class="column">
          <div>
            <q-btn flat label="Editer" />
          </div>
          <div>
            <q-btn flat color="negative" label="Supprimer" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <Tabs />
</template>
<script setup>
import { ref, watch } from 'vue'
import { getAllLists } from 'services/lists'
import { getAllTasks, setTask } from 'services/tasks'
import Tabs from 'src/components/elements/AppTabs.vue'
import Modal from 'src/components/elements/AppModal.vue'
import List from 'src/components/lists/AppList.vue'

import { useListsStore } from 'stores/lists-store'

const lists = ref([])
const listSelected = ref([])
const tasks = ref([])
const nbTasksVisible = 3

const showList = ref(false)
const showEdit = ref(false);

(async () => {
  const { data } = await getAllLists()
  useListsStore.list = data
})();

(async () => {
  const { data } = await getAllTasks()
  tasks.value = data
  tasks.value.forEach(task => {
    watch(task, (currentValue, oldValue) => {
      setTask(currentValue)
    })
  })
})()

function getTasks (idList) {
  let i = 0
  return tasks.value.filter(task => task.list === idList && (i++) < nbTasksVisible)
}

function openList (list) {
  listSelected.value = { list, tasks: tasks.value.filter(task => task.list === list._id) }
  showList.value = true
}

function addTask (task) {
  tasks.value.push(task)
  listSelected.value.tasks = tasks.value.filter(task => task.list === listSelected.value.list._id)
}

</script>
<style scoped>
.more {
    width: 1rem;
}
</style>
