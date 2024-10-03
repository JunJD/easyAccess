'use client'

import NiceModal from '@ebay/nice-modal-react/lib/esm';
import { motion } from "framer-motion"
import { ModalStackContainer } from "rc-modal-sheet"

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ModalStackContainer m={motion}>
            <NiceModal.Provider>
                {children}
            </NiceModal.Provider>
        </ModalStackContainer>

    );
}

export default ModalProvider