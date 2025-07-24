import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface IHandlebar {
  onOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useHandler = create<IHandlebar>()(
  persist(
    (set) => ({
      onOpen: true,
      open: () => set({onOpen: true}),
      close: () => set({onOpen: false}),
    }),
    {
      name: "handhunter",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
