<template>
  <select
      id="language"
      v-model="currentCodeLanguage"
      class="mt-1 block w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  >
    <option
        v-for="(lang, index) in options"
        :key="index"
        :value="lang"
        :selected="lang === currentCodeLanguage"
    >
      {{ lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase() }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import type {LanguageSelectorEmits, LanguageSelectorProps} from "~/components/language-selector/types";

const props = defineProps<LanguageSelectorProps>();
const emits = defineEmits<LanguageSelectorEmits>();

const currentCodeLanguage = computed<string>({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})
</script>