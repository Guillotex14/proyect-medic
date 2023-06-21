import { useRef, useState } from "react";

enum ModalMeditions {
    openModal
}
export const useModalMeditions = () => {

    const [isOpen, setIsOpen] = useState(false); 

    const justOpen = useRef<ModalMeditions>();

    const openModal = () => {
        setIsOpen(true);
        justOpen.current = ModalMeditions.openModal;
        console.log('openModals', justOpen);
    };

    return (
        {
            isOpen,
            openModal,
        }
    );
};
