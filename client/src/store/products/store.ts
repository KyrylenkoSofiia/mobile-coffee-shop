import { create } from 'zustand';

export interface productItem {
  _id: string;
  title: string;
  description: string;
  stars: number;
  starsCount: number;
  price: number;
  picture: string;
  fullDescription: string;
  availableSizes: string[];
  createdAt: string
}

export const categories = ['Popular', 'Unpopular', '↑', '↓'];

interface productStore {
  products: productItem[];
  updateProductData: (productData: productItem[]) => void;
  addProduct: (productData: productItem) => void;
  sortBy: (category: string) => void;
  removeProduct: (id: string) => void
}

const useProductStore = create<productStore>((set) => ({
  products: [],
  updateProductData: (productData: productItem[]) => {
    set((state) => ({
      ...state,
      products: [...productData],
    }));
  },
  addProduct: (productData: productItem) => {
    set((state) => ({
      ...state,
      products: [...state.products, productData],
    }));
  },
  sortBy: (category: string) => {
    set((state) => {
      let sortedProducts = [...state.products];

      switch (category) {
        case 'Popular':
          sortedProducts = sortedProducts.sort((a, b) => b.starsCount - a.starsCount);
          break;
        case 'Unpopular':
          sortedProducts = sortedProducts.sort((a, b) => a.starsCount - b.starsCount);
          break;
        case '↑':
          sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case '↓':
          sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }

      return {
        ...state,
        products: sortedProducts,
      };
    });
  },
  removeProduct: (id: string) => {
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },
}));

export default useProductStore;
