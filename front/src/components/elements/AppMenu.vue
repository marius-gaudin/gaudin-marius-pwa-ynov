<template>
    <q-card class="menu column">
        <q-card-section>
            <div class="row justify-end">
                <q-btn icon="close" flat round dense v-close-popup />
            </div>
            <h2>Mes listes</h2>
        </q-card-section>
        <q-card-section class="column">
            <q-btn no-caps label="Créer une liste" color="primary" @click="emit('openAddList')"></q-btn>
            <q-btn no-caps flat align="left" class="list" v-for="(list, index) in listsStore.lists" :key="index" @click="openList(list._id)">
                {{list.title}}
            </q-btn>
        </q-card-section>
    </q-card>
</template>
<script setup>
import { useListsStore } from 'stores/lists-store'
const listsStore = useListsStore()
const emit = defineEmits(['openList', 'openAddList'])
const openList = (id) => {
  emit('openList', id)
}
</script>
<style scoped>
.menu {
    padding: .5rem;
    width: 70vw;
}

.list {
    border-bottom: solid 1px rgb(197, 197, 197);
    margin: 1rem 0;
    padding-left: 0;
    border-radius: 0;
    font-size: 1rem;
}

</style>
