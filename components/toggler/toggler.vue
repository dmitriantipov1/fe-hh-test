<template>
  <div class="flex items-center gap-2">
    <span>Тёмная тема</span>
    <button
        @click="changeTheme"
        class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        :class="{
          'bg-green-600': theme === Theme.DARK,
          'bg-gray-300': theme === Theme.WHITE,
        }"
    >
          <span
              class="inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform"
              :class="{
          'translate-x-6': theme === Theme.DARK,
          'translate-x-1': theme === Theme.WHITE,
        }"
          ></span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import {Theme} from "~/composables/types";
import type {TogglerEmits} from "~/components/toggler/types";
import {useToggler} from "~/composables/useToggler";

const emits = defineEmits<TogglerEmits>();

const {
  theme,
  setTheme,
} = useToggler();

function changeTheme(): void {
  setTheme();
  emits('change-theme', theme.value);
}
</script>