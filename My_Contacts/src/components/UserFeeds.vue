<template>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

      <div class="py-12 bg-white">
        <h1 class="text-center text-3xl font-bold capitalize text-gray-900 lg:text-4xl">
          All Contacts
          <span v-if="!loading" class="text-xl font-medium text-gray-500 ml-2">
            ({{ filteredContacts.length }} disponibles)
          </span>
        </h1>

        <div class="max-w-md mx-auto mt-6 px-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model.trim="searchQuery"
              type="search"
              class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-200 rounded-xl bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
              placeholder="Rechercher un contact par son nom..."
            />
          </div>
        </div>

        <div class="mx-auto mt-6 flex justify-center">
          <span class="inline-block h-1 w-1 rounded-full bg-red-700"></span>
          <span class="mx-1 inline-block h-1 w-3 rounded-full bg-red-700"></span>
          <span class="inline-block h-1 w-40 rounded-full bg-red-700"></span>
          <span class="mx-1 inline-block h-1 w-3 rounded-full bg-red-700"></span>
          <span class="inline-block h-1 w-1 rounded-full bg-red-700"></span>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto p-4">

        <div v-if="loading" class="col-span-full flex justify-center items-center py-10">
          <svg class="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <div
          v-else
          v-for="contact in filteredContacts"
          :key="contact.id || contact._id"
          class="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden"
        >
          <div class="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90 "></div>

          <div class="relative pt-6 px-4 pb-3 flex flex-col items-center">
            <div class="relative z-10 p-0.5 bg-white rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img class="h-16 w-16 rounded-full object-cover" src="/src/img/logo.jpeg" :alt="contact.firstname" />
              <span
                class="absolute bottom-0 right-0 h-4 w-4 rounded-full text-white flex items-center justify-center shadow-sm text-[10px]"
                :class="contact.gender === 'Male' || contact.gender === 'Homme' ? 'bg-blue-500' : 'bg-pink-500'"
              >
                <Icon :icon="contact.gender === 'Male' || contact.gender === 'Homme' ? 'bi:gender-male' : 'bi:gender-female'" class="w-2.5 h-2.5" />
              </span>
            </div>

            <h3 class="mt-2 text-base font-bold text-gray-800 tracking-wide text-center truncate w-full">
              {{ contact.firstname }} {{ contact.lastname }}
            </h3>

            <div class="w-8 h-0.5 bg-indigo-500 rounded mt-1.5 mb-3 group-hover:w-14 transition-all duration-300"></div>

            <div class="w-full space-y-1">
              <a :href="'mailto:' + contact.email" class="flex items-center gap-2.5 px-2 py-1 rounded-lg text-gray-600  hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group/link">
                <div class="text-indigo-500 p-1 bg-indigo-50  rounded-md">
                  <Icon icon="mdi-light:email-open" class="w-4 h-4" />
                </div>
                <p class="text-xs font-medium truncate flex-1">{{ contact.email }}</p>
              </a>

              <a :href="'tel:' + contact.phone" class="flex items-center gap-2.5 px-2 py-1 rounded-lg text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group/link">
                <div class="text-emerald-500 p-1 bg-emerald-50 dark:bg-emerald-950/50 rounded-md">
                  <Icon icon="line-md:phone" class="w-4 h-4" />
                </div>
                <p class="text-xs font-medium truncate">{{ contact.phone }}</p>
              </a>

              <div class="flex items-center gap-2.5 px-2 py-1 rounded-lg text-gray-500">
                <div class="text-amber-500 p-1 bg-amber-50 rounded-md">
                  <Icon icon="streamline-ultimate:gender-hetero-bold" class="w-4 h-4" />
                </div>
                <p class="text-xs font-medium truncate">{{ contact.gender }}</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div v-if="!loading && filteredContacts.length === 0" class="col-span-full text-center py-12 text-gray-400">
          Aucun contact ne correspond à votre recherche.
        </div>

      </div>

  </main>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const contacts = ref([])
const loading = ref(false)
const searchQuery = ref("")

const filteredContacts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  if (!query) {
    return contacts.value
  }

  return contacts.value.filter(contact => {
    const firstName = contact.firstname?.toLowerCase() || ""
    const lastName = contact.lastname?.toLowerCase() || ""
    return firstName.includes(query) || lastName.includes(query)
  })
})

onMounted(async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://api-contact.zoul.dev/api/contacts?page=1&perPage=1000&order=desc&orderBy=desc', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    contacts.value = response.data.data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  } finally {
    loading.value = false
  }
})
</script>
