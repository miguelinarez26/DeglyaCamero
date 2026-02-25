import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isBookingModalOpen: false,
  openBookingModal: () => set({ isBookingModalOpen: true }),
  closeBookingModal: () => set({ isBookingModalOpen: false }),

  isSpecialistBookingOpen: false,
  openSpecialistBooking: () => set({ isSpecialistBookingOpen: true }),
  closeSpecialistBooking: () => set({ isSpecialistBookingOpen: false }),

  // Finanzas: Panel de Movimientos
  isTransactionPanelOpen: false,
  editingTransactionData: null,
  openTransactionPanel: (transactionData = null) => set({
    isTransactionPanelOpen: true,
    editingTransactionData: transactionData
  }),
  closeTransactionPanel: () => set({
    isTransactionPanelOpen: false,
    editingTransactionData: null
  }),
}));
