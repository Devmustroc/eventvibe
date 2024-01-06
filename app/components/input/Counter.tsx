import React, {useCallback} from "react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}
export const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
    }) => {
    const onIncrement = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onDecrement = useCallback(() => {
        if (value === 1) return;
        onChange(value - 1);
    }, [onChange, value]);
    return (
        <div
            className="
                flex
                flex-row
                justify-between
            "
        >
            <div
                className="
                    flex
                    flex-col
                "
            >
                <div
                    className="
                        text-medium
                    "
                >
                    {title}
                </div>
                <div
                    className="
                        text-gray-500
                        font-light
                    "
                >
                    {subtitle}
                </div>
            </div>
            <div
                className="
                    flex
                    flex-row
                    items-center
                    gap-4
                "
            >
                <div
                    onClick={onDecrement}
                    className="
                        w-10
                        h-10
                        rounded-full
                        bg-gray-100
                        border-[1px]
                        border-brand_secondary
                        flex
                        items-center
                        justify-center
                        text-brand_secondary
                        cursor-pointer
                        hover:opacity-80
                        hover:bg-brand_secondary/60
                        transition
                     "
                >
                    <AiOutlineMinus/>
                </div>
                <div
                    className="
                        text-xl
                        font-bold
                        text-brand_secondary
                    "
                >
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="
                            w-20
                            h-10
                            text-center
                            border-[1px]
                            border-brand_secondary
                            rounded-md
                            outline-none
                            text-brand_secondary
                            font-bold
                        "
                    />
                </div>
                <div
                    onClick={onIncrement}
                    className="
                        w-10
                        h-10
                        rounded-full
                        bg-gray-100
                        border-[1px]
                        border-brand_secondary
                        flex
                        items-center
                        justify-center
                        text-brand_secondary
                        cursor-pointer
                        hover:opacity-80
                        hover:bg-brand_secondary/60
                        transition
                     "
                >
                    <AiOutlinePlus />
                </div>
            </div>

        </div>
    );
};
