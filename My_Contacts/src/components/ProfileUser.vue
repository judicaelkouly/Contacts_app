<script setup>
import { onMounted as vueOnMounted } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const store = useUserStore();
const router = useRouter();

// Fonction de déconnexion
const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/");
};

vueOnMounted(() => {
  store.fetchUser();
});
</script>

<template>

  <div class="card-container max-w-lg mx-auto mt-24 bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">

    <button
      @click="handleLogout"
      class="pro cursor-pointer border-0 flex items-center justify-center transition-opacity hover:opacity-90"
      title="Se déconnecter"
    >
      <Icon icon="mdi-light:logout" class="w-6 h-6" />
    </button>

    <img class="round" src="/src/img/prof.jpeg" alt="user" width="150" height="150"/>

    <h3>{{ store.user?.name || 'Utilisateur' }}</h3>
    <p class="email-text">{{ store.user?.email || 'Email non disponible' }}</p>

    <div class="buttons mt-6 flex gap-2">

      <RouterLink to="/contacts" class="primary">
        Mes Contacts
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
  box-sizing: border-box;
}

h3 {
  margin: 15px 0 5px 0;
  color: #FFFFFF;
  font-family: Montserrat, sans-serif;
  font-size: 24px;
}

p.email-text {
  font-size: 14px;
  color: #B3B8CD;
  margin-bottom: 20px;
}

.card-container {
  background-color: #231E39;
  border-radius: 15px;
  box-shadow: 0px 10px 20px -10px rgba(0,0,0,0.75);
  position: relative;
  width: 350px;
  max-width: 100%;
  text-align: center;
}

.card-container .pro {
  color: #231E39;
  background-color: #03BFCB;
  border-radius: 50%;
  padding: 8px;
  position: absolute;
  top: 20px;
  right: 20px;
}

.card-container .round {
  border: 3px solid #03BFCB;
  border-radius: 50%;
  padding: 5px;

}

a.primary {
  background-color: #03BFCB;
  border: 1px solid #03BFCB;
  border-radius: 30px;
  color: #231E39;
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  text-decoration: none;
  padding: 12px 30px;
  transition: all 0.2s ease;
}

a.primary:hover {
  background-color: transparent;
  color: #03BFCB;
}
</style>
