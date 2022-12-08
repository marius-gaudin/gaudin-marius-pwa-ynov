<template>
  <div class="row justify-between">
      <h2>Dashboard</h2>
      <div>
          <q-btn unelevated round color="grey-4" icon="person" text-color="grey"/>
      </div>
  </div>

  <h1>Bonjour, <div>Tom Dupont ! 👋</div></h1>
  <div>
      <q-card class="card" v-for="(list, index) in listsStore.lists" :key="index">
        <q-card-section class="card-section top row items-center justify-between">
            <h2>{{list.title}}</h2>
            <q-btn unelevated text-color="grey" icon="more_horiz" class="options" @click="openListOptions(list._id)" />
        </q-card-section>
        <q-card-section class="card-section">
            <div class="column" :set="listTasks = tasksStore.getTasksList(list._id)">
                <q-checkbox v-for="(task, index) in listTasks" :key="index" v-model="task.done" :label="task.title" />
                <p v-if="listTasks.length < 1">Cette liste ne contient aucune tâches ajoutez en une depuis la liste</p>
            </div>
            <q-separator inset />
            <button class="voir-list" @click="openList(list._id)">Voir la liste complète</button>
        </q-card-section>
      </q-card>
  </div>

  <List v-if="listSelected" v-model="showList" :listSelected="listSelected"/>

  <ListOptions v-model="showListOptions" :idList="listSelected" @edit="(showEditList = true)" />

  <EditList v-if="showEditList" v-model="showEditList" :list="listSelected" />

  <Tabs />
</template>
<script setup>
import { ref, watch } from 'vue'
import { getAllLists } from 'services/lists'
import { getAllTasks, setTask } from 'services/tasks'
import Tabs from 'src/components/elements/AppTabs.vue'
import List from 'src/components/lists/AppList.vue'
import ListOptions from 'src/components/lists/AppListOptions.vue'
import EditList from 'src/components/lists/AppEditList.vue'

import { useListsStore } from 'stores/lists-store'
import { useTasksStore } from 'stores/tasks-store'

const showList = ref(false)
const showListOptions = ref(false)
const showEditList = ref(false)
const listSelected = ref(null)

const listsStore = useListsStore()
const tasksStore = useTasksStore();

(async () => {
  const { data } = await getAllLists()
  listsStore.lists = data
})();

(async () => {
  const { data } = await getAllTasks()
  tasksStore.tasks = data
  tasksStore.tasks.forEach(task => {
    watch(task, (currentValue, oldValue) => {
      setTask(currentValue)
    })
  })
})()

const setList = (idList) => {
  listSelected.value = idList
}

const openList = (idList) => {
  setList(idList)
  showList.value = true
}

const openListOptions = (idList) => {
  setList(idList)
  showListOptions.value = true
}
</script>
