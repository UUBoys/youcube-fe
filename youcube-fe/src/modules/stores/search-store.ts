import { create } from "zustand";

type SearchStore = {
  search: string;
  setSearch: (search: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
}));
