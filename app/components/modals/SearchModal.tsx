'use client';


import Modal from "@/app/components/modals/Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useMemo, useState} from "react";
import dynamic from "next/dynamic";
import {CountrySelect, CountrySelectValue} from "@/app/components/CountrySelect";
import Heading from "@/app/components/Heading";
import qs from 'query-string';

enum STEPS  {
    LOCATION = 1,
    INFO = 2,
}


export const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [location, setLocation] = useState<CountrySelectValue>();

    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');

    const Map = useMemo(() => dynamic(() => import('../Map'),
        {ssr: false}), []);

    const onBack = useCallback(() => {
        setStep((prev) => prev - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((prev) => prev + 1);
    }, []);

    const onSubmit = useCallback( async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            city: city,
            address: address,
            zipcode: zipcode,
        }


        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [
        step,
        location,
        city,
        address,
        zipcode,
        params
    ]);


    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search';
        }
        return 'Next';
    }, [
        step
    ]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return undefined;
        }
        return 'Back';
    }, [
        step
    ]);

    let bodyContent = (
        <div
            className="
                flex
                flex-col
                gap-4
                center
            "
        >
            <Heading
                title="Search for Events Locations"
                subtitle="Search for events locations by country"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng}/>
        </div>
    )


    if (step === STEPS.INFO) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                    center
                "
            >
                <Heading
                    title="More Info"
                    subtitle='Search for events locations by city'
                />
                <input
                    id="city"
                    type="text"
                    placeholder="City"
                    className="
                        w-full
                        p-2
                        border
                        border-gray-300
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-brand_primary
                        focus:border-transparent
                    "
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    className="
                        w-full
                        p-2
                        border
                        border-gray-300
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-brand_primary
                        focus:border-transparent
                    "
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    id="zipcode"
                    type="text"
                    placeholder="Zipcode"
                    className="
                        w-full
                        p-2
                        border
                        border-gray-300
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-brand_primary
                        focus:border-transparent
                    "
                    onChange={(e) => setZipcode(e.target.value)}
                />

            </div>
        )
    }
    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filter Events"
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        />
    );
};
