<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <div>
      <input :value="modelValue" :id="id" type="text" @input="$emit('update:modelValue', $event.target.value)"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "FormInput",
  props: {
    id: String,
    label: String,
    modelValue: String
  },
  emits: ['update:modelValue']
};
</script>
