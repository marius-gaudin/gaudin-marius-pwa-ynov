<template>
  <q-dialog position="bottom">
    <Options :options="options" title="List options" />
  </q-dialog>
</template>
<script setup>
import Options from 'src/components/elements/AppOptions.vue'
import { useListsStore } from 'stores/lists-store'

const props = defineProps({
  idList: {
    type: String
  }
})

const listsStore = useListsStore()
const emit = defineEmits(['delete', 'edit'])

const remove = () => {
  listsStore.removeList(props.idList)
  emit('delete')
}

const edit = () => {
  emit('edit')
}

const options = [
  { label: 'Editer', action: edit },
  { label: 'Supprimer', action: remove, color: 'negative' }
]

</script>
