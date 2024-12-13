<template>
  <header class="mb-6 bg-white dark:bg-gray-700 p-4 rounded shadow">
    <h1 class="text-xl font-bold">{{ title }}</h1>
    <p class="mt-2">{{ subtitle }}</p>
  </header>
</template>

<script lang="ts" setup>
import type { HeaderProps } from "~/components/header/types";

defineProps<HeaderProps>();
</script>