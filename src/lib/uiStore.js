import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isBookingModalOpen: false,
  openBookingModal: () => set({ isBookingModalOpen: true }),
  closeBookingModal: () => set({ isBookingModalOpen: false }),
}));
