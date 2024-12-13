<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <section class="mb-6 bg-white p-4 rounded shadow">
      <h1 class="text-xl font-bold text-gray-800">Онлайн редактор кода</h1>
      <p class="mt-2 text-gray-600">Здесь вы можете писать код на выбранном вами языке программирования и отображать результат выполнения.</p>
    </section>

    <section class="mb-6 bg-white p-4 rounded shadow">
      <div class="mb-4">
        <label for="language" class="block text-sm font-medium text-gray-700">Выберите язык</label>
        <select
            id="language"
            class="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div class="mb-4">
      </div>

      <button class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Запустить код
      </button>
    </section>

    <section class="bg-white p-4 rounded shadow">
      <h2 class="text-lg font-semibold text-gray-700">Результат выполнения</h2>
      <div class="mt-2 p-2 border border-gray-300 bg-gray-50 rounded h-32 overflow-auto">
        Результаты появятся здесь...
      </div>
    </section>
  </div>
</template>