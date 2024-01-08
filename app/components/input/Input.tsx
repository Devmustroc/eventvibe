'use client';

import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {BiEuro} from "react-icons/bi";
import React from "react";

interface InputProps {
    id: string,
    label: string,
    value?: string | number | Date  | null,
    type?: string,
    disabled?: boolean,
    formatPrice?: boolean,
    required?: boolean,
    register?: UseFormRegister<FieldValues>,
    errors?: FieldErrors
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    register,
    errors
    }) => {
    return (
        <div
            className="
                w-full
                relative
            "
        >
            {
                formatPrice && (
                    <BiEuro
                        className="
                            absolute
                            top-5
                            left-3
                            transform
                            -translate-y-1/2
                        "
                        size={20}

                    />
                )
            }
            <input
                id={id}
                type={type}
                disabled={disabled}
                className={`
                    w-full
                    peer
                    p-6
                    pl-5
                    rounded-md
                    border-[1px]
                    border-slate-400
                    focus:outline-none
                    focus:border-brand_secondary
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9' : ''}
                    ${errors && errors[id] ? 'border-red-600 focus:border-red-600' : 'border-brand-secondary focus:border-brand_secondary'}
                    `
            }
                {...register && register(id, {required: true})}
            />
            <label
                htmlFor={id}
                className={`
                    absolute
                    text-md
                    text-brand_secondary/50
                    transform
                    duration-150
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    ${formatPrice ? 'left-9' : 'left-3'}
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:-translate-y-6
                    peer-focus:scale-75
                     ${errors && errors[id] ? 'border-red-600 focus:border-red-600' : 'border-brand-secondary focus:border-brand_secondary'}
                `}
            >
                {label}
            </label>
        </div>
    );
};

 export default Input;
