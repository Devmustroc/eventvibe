import Select, { Theme } from "react-select";
import useCountries from "@/app/hooks/useCountries";
import React from "react";
import {CountrySelectType} from "@/app/types";


export type CountrySelectValue = {
    flag: String;
    label: String;
    latlng: number[];
    region: String;
    value: String;
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue | null) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange,
    }) => {

    const { getAllCountries } = useCountries()

    return (
        <div
            className="
                w-full
            "
        >
            <Select
                placeholder="Select Country"
                isClearable
                options={getAllCountries()}
                value={value}
                onChange={(value: CountrySelectType) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            gap-3
                        "
                    >
                        <div>{option.flag}</div>
                        <div>
                            {option.label},
                            <span
                                className="
                                    text-brand_secondary/50
                                    pl-2

                                "
                            >
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                className="
                    controle: () => 'p-3 border-[1px]',
                    input: () => 'text-lg font-bold',
                    option: () => 'text-lg font-sm',
                "
                theme={(theme: Theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary25: '#159A9C',
                        primary: 'black',
                    }
                })}
            />
        </div>
    );
};
