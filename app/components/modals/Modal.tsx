'use client';

import React, {useCallback, useEffect, useState} from "react";
import {IoMdClose} from "react-icons/io";
import Button from "@/app/components/Button";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onSubmit?: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         onSubmit,
                                         title,
                                         body,
                                         footer,
                                         actionLabel,
                                         disabled,
                                         secondaryAction,
                                         secondaryActionLabel,
                                     }) => {
    const [showModal, setShowModal] = useState(isOpen);
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModal(false);
        setTimeout(() => {
            onClose && onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit && onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction) return;
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="
                    justify-center
                    items-center
                    flex
                    overflow-x-hidden
                    overflow-y-auto
                    fixed
                    inset-0
                    z-50
                    outline-none
                    bg-brand_secondary/70
                    focus:outline-none
                    bg-brand_black
                    bg-opacity-50
                "
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden',
                }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'fixed',
                        width: '100%',
                        left: '50%',
                        top: '50%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(0, 35, 51,0.8)',
                        backgroundBlendMode: "multiply",
                        zIndex: '-1',
                    }}
                >
                    <source src="/video/backgroundModal.mp4" type="video/mp4"/>
                </video>
                <div
                    className="
                        relative
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto
                        h-full
                        lg:h-auto
                        md:h-auto
                    "
                >
                    {/*content*/}
                    <div
                        className={`
                            translate
                            duration-300
                            h-full
                            md:h-auto
                            ${showModal ? 'translate-y-0' : 'translate-y-full'}
                            ${showModal ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        <div
                            className="
                                translate
                                h-full
                                lg:h-auto
                                md:h-auto
                                border-0
                                rounded-lg
                                shadow-lg
                                relative
                                flex
                                flex-col
                                w-full
                                bg-brand_white
                                outline-none
                                focus:outline-none
                            "
                        >
                            {/*header*/}
                            <div
                                className="
                                    flex
                                    items-center
                                    p-6
                                    rounded-t
                                    justify-center
                                    relative
                                    border-b-[1px]
                                "
                            >
                                <button
                                    onClick={handleClose}
                                    className="
                                        p-1
                                        border-0
                                        hover:opacity-70
                                        transition
                                        absolute
                                        left-9
                                    "
                                >
                                    <IoMdClose size={20} />
                                </button>
                                <div
                                    className="
                                        text-lg
                                        font-semibold
                                    "
                                >
                                    { title }
                                </div>
                            </div>
                            {/*body*/}
                            <div
                                className="
                                    relative
                                    flex-auto
                                    p-6
                                    overflow-y-auto
                                    overflow-x-hidden
                                "
                            >
                                { body }
                            </div>
                            {/*footer*/}
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-2
                                    p-6
                                "
                            >
                                <div
                                    className="
                                        flex
                                        flex-row
                                        items-center
                                        gap-4
                                        w-full
                                    "
                                >
                                    { secondaryActionLabel && secondaryAction && (
                                        <Button
                                            outline
                                            onClick={handleSecondaryAction}
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                        />
                                    )}
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={disabled}
                                        label={actionLabel}
                                    />
                                </div>
                                { footer }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;