<template>
    <q-dialog @hide="close">
        <q-card>
            <h2>Créer une nouvelle liste</h2>
            <q-input outlined v-model="title" label="list name" />
            <q-btn @click="createList" color="primary" label="Créer" :disabled="(title.length < 1)" />
        </q-card>
    </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useListsStore } from 'stores/lists-store'
const title = ref('')
const emit = defineEmits(['update:modelValue'])
const listsStore = useListsStore()

const createList = () => {
  listsStore.addList({
    title: title.value
  })
  close()
}

const close = () => {
  emit('update:modelValue', false)
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
