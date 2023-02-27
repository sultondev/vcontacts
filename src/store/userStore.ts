import { ref } from "vue";
import { defineStore } from "pinia";
import { authProtectedApi } from "@/config/axios.config";
import { UserSelfResponse } from "@/typing/types/fetchResponses";
export const useUserStore = defineStore("userStore", () => {
  const user: any = ref(null);

  async function checkAuth() {
    authProtectedApi
      .get("/users/me")
      .then((response: UserSelfResponse) => {
        if (response.status === 200) {
          user.value = response.data;
        }
      })
      .catch(() => {
        user.value = null;
      });
  }
  return { user, checkAuth };
});
