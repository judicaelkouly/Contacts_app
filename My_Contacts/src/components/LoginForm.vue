<script>
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      errorMessage: null,
      // Nouvelle variable pour contrôler la visibilité du mot de passe
      showPassword: false,
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        await this.userStore.signIn(this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error);
        this.errorMessage = "Identifiants incorrects ou problème de connexion.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-white">
    <div class="w-full flex items-center justify-center">
      <div class="w-3/4 max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl text-center font-bold text-blue-600 mb-6">Welcome Back</h2>

        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="email"
              :disabled="isLoading"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm mb-2">Password</label>
            <div class="relative w-full">
              <input
                :type="showPassword ? 'text' : 'password'"
                name="password"
                placeholder="Enter your password"
                class="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="password"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                :disabled="isLoading"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none disabled:opacity-50"
                :title="showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'"
              >
                <svg v-if="!showPassword" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 1.253 0 2.432.228 3.54.646M13.875 18.825L10.05 15M10.05 15a3 3 0 014.242-4.242M13.875 18.825L17.25 22.25M10.05 15L6.75 11.75M12 9a3 3 0 116 0 3 3 0 01-6 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 2l20 20" />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connexion en cours...
            </span>
            <span v-else>Se connecter</span>
          </button>
        </form>

        <p class="mt-6 text-sm text-center text-gray-600">
          Pas de compte?
          <a href="/register" class="text-blue-600 hover:underline">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
