<template>

  <header>
    <nav class="fixed top-0 left-0 w-full h-20 bg-blue-600 border-b border-blue-500 shadow-md z-50 transition-all">
      <div class="container mx-auto flex justify-between items-center h-full px-6">


        <RouterLink to="/" class="flex items-center">
          <img src="/src/img/logo.jpeg" alt="Logo" class="h-12 w-auto rounded-full object-cover shadow-sm" />
        </RouterLink>



        <div class="hidden lg:flex items-center gap-4">
          <RouterLink to="/login" class="rounded-2xl bg-blue-900 px-5 py-2.5 font-bold text-sm text-white hover:bg-blue-950 transition-all shadow-sm">
            SE CONNECTER
          </RouterLink>
          <RouterLink to="/register" class="rounded-2xl bg-orange-500 px-5 py-2.5 font-bold text-sm text-white hover:bg-orange-600 transition-all shadow-sm">
            S'INSCRIRE 
          </RouterLink>
        </div>


        <div class="flex items-center lg:hidden">
          <button
            @click="isMenuOpen = !isMenuOpen"
            type="button"
            class="relative inline-flex items-center justify-center rounded-xl p-2 text-white hover:bg-blue-700 focus:outline-none transition-colors"
            aria-label="Menu principal"
          >
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>

      <!-- MOBILE MENU -->
      <div
        v-if="isMenuOpen"
        class="absolute top-20 left-0 right-0 mx-4 mt-2 bg-blue-700/95 backdrop-blur-md border border-blue-500 rounded-2xl p-5 flex flex-col gap-3 shadow-xl lg:hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200"
      >

        <div class="w-full h-[1px] bg-blue-500 my-1"></div>
        <RouterLink to="/login" @click="isMenuOpen = false" class="block text-center rounded-xl bg-blue-900 px-4 py-3 font-bold text-white hover:bg-blue-950 transition-colors">
          Se connecter
        </RouterLink>
        <RouterLink to="/register" @click="isMenuOpen = false" class="block text-center rounded-xl bg-orange-500 px-4 py-3 font-bold text-white hover:bg-orange-600 transition-colors">
          S'inscrire
        </RouterLink>
      </div>
    </nav>
  </header>

  <main class="pt-20">

    <section class="relative z-10 overflow-hidden bg-blue-900 md:py-36 py-20 px-6 max-w-7xl mx-auto md:my-8 md:rounded-3xl shadow-xl">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-center text-center">
          <div class="w-full lg:w-4/5 px-4">
            <h1 class="mt-0 mb-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-white tracking-tight">
              Tout votre réseau au même <span class="text-orange-400">endroit.</span>
            </h1>
            <p class="max-w-2xl mx-auto text-base font-normal leading-relaxed sm:text-lg text-blue-100 mb-8">
              Fini les numéros perdus, les carnets éparpillés et les répertoires saturés.
              Centralisez, gérez et retrouvez n'importe quel contact en un clic.
              Une solution ultra-rapide, hautement sécurisée et accessible où que vous soyez.
            </p>
            <RouterLink to="/register" class="inline-block rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white hover:bg-orange-600 transition-all shadow-md transform hover:-translate-y-0.5 tracking-wide">
              CRÉER MON CARNET GRATUIT
            </RouterLink>
          </div>
        </div>
      </div>

      <span class="absolute top-0 right-0 -z-10 pointer-events-none opacity-20">
        <svg width="388" height="250" viewBox="0 0 388 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M203 -28.5L4.87819e-05 250.5L881.5 250.5L881.5 -28.5002L203 -28.5Z" fill="url(#paint0_linear)"></path>
          <defs>
            <linearGradient id="paint0_linear" x1="60.5" y1="111" x2="287" y2="111" gradientUnits="userSpaceOnUse">
              <stop offset="0.520507" stop-color="white"></stop>
              <stop offset="1" stop-color="white" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
      </span>
    </section>

    <section class="max-w-4xl px-4 py-20 mx-auto sm:px-6 lg:px-8">
      <div class="relative overflow-hidden bg-white shadow-xl rounded-3xl border border-slate-100">
        <div class="relative z-10 p-8 text-center md:p-16">
          <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-blue-900 sm:text-4xl">
            Vos contacts. Sans le chaos.
          </h2>

          <p class="text-slate-600 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Bâtissez votre carnet d'adresses moderne. Ajoutez, catégorisez ou recherchez vos relations en une fraction de seconde, depuis votre mobile, tablette ou ordinateur. Votre quotidien, enfin simplifié.
          </p>
          <RouterLink to="/register" class="inline-block rounded-2xl bg-orange-500 px-8 py-3.5 font-bold text-white hover:bg-orange-600 transition-all shadow-md">
            COMMENCER MAINTENANT
          </RouterLink>
        </div>
      </div>
    </section>

  </main>

  <FooterPage />
</template>

<script setup>
import { ref } from 'vue'
import FooterPage from './FooterPage.vue'

const isMenuOpen = ref(false)
</script>
