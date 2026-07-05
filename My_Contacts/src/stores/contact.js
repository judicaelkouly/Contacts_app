import { defineStore } from "pinia";
import axios from "axios";
export const useContactStore = defineStore("contact", {
  state: () => ({
    contact: [],
  }),

  actions: {

        async fetchContact() {
        const token  = localStorage.getItem('token');
        try {

         const res = await fetch("https://api-contact.zoul.dev/api/contacts/me?page=1&perPage=100&order=desc&orderBy=desc",{

           headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
         });
         const data = await res.json();
         this.contact =  data.data

        } catch (error) {
        console.error('Erreur: ', error)
        }
    },

    async deleteContact(_id) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`https://api-contact.zoul.dev/api/contacts/${_id}
`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
         await this.fetchContact();
         alert('Contact supprimé')
  }catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  }
});
