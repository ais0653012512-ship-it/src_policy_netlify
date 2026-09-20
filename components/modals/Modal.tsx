"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    isOpen?: boolean;
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    heightFull?: boolean | false;
    panelClassName?: string;
    titleClassName?: string;
    backdropClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    children,
    heightFull,
    panelClassName = '',
    titleClassName = '',
    backdropClassName = '',
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal-backdrop"
                    className={`modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:py-10 ${backdropClassName}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        key="modal-content"
                        className={`mv-modal-bg mx-auto flex w-full min-w-0 max-w-lg max-h-[min(90dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem))] flex-col overflow-hidden rounded-mv-md shadow-mv-lg px-5 py-5 sm:max-h-[min(92dvh,calc(100dvh-5rem))] sm:px-6 sm:py-6 ${heightFull ? 'h-full max-h-none' : ''} ${panelClassName}`}
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {title ? (
                        <div className="mv-modal-header mb-4 flex items-center justify-between">
                            <h2 className={`mv-modal-title min-w-0 flex-1 text-left text-mv-base font-bold leading-snug text-meta-text sm:text-mv-lg break-words ${titleClassName}`}>{title}</h2>
                        </div>
                        ) : null}

                        <div className="flex-1 overflow-y-auto">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
