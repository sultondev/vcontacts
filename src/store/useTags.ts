import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { authProtectedApi } from "@/config/axios.config";
import { TagsDataType } from "@/typing/types/tags";
export const useTagsStore = defineStore("useTagsStore", () => {
  const tags: Ref<TagsDataType[] | [] | any> = ref([]);
  function initialize() {
    authProtectedApi.get("/tags").then((response: any) => {
      if (response.status === 200) {
        tags.value = response.data;
      }
    });
  }
  return { tags, initialize };
});
