import React, { useState } from 'react';
import { Button, Modal } from 'native-base';
import { useModalMeditions } from '../hooks/useModalMeditions';


export const ModalMeditions = () => {


    const [isOpenModal, setIsOpenModal] = useState(false);

    const { isOpen } = useModalMeditions();

    if (isOpen) {
        setIsOpenModal(true);
    }

    return (
        <Modal isOpen={isOpenModal} onClose={setIsOpenModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Modal Title</Modal.Header>
                <Modal.Body>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore
                    consectetur, neque doloribus, cupiditate numquam dignissimos
                    laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group variant="ghost" space={2}>
                        <Button>Cancel</Button>
                        <Button>Save</Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};
