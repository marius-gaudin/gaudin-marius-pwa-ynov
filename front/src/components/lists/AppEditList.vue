<template>
    <q-dialog @hide="close">
        <q-card>
            <h2>Modifier une liste</h2>
            <q-input outlined v-model="newList.title" label="list name" />
            <q-btn @click="update" color="primary" label="Modifier" :disabled="(newList.title.length < 1)" />
        </q-card>
    </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useListsStore } from 'stores/lists-store'
const emit = defineEmits(['update:modelValue'])
const listsStore = useListsStore()

const props = defineProps({
  list: {
    type: String
  }
})

const list = ref(listsStore.getByID(props.list))
const newList = ref({ ...list.value })

const update = async () => {
  await listsStore.setList(newList.value)
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
