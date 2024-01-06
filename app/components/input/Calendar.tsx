'use client';


import React from "react";
import {DateRange, Range, RangeKeyDict} from "react-date-range";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {SafeEvent} from "@/app/types"; // theme css file

interface CalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabled?: boolean;
    disabledDates?: Date[];
    event: SafeEvent;
}

const Calendar: React.FC<CalendarProps> = ({
                                                value,
                                                onChange,
                                                disabledDates,
                                                event
    }) => {
    const handleDateChange = (date: RangeKeyDict) => {
        // Ensure the onChange handler receives the correct parameter type
        onChange(date);
    };

    return (
        <div
            className="
                w-full
                bg-white
                rounded-l
                border-[1px]
                border-neutral-100
                shadow-[5px_5px_10px_#bdcbc4]
                overflow-hidden
            "
        >
            <DateRange
                rangeColors={["#a8bbec"]}
                ranges={[value]}
                date={new Date()}
                onChange={handleDateChange}
                direction='vertical'
                showDateDisplay={false}
                minDate={new Date(event.startDate)}
                maxDate={new Date(event.endDate)}
                disabledDates={disabledDates}
            />
        </div>
    );
};

export default Calendar;
