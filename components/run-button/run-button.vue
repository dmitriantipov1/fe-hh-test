<template>
  <button
      @click="emits('on-click')"
      :disabled="isDisabled"
      class="px-4 py-2 rounded bg-green-500 text-white font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    {{ buttonTitle }}
  </button>
</template>

<script lang="ts" setup>
import type {RunButtonEmits, RunButtonProps} from "~/components/run-button/types";

const props = defineProps<RunButtonProps>();
const emits = defineEmits<RunButtonEmits>();

const buttonTitle = computed(() => !props.isLoading ? "Run" : "Running...");
const isDisabled = computed(() => !props.canRunCode || props.isLoading);
</script>