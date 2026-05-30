import { create } from "zustand";
import { getCategories } from "@/actions/category";

interface CategoryState {
  categories: ICategory[] | null;
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  // Estados iniciais
  categories: [],
  isLoading: false,

  // Ação assíncrona para buscar as categorias (substitui o useEffect antigo)
  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const cat = await getCategories();
      set({ categories: cat, isLoading: false });
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      set({ isLoading: false });
    }
  },
}));
