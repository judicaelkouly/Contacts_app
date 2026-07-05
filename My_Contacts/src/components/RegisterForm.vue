<script>
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      errorMessage: "",
      // Toujours les mêmes variables pour contrôler la visibilité
      showPassword: false,
      showConfirmPassword: false
    };
  },
  methods: {
    async register() {
      this.errorMessage = "";

      if (this.password !== this.confirm_password) {
        this.errorMessage = "Les mots de passe ne correspondent pas.";
        return;
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

      if (!passwordPattern.test(this.password)) {
        this.errorMessage = "Le mot de passe ne respecte pas les critères de sécurité ou le format requis.";
        return;
      }

      try {
        await this.userStore.signUp(this.name, this.email, this.password, this.confirm_password);
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.message || "Une erreur est survenue lors de l'inscription.";
      }
    },
  },
};
</script>

<template>
  <div class="max-w-lg mx-auto bg-white mt-25 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
    <h1 class="text-xl font-bold text-blue-600 text-center mb-8">Welcome to My Contacts App</h1>

    <div v-if="errorMessage" class="w-full mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-200 dark:text-red-800">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="register" method="post" class="w-full flex flex-col gap-4">
      <div class="flex items-start flex-col justify-start">
        <label for="Name" class="text-sm mr-2">Name:</label>
        <input type="text" id="Name" name="name" class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" v-model="name" required>
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="email" class="text-sm mr-2">Email:</label>
        <input type="email" id="email" name="email" class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" v-model="email" required>
      </div>

      <div class="flex items-start flex-col justify-start w-full">
        <label for="password" class="text-sm mr-2">Password:</label>
        <div class="relative w-full">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            name="password"
            class="w-full px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            v-model="password"
            required
          >
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
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
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
          Le mot de passe doit faire au moins 8 caractères, inclure une majuscule, une minuscule, un chiffre et un caractère spécial. (ex: <span class="italic font-mono text-blue-500">Secur1te!S0|42</span>).
        </p>
      </div>

      <div class="flex items-start flex-col justify-start w-full">
        <label for="confirmPassword" class="text-sm mr-2">Confirm Password:</label>
        <div class="relative w-full">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirmPassword"
            name="confirmPassword"
            class="w-full px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            v-model="confirm_password"
            required
          >
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
            :title="showConfirmPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'"
          >
            <svg v-if="!showConfirmPassword" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors mt-2">
        S'inscrire
      </button>
    </form>

    <div class="mt-4 text-center">
      <span class="text-sm text-gray-500">Déjà un compte ? </span>
      <a href="/login" class="text-blue-500 hover:text-blue-600">Se connecter</a>
    </div>
  </div>
</template>
