<template>
  <q-card style="width: 100%">
    <q-card-section class="section top row items-center justify-between">
        <h2>{{props?.title}}</h2>
        <q-btn flat class="text-capitalize close" color="primary" v-close-popup>close</q-btn>
    </q-card-section>
    <q-card-section class="section column">
      <q-btn v-for="(btn, index) in props?.options" :key="index" flat class="text-capitalize items-start" :label="btn?.label" :color="btn?.color" @click="btn?.action" v-close-popup />
    </q-card-section>
  </q-card>
</template>
<script setup>
const props = defineProps({
  options: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: null
  }
})
</script>
<style scoped>
  .section {
    padding: .5rem 1.5rem;
  }
  .section button {
    padding: 0;
    font-size: 1rem;
  }
  .top {
    padding-top: 1.5rem;
  }
  .close {
    width: 2.5rem;
  }
  .q-card {
    border-radius: 1.2rem 1.2rem 0 0;
  }
</style>
