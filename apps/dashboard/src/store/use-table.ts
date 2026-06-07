import { create } from "zustand";

interface RestaurantStore {
  // Mesas
  mesas: IMesa[];
  atualizarMesa: (id: string, data: Partial<IMesa>) => void;
}

const mesasIniciais: IMesa[] = Array.from({ length: 8 }, (_, i) => ({
  id: `mesa-${i + 1}`,
  number: i + 1,
  capacity: i < 8 ? 2 : i < 16 ? 4 : 6,
  status: i % 5 === 0 ? "ocupada" : i % 7 === 0 ? "reservada" : "disponivel",
}));

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  // Mesas
  mesas: mesasIniciais,
  atualizarMesa: (id, data) =>
    set((state) => ({
      mesas: state.mesas.map((m) => (m.id === id ? { ...m, ...data } : m)),
    })),
}));
