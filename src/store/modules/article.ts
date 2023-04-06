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
      // eslint-disable-next-line no-prototype-builtins
      this.categories = data;
    }
  }
});

export function useArticleStoreHook() {
  return useArticleStore(store);
}
