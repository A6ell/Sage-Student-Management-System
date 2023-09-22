import create from 'zustand';

export const useStore = create((set) => ({
  responseData: null,
  setResponseData: (data) => set(() => ({ responseData: data })),
}));