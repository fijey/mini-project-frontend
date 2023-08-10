<template>
    <div class="form-group">
      <label :for="label" class="text-light">{{ label }}</label>
      <input
        :type="type"
        class="form-control"
        :id="label"
        :value="modelValue"
        @input="updateModelValue"
        required
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      modelValue: String,
      type: { type: String, default: 'text' }
    },
    methods: {
      updateModelValue(event) {
        this.$emit('update:modelValue', event.target.value);
      }
    }
  };
  </script>
  