<template>
    <div class="modal" :style="`left: ${props.show ? '0':'-100%'}`">
        <div class="row items-center">
            <q-btn unelevated class="btn-back" color="grey-3" text-color="dark" icon="navigate_before" @click="close" />
            <h2>{{props.title}}</h2>
            <div class="end">
              <slot name="header"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['show'])

function close () {
  emit('show', false)
}
</script>
<style scoped>
  .end {
    margin-left: auto;
  }
  .modal {
      padding: 1.5rem;
      position: fixed;
      top: 0;
      background-color: white;
      width: 100vw;
      height: 100vh;
      z-index: 2;
      transition: left .5s;
  }
  .btn-back {
      width: 1rem;
      height: 1rem;
      margin-right: 1rem;
  }
</style>
