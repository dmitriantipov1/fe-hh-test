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
    <div class="flex items-center gap-3 mb-4">
      <button
          @click="runCode"
          :disabled="!canRunCode || isLoading"
          class="px-4 py-2 rounded bg-green-500 text-white font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span v-if="!isLoading">Run</span>
        <span v-else>Running...</span>
      </button>

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

    <div class="mt-4 p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded">
      <h2 class="text-lg font-semibold mb-2">Результат выполнения</h2>
      <p v-if="result && !result.startsWith('Error:')" class="text-sm text-green-600">{{ result }}</p>
      <p v-else-if="result && result.startsWith('Error:')" class="text-sm text-red-600">{{ result }}</p>
      <p v-else-if="isLoading" class="text-sm text-gray-600">Загрузка...</p>
      <p v-else class="text-sm text-gray-500">Результаты появятся здесь...</p>
    </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type * as monaco from 'monaco-editor';

type CodeLanguage = 'plaintext' | 'python' | 'javascript';

const isDarkTheme = ref(false);
const currentCodeLanguage = ref<CodeLanguage>('plaintext');
const code = ref('');
const result = ref<string | null>(null);
const isLoading = ref(false);

const editorOptions = ref<monaco.editor.IStandaloneEditorConstructionOptions>({
  automaticLayout: true,
  renderLineHighlight: 'all',
  theme: getCurrentTheme(),
});

const defaultCodeSamples: Record<CodeLanguage, string> = {
  plaintext: '',
  javascript: "console.log('Hello, JavaScript!');",
  python: "print('Hello, Python!')",
};

const canRunCode = computed(() => {
  return currentCodeLanguage.value !== 'plaintext' && code.value.trim().length > 0;
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

watch(currentCodeLanguage, (newLanguage) => {
  code.value = defaultCodeSamples[newLanguage] || '';
});

async function sendCodeToServer(language: CodeLanguage, code: string): Promise<{ status: string; output?: string; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (language === 'javascript') {
        try {
          // Проверяем синтаксис JavaScript-кода
          new Function(code);
          resolve({
            status: 'success',
            output: 'Hello, world!\n',
          });
        } catch (e) {
          resolve({
            status: 'error',
            error: e.message || 'Syntax error in JavaScript code',
          });
        }
      } else if (language === 'python') {
        if (code.includes('print') && code.includes('(') && code.includes(')')) {
          resolve({
            status: 'success',
            output: 'Hello, world!\n',
          });
        } else {
          resolve({
            status: 'error',
            error: 'SyntaxError: Invalid syntax in Python code',
          });
        }
      } else {
        resolve({
          status: 'error',
          error: 'Unsupported language or empty code',
        });
      }
    }, 2000);
  });
}

async function runCode(): Promise<void> {
  if (!canRunCode.value) return;

  isLoading.value = true;
  result.value = null;

  try {
    const response = await sendCodeToServer(currentCodeLanguage.value, code.value);
    if (response.status === 'success') {
      result.value = response.output || 'Execution completed with no output.';
    } else if (response.status === 'error') {
      result.value = `Error: ${response.error}`;
    }
  } catch (error) {
    result.value = 'Error: Failed to connect to server';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.h-96 {
  height: 24rem;
}
</style>