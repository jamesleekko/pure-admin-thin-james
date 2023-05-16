import { defineStore } from "pinia";
import { store } from "@/store";
import { cateType } from "./types";

export const useArticleStore = defineStore({
  id: "article",
  state: (): cateType => ({
    categories: []
  }),
  getters: {
    getCategories() {
      return this.categories;
    }
  },
  actions: {
    SET_CATEGORIES(data) {
      this.categories = data;
    }
  }
});

export function useArticleStoreHook() {
  return useArticleStore(store);
}
