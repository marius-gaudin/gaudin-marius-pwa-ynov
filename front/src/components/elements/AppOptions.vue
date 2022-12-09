<template>
  <q-card>
    <q-card-section class="section top row items-center justify-between">
        <h2>{{confirm ? confirm?.confirmation?.title : props?.title}}</h2>
        <q-btn flat class="text-capitalize close" color="primary" v-close-popup>close</q-btn>
    </q-card-section>
    <q-card-section class="section column" v-if="!confirm">
      <q-btn v-for="(btn, index) in props?.options"
      :key="index"
      flat
      class="text-capitalize items-start btn-list"
      :label="btn?.label"
      :color="btn?.color"
      @click="action(btn)"
      v-close-popup />
    </q-card-section>

    <q-card-section class="section" v-else>
      <p>{{confirm?.confirmation?.description}}</p>
      <div class="q-gutter-sm row justify-between">
        <q-btn class="text-capitalize" label="annulé" @click="(confirm=null)" />
        <q-btn
        class="text-capitalize"
        :label="confirm?.confirmation?.button?.label"
        :color="confirm?.confirmation?.button?.color"
        @click="confirm?.action"
        v-close-popup />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref } from 'vue'
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

const confirm = ref(null)

const action = (btn) => {
  if (!btn?.confirmation) {
    btn?.action()
  } else {
    confirm.value = btn
  }
}
</script>
<style scoped>
  .section {
    padding: .5rem 1.5rem;
  }
  .btn-list {
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
    width: 100%;
  }
</style>
