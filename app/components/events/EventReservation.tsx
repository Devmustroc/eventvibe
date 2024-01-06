import Calendar from "@/app/components/input/Calendar";
import {SafeEvent, SafeUser} from "@/app/types";
import React from "react";
import {Range} from "react-date-range";
import {Counter} from "@/app/components/input/Counter";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import useUpdateModal from "@/app/hooks/useUpdateModal";


interface EventReservationProps {
    price : number;
    dateRange: Range,
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    setNumGuests: (value: number) => void;
    onSubmit: () => void;
    guestCount: number;
    disabled?: boolean;
    disabledDates?: Date[];
    numGuests: number;
    isLoading?: boolean;
    event: SafeEvent & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

export const
    EventReservation: React.FC<EventReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    setNumGuests,
    numGuests,
    disabled,
    disabledDates,
    event,
    currentUser,
    }) => {
    const updateModal = useUpdateModal();

    const handleNumGuestsChange = (value: number) => {

        if (value > 3) {
            toast.error("You can't have more than 10 guests");
            return;
        }
        setNumGuests(value);
    };

    return (
        <div
            className="
                bg-white
                rounded-xl
                border-[1px]
                border-neutral-100
                shadow-[10px_10px_50px_#bdcbc4]
                overflow-hidden
            "

        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    gap-1
                    p-4
                "
            >
                <div
                    className="
                        text-2xl
                        font-semibold
                    "
                >
                    {price} €
                </div>
                <div
                    className="
                        font-light
                        text-neutral-600
                    "
                >
                    / Person
                </div>
            </div>
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={onChangeDate}
                event={event}
            />
            <hr/>
            <div
                className="
                    gap-4
                    p-4
                "
            >
                <Counter
                    title="Guests"
                    subtitle="Max 3 guests"
                    value={numGuests}
                    onChange={handleNumGuestsChange}
                />
            </div>
            <div
                className="
                         p-4
                "
            >
                {
                    currentUser?.id === event.userId ? (
                        <Button
                            onClick={() => updateModal.onOpen()}
                            disabled={disabled}
                            label="Update Event"
                        />
                    ) : (
                        <Button
                            onClick={onSubmit}
                            disabled={disabled}
                            label="Book Now"
                        />
                    )
                }
            </div>
            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    font-semibold
                    text-[18px]
                    p-4
                "
            >
                <div
                    className="
                        px-4
                        bg-brand_secondary/20
                        rounded-md
                    "
                >
                    Total
                </div>
                <div
                    className="
                        px-4
                        rounded-md
                        bg-brand_primary/20

                    "
                >
                    € {totalPrice}
                </div>
            </div>
        </div>
    );
};
