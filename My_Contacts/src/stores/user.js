import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: '',
  }),


  actions: {

      async fetchUser() {
        const token  = localStorage.getItem('token');
        try {

         const res = await fetch("https://api-contact.zoul.dev/api/users/me",{

           headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
         });
         this.user = await res.json();

        } catch (error) {
        console.error('Erreur: ', error)
        }
    },


    async updateUser(name, email, password) {
        const token  = localStorage.getItem('token');
        try {

         const res = await fetch("https://api-contact.zoul.dev/api/users/me",{
           method: "PUT",
           headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
       body: JSON.stringify({ name, email, password }),
         });
         this.user = await res.json();

        } catch (error) {
        console.error('Erreur: ', error)
        }
    },

    async updatePassword(password, new_password, confirm_password) {
        const token  = localStorage.getItem('token');
        try {

         const res = await fetch("https://api-contact.zoul.dev/api/users/me/password",{
           method: "PUT",
           headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
       body: JSON.stringify({ password, new_password, confirm_password }),
         });
         this.passwordUpdated = await res.json();

        } catch (error) {
        console.error('Erreur: ', error)
        }
    },

      async signUp(name,email, password, confirm_password ) {
      const res = await fetch("https://api-contact.zoul.dev/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({ name, email, password , confirm_password}),
      });
      const user = await res.data
      this.user = user;
    },

      async signIn(email, password) {
      const res = await fetch('https://api-contact.zoul.dev/api/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),

      });
      const data = await res.json();

      // const user = await res.json();
      //  localStorage.setItem('token', user.token);
      // this.user = user;
      if (res.ok && data.token) {
    localStorage.setItem('token', data.token);
    this.user = data;
  } else {
    throw new Error(data.message || 'Login failed');
  }
    },

  }

})
