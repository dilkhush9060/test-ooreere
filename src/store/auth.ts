import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";

interface User {
  picture: string | undefined;
  id: string;
  name: string;
  role: string;
}

const initialState = {
  status: false,
  user: {
    id: "",
    name: "",
    role: "",
    picture: "",
  },
};

interface AuthStore {
  auth: {
    user: User;
    status: boolean;
  };
  login: (user: User) => void;
  logout: () => void;
  updateUserPicture: (picture: string) => void;
}

export const AuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        auth: initialState,
        login: (user) => set({auth: {user, status: true}}),
        logout: () => set({auth: initialState}),
        updateUserPicture: (picture) => {
          const currentState = get();
          set({
            auth: {
              status: currentState.auth.status,
              user: {
                ...currentState.auth.user,
                picture: picture,
              },
            },
          });

          // console.log("Updated state:", get()); // Debug log
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
