import { defineStore } from "pinia";
import { store } from "@/store";
import { imageType } from "./types";

export const useImageStore = defineStore({
  id: "image",
  state: (): imageType => ({
    imageTypes: []
  }),
  getters: {
    getImageTypes() {
      return this.imageTypes;
    }
  },
  actions: {
    SET_IMAGETYPES(data) {
      this.imageTypes = data;
    }
  }
});

export function useImageStoreHook() {
  return useImageStore(store);
}
