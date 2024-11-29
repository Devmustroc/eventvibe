'use client';

import React from "react";
import {IconType} from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    rounded?: boolean;
}


const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    rounded,
    }) => {
    return (
        <>
            {rounded ? (
                <button
                    data-cy="login-button"
                    onClick={onClick}
                    disabled={disabled}
                    className={`
                            relative
                            center
                            max-w-max-content
                            bg-brand_secondary
                            text-brand_white
                            py-2
                            px-4 
                            rounded-full
            `}

                >
                    {
                        Icon && (
                            <Icon
                                className="
                                absolute
                                right-4
                                top-3
                            "
                                size={20}/>
                        )
                    }
                    {label}
                </button>
            ) : (
                <button
                    data-cy="submit-login-button"
                    onClick={onClick}
                    disabled={disabled}
                    className={`
                        relative
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        text-white
                        bg-brand_primary
                        rounded-lg
                        hover:opacity-80
                        w-full
                ${outline ? 'border-[1px] bg-gray-500 border-black text-brand_light hover:bg-brand_gray hover:text-brand_white transition'
                        : 'bg-brand_secondary text-brand_light hover:bg-brand_secondary hover:text-brand_light'}
                ${small ? 'py-1 px-2 text-sm font-bold border-[1px] ' : 'py-2 px-4 text-md font-semibold border-2'}
            `}

                >
                    {
                        Icon && (
                            <Icon
                                className="
                                absolute
                                right-4
                                top-3
                            "
                                size={20}/>
                        )
                    }
                    {label}
                </button>
            )}
        </>
    );
};

export default Button;
