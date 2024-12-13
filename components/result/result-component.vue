<template>
  <div class="mt-4 p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded">
    <h2 class="text-lg font-semibold mb-2">Результат выполнения</h2>
    <p
        :class="{
          'text-sm text-green-600': result && !result.startsWith('Error:'),
          'text-sm text-red-600': result && result.startsWith('Error:'),
          'text-sm text-gray-600': isLoading,
          'text-sm text-gray-500': !result,
        }"
    >{{ contentText }}</p>
  </div>
</template>

<script lang="ts" setup>
import type {ResultProps} from "~/components/result/types";

const props = defineProps<ResultProps>();

const contentText = computed(() => {
  if (props.result && !props.result.startsWith('Error:') || props.result && props.result.startsWith('Error:')) {
    return props.result;
  } else if (props.isLoading) {
    return 'Загрузка...';
  } else {
    return 'Результаты появятся здесь...';
  }
});
</script>