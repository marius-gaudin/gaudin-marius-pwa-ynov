<template>
  <q-dialog :maximized="true" position="left">
    <div class="modal">
      <div class="row items-center">
        <q-btn unelevated class="btn-back" color="grey-3" text-color="dark" icon="navigate_before" v-close-popup />
          <h2>{{title}}</h2>
          <div class="end">
            <slot name="header"></slot>
          </div>
      </div>
      <slot></slot>
    </div>
  </q-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const title = ref(props.title)

watch(() => props.title, (value, oldValue) => {
  title.value = value
})

</script>
<style scoped>
  .end {
    margin-left: auto;
  }
  .modal {
      padding: 1.5rem;
      background-color: white;
      width: 100vw;
  }
  .btn-back {
      width: 1rem;
      height: 1rem;
      margin-right: 1rem;
  }
</style>
