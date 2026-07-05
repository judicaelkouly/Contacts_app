<template>
  <nav class="sticky top-0 z-50 bg-gray-200/50 backdrop-blur-md border-b border-zinc-100 md:rounded-full px-6 md:px-12 lg:px-24 xl:px-40 py-4 flex items-center justify-between transition-all">
    <div class="flex items-center gap-2">
      <a href="/" class="">
               <img src="/src/img/logo.jpeg" alt="Your Company" class="h-13 w-auto rounded-full" />
            </a>
      <span class="text-2xl font-bold text-zinc-800 tracking-tight">MyContacts</span>
    </div>

    <div class="hidden md:flex items-center bg-zinc-50 border border-zinc-200 rounded-full px-1 py-1 gap-2">
      <RouterLink to="/" class="px-4 py-1.5 rounded-full text-sm bg-white border border-zinc-200 font-medium text-zinc-800 transition-all">Accueil</RouterLink>
      <RouterLink to="/dashboard" class="px-4 py-1.5 rounded-full text-sm text-zinc-500 hover:text-zinc-800 transition-all">Tableau de bord</RouterLink>
      <a href="#about" class="px-4 py-1.5 rounded-full text-sm text-zinc-500 hover:text-zinc-800 transition-all">À propos</a>
    </div>

    <RouterLink to="/profile" class="hidden md:flex items-center gap-2.5 bg-gradient-to-r from-zinc-950 to-zinc-600 text-zinc-50 hover:opacity-90 text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer border-0 transition-all shadow-sm">
        Mon Profil
        <span class="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#3f3f47" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
    </RouterLink>

    <button
      @click="toggleMenu"
      aria-label="Menu principal"
      class="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1 focus:outline-none z-50"
    >
      <span class="block w-6 h-0.5 bg-zinc-800 transition-all duration-300" :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
      <span class="block w-6 h-0.5 bg-zinc-800 transition-all duration-300" :class="{ 'opacity-0': isMenuOpen }"></span>
      <span class="block w-6 h-0.5 bg-zinc-800 transition-all duration-300" :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
    </button>

    <div
      v-if="isMenuOpen"
      class="fixed top-[73px] left-0 right-0 mx-4 bg-white/95 backdrop-blur-md border border-zinc-200 rounded-2xl flex flex-col p-5 gap-1 md:hidden shadow-xl z-40 transition-all duration-200"
    >
        <RouterLink to="/dashboard" @click="isMenuOpen = false" class="block px-4 py-2.5 rounded-lg text-sm bg-zinc-50 font-medium text-zinc-800">Accueil</RouterLink>
        <RouterLink to="/dashboard" @click="isMenuOpen = false" class="block px-4 py-2.5 rounded-lg text-sm text-zinc-500 hover:bg-zinc-50">Tableau de bord</RouterLink>
        <a href="#about" @click="isMenuOpen = false" class="block px-4 py-2.5 rounded-lg text-sm text-zinc-500 hover:bg-zinc-50">À propos</a>

        <RouterLink to="/profile" @click="isMenuOpen = false" class="flex items-center justify-center gap-2.5 bg-gradient-to-r from-zinc-950 to-zinc-600 text-zinc-50 text-sm font-medium px-5 py-2.5 rounded-full mt-3 w-full shadow-md">
            Mon Profil
            <span class="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#3f3f47" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
        </RouterLink>
    </div>
  </nav>

  <main class="pt-4">
    <UserFeeds />
  </main>

  <footer id="about">
    <FooterPage />
  </footer>
</template>

<script setup>
import { ref } from 'vue'

import FooterPage from './FooterPage.vue'
import UserFeeds from './UserFeeds.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght=100..900&display=swap');

nav, main, footer {
    font-family: "Geist", sans-serif;
}
</style>
