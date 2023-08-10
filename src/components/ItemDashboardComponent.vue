<template>
    <div class="card card-shadow">
      <div class="card-body">
        <h5 class="card-title">{{ label }}</h5>
        <p class="card-text">{{ count }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      count: {
        type: Number,
        required: true,
      },
      label: {
        type: String,
        required : true
      }
    },
  };
  </script>
  
  <style scoped>
  .card-shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  