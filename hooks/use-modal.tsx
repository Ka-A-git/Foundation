import useModalState from 'state/stores/modal';

export default function useModal() {
  return {
    currentModal: useModalState((state) => state.modalKey),
    setCurrentModal: useModalState((state) => state.setModalKey),

    modalEntity: useModalState((state) => state.entityId),
    setModalEntity: useModalState((state) => state.setModalEntity),

    modalMode: useModalState((state) => state.currentTab),
    setModalMode: useModalState((state) => state.setModalTab),

    resetModal: useModalState((state) => state.resetModalState),
  };
}
