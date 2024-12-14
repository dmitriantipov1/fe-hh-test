<template>
  <div
      class="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-4"
  >
    <Header
        title="Онлайн редактор кода"
        subtitle="Здесь вы можете писать код на выбранном вами языке программирования и отображать результат выполнения."
    />

    <section class="mb-4 flex justify-end">
      <Toggler @change-theme="onToggle($event)" />
    </section>

    <section class="mb-6 bg-white dark:bg-gray-700 p-4 rounded shadow">
    <div class="flex items-center gap-3 mb-4">
      <RunButton
          :can-run-code="canRunCode"
          :is-loading="isLoading"
          @click="runCode"
      />
      <LanguageSelector
          v-model="currentCodeLanguage"
          :options="codeLanguagesArray"
      />
    </div>

      <MonacoEditor
          v-model="code"
          :options="editorOptions"
          :lang="currentCodeLanguage"
          class="h-96 border border-gray-300 dark:border-gray-600 rounded"
      />

    <ResultComponent
        :result="result"
        :is-loading="isLoading"
    />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type * as monaco from 'monaco-editor';
import Header from "~/components/header/header-component.vue";
import type {Theme} from "~/composables/types";
import {codeLanguagesArray, defaultCodeSamples} from "~/constants";
import {CodeLanguage} from "~/types";
import type {MonacoEditorOptions} from "~/types/monaco";


const currentCodeLanguage = ref<CodeLanguage>(CodeLanguage.JAVASCRIPT);
const code = ref('');
const result = ref<string | null>(null);
const isLoading = ref(false);

const editorOptions = ref<MonacoEditorOptions>({
  automaticLayout: true,
  renderLineHighlight: 'all',
  theme: 'vs-light',
});

const canRunCode = computed(() => {
  return code.value.trim().length > 0;
});

function onToggle(theme: Theme): void {
  editorOptions.value = {
    ...editorOptions.value,
    theme,
  };
}

onMounted(() => {
  code.value = defaultCodeSamples[currentCodeLanguage.value];
});

watch(currentCodeLanguage, (newLanguage) => {
  code.value = defaultCodeSamples[newLanguage] || '';
});

async function runCode(): Promise<void> {
  if (!canRunCode.value) return;

  isLoading.value = true;
  result.value = null;

  try {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: currentCodeLanguage.value,
        code: code.value,
      }),
    });

    const data = await response.json();
    if (data.status === 'success') {
      result.value = data.output || 'Execution completed with no output.';
    } else if (data.status === 'error') {
      result.value = `Error: ${data.error}`;
    }
  } catch (error) {
    result.value = 'Error: Failed to connect to server';
  } finally {
    isLoading.value = false;
  }
}

// SEO Friendly implementation
useHead({
  title: 'Онлайн редактор кода',
  meta: [
    { name: 'description', content: 'Пишите и выполняйте код на выбранном вами языке программирования.' },
    { name: 'keywords', content: 'онлайн редактор кода, программирование, JavaScript, Python, Go' },
    { property: 'og:title', content: 'Онлайн редактор кода' },
    { property: 'og:description', content: 'Пишите и выполняйте код на выбранном вами языке программирования.' },
    { property: 'og:type', content: 'website' },
  ],
});

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Онлайн редактор кода',
        description: 'Пишите и выполняйте код на выбранном вами языке программирования.',
        url: 'https://yourwebsite.com',
      }),
    },
  ],
});
</script>

<style scoped>
.h-96 {
  height: 24rem;
}
</style>