<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-4">
    <section class="mb-6 bg-white dark:bg-gray-700 p-4 rounded shadow">
      <h1 class="text-xl font-bold">Онлайн редактор кода</h1>
      <p class="mt-2">
        Здесь вы можете писать код на выбранном вами языке программирования и отображать результат выполнения.
      </p>
    </section>

    <section class="mb-4 flex justify-end">
      <div class="flex items-center gap-2">
        <span>Тёмная тема</span>
        <button
            @click="changeTheme"
            class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :class="isDarkTheme ? 'bg-blue-600' : 'bg-gray-300'"
        >
          <span
              class="inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform"
              :class="isDarkTheme ? 'translate-x-6' : 'translate-x-1'"
          ></span>
        </button>
      </div>
    </section>

    <section class="mb-6 bg-white dark:bg-gray-700 p-4 rounded shadow">
      <div class="mb-4">
        <label for="language" class="block text-sm font-medium">Выберите язык</label>
        <select
            id="language"
            v-model="currentCodeLanguage"
            class="mt-1 block w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="plaintext">Выберите язык</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      <MonacoEditor
          v-model="code"
          :options="editorOptions"
          :lang="currentCodeLanguage"
          class="h-96 border border-gray-300 dark:border-gray-600 rounded"
      />
    </section>

    <section class="bg-white dark:bg-gray-700 p-4 rounded shadow">
      <h2 class="text-lg font-semibold">Результат выполнения</h2>
      <div
          class="mt-2 p-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded h-32 overflow-auto"
      >
        Результаты появятся здесь...
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type * as monaco from 'monaco-editor';

type CodeLanguage = 'plaintext' | 'python' | 'javascript';

const isDarkTheme = ref(false);
const code = ref('// Напишите обычный текст');
const currentCodeLanguage = ref<CodeLanguage>('plaintext');

const editorOptions = ref<monaco.editor.IStandaloneEditorConstructionOptions>({
  automaticLayout: true,
  renderLineHighlight: 'all',
  theme: getCurrentTheme(),
});

function getCurrentTheme(): string {
  return isDarkTheme.value ? 'vs-dark' : 'vs-light';
}

function changeTheme(): void {
  isDarkTheme.value = !isDarkTheme.value;
  editorOptions.value = {
    ...editorOptions.value,
    theme: getCurrentTheme(),
  };
}

const defaultCodeSamples: Record<CodeLanguage, string> = {
  plaintext: '// Напишите обычный текст',
  javascript: "// Напишите JavaScript код",
  python: "Напишите Python код",
};

watch(currentCodeLanguage, (newLanguage) => {
  code.value = defaultCodeSamples[newLanguage] || defaultCodeSamples.plaintext;
});
</script>

<style scoped>
.h-96 {
  height: 24rem;
}

body.dark {
  background-color: #1f2937;
  color: #e5e7eb;
}
</style>