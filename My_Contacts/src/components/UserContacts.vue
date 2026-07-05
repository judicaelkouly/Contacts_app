<template>
  <header>
    <nav class="bg-gray-950 border-b border-gray-800 py-4 px-6 flex justify-between items-center relative z-50">
      <div>
        <RouterLink to="/dashboard">
          <button class="bg-gray-900 border border-gray-800 text-gray-300 rounded-xl px-4 py-2 text-sm hover:bg-gray-800 hover:text-white transition-all shadow-md">
            Retour
          </button>
        </RouterLink>
      </div>

      <h2 class="text-xl font-bold text-white tracking-wide">
        Mes Contacts
      </h2>

      <div>
        <RouterLink to="/addcontacts">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all shadow-sm flex items-center gap-1">
            ＋ Ajouter
          </button>
        </RouterLink>
      </div>
    </nav>
  </header>

  <main class="max-w-6xl mx-auto py-10 px-4 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Tous mes contacts ({{ filteredContacts.length }})
      </h1>

      <div class="relative w-full md:max-w-xs">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model.trim="searchQuery"
          type="search"
          class="block p-2.5 pl-10 w-full text-sm text-gray-200 bg-gray-900 rounded-xl border border-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-500"
          placeholder="Rechercher par nom..."
        />
      </div>
    </div>

    <div v-if="filteredContacts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="contact in filteredContacts"
        :key="contact._id || contact.id"
        class="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl hover:border-indigo-500/50 transition-all duration-200"
      >
        <div>
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 font-bold uppercase">
              {{ contact.firstname[0] }}{{ contact.lastname[0] }}
            </div>
            <div>
              <h2 class="text-base font-semibold text-white capitalize">
                {{ contact.firstname }} {{ contact.lastname }}
              </h2>
              <span class="text-xs text-gray-500 capitalize">{{ contact.gender || 'Non spécifié' }}</span>
            </div>
          </div>

          <div class="space-y-1 text-sm text-gray-400 mb-6 pl-1">
            <p class="flex items-center gap-2">📧 {{ contact.email }}</p>
            <p class="flex items-center gap-2">📞 {{ contact.phone }}</p>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-gray-800">
          <RouterLink :to="`/update/${contact._id}`" class="flex-1">
            <button type="button" class="w-full text-center text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 py-2 px-3 rounded-xl transition font-medium">
              Modifier
            </button>
          </RouterLink>
          <button
            type="button"
            class="text-xs bg-red-950/40 hover:bg-red-900/60 text-red-400 py-2 px-3 rounded-xl transition font-medium border border-red-900/30"
            @click="deleteContact(contact._id)"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 bg-gray-900/50 border border-dashed border-gray-800 rounded-2xl">
      <p class="text-gray-500 text-sm">Aucun contact trouvé.</p>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useContactStore } from "../stores/contact"

const store = useContactStore()
const searchQuery = ref("")

onMounted(() => {
  store.fetchContact()
})

// Logique de recherche réactive (Computed)
const filteredContacts = computed(() => {
  const contacts = store.contact || []
  if (!searchQuery.value) return contacts

  const query = searchQuery.value.toLowerCase()
  return contacts.filter(c =>
    c.firstname?.toLowerCase().includes(query) ||
    c.lastname?.toLowerCase().includes(query)
  )
})

const deleteContact = async (id) => {
  if (confirm("Voulez-vous vraiment supprimer ce contact ?")) {
    try {
      
      await store.deleteContact(id)
    } catch (error) {
      console.error("Erreur lors de la suppression :", error)
    }
  }
}
</script>
