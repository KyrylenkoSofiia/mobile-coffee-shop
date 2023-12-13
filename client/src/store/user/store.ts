import { create } from 'zustand';
import { type productItem } from '../products/store';

interface userData {
  userName: string;
  mail: string;
  avatar: string;
  orders: productItem[];
  favorite: productItem[];
  isAdmin: boolean;
}
interface userStore extends userData {
  updateUserData: (userData: userData) => void;
  removeFromFavorite: (id: string) => void
}
const useUserStore = create<userStore>((set) => ({
  userName: '',
  mail: '',
  avatar: '',
  orders: [],
  favorite: [],
  isAdmin: false,
  updateUserData: (userData: userData) => {
    set({
      ...userData,
    });
  },
  removeFromFavorite: (id: string) => {
    set((state) => ({
      favorite: state.favorite.filter((favorite) => favorite._id !== id)
    }))
  }
}));

export default useUserStore;
