<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="text-h6">
        Confirm Delete
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" text @click="cancel">Cancel</v-btn>
        <v-btn color="red" text @click="confirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
  }
});

const emits = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val)
})

function cancel() {
  dialog.value = false
  emits('cancel')
}

function confirm() {
  dialog.value = false
  emits('confirm')
}
</script>