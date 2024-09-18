<template>
  <nav class="flex justify-center items-center space-x-8 p-4 border-b-2 border-black bg-white">
    <RouterLink 
      to="/" 
      class="text-black px-4 py-2 transition-all  hover:text-gray-700"
      :class="{ 'font-bold text-gray-800': $route.path === '/' }"
    >
      Home
    </RouterLink>
    <RouterLink 
      to="/game" 
      class="text-black px-4 py-2 transition-all  hover:text-gray-700"
      :class="{ 'font-bold text-gray-800': $route.path === '/game' }"
    >
      Game
    </RouterLink>
    <RouterLink 
      to="/about" 
      class="text-black px-4 py-2 transition-all  hover:text-gray-700"
      :class="{ 'font-bold text-gray-800': $route.path === '/about' }"
    >
      About
    </RouterLink>
  </nav>
</template>
