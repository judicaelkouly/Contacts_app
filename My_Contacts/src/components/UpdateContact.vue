<template>
  <div class="mx-auto min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-xl w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">

      <div>
        <h3 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Modifier un contact
        </h3>
      </div>

      <div v-if="fetchingData" class="text-center py-6 text-gray-500 dark:text-gray-400">
        Chargement des informations du contact...
      </div>

      <form v-else class="space-y-6" @submit.prevent="updateContact">

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="firstname">
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              required
              class="block w-full px-4 py-2.5 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="First Name"
              v-model.trim="data.firstname"
              :disabled="loading"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="lastname">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              required
              class="block w-full px-4 py-2.5 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Last Name"
              v-model.trim="data.lastname"
              :disabled="loading"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            class="block w-full px-4 py-2.5 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Email"
            v-model.trim="data.email"
            :disabled="loading"
          />
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="phone">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              required
              class="block w-full px-4 py-2.5 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="+225 0505050505"
              v-model.trim="data.phone"
              :disabled="loading"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="gender">
              Gender
            </label>
            <select
              id="gender"
              class="block w-full px-4 py-2.5 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
              v-model="data.gender"
              :disabled="loading"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div class="pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Enregistrement en cours...</span>
            <span v-else>Enregistrer le contact</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const fetchingData = ref(false)

const data = ref({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    gender: ''
})

const BASE_URL = 'https://api-contact.zoul.dev/api/contacts'

onMounted(async () => {
    fetchingData.value = true
    const token = localStorage.getItem('token')

    if (!token) {
        alert("Session expirée, veuillez vous reconnecter.")
        router.push('/login')
        return
    }

    try {
        const response = await axios.get(`${BASE_URL}/${route.params._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        
        if (response.data) {
            data.value = {
                firstname: response.data.firstname || '',
                lastname: response.data.lastname || '',
                phone: response.data.phone || '',
                email: response.data.email || '',
                gender: response.data.gender || ''
            }
        }
    } catch (err) {
        console.error('Erreur lors de la récupération du contact:', err)
        alert("Impossible de charger les détails du contact.")
    } finally {
        fetchingData.value = false
    }
})


const updateContact = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    loading.value = true
    try {
        await axios.put(`${BASE_URL}/${route.params._id}`,
            {
                firstname: data.value.firstname,
                lastname: data.value.lastname,
                phone: data.value.phone,
                email: data.value.email,
                gender: data.value.gender,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )

        alert('Contact modifié avec succès !')
        router.push('/contacts')
    } catch (err) {
        console.error('Erreur lors de la modification:', err)
        alert("Erreur lors de la modification du contact.")
    } finally {
        loading.value = false
    }
}
</script>
