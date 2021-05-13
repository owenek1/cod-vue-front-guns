<template>
  <div v-if="isLoading" class="loading w-50 mx-auto">
    <div class="d-flex justify-content-center">
      <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'isLoading': {
        type: Boolean
      }
    },
  }
</script>