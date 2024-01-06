'use client';

import { useMemo, useState} from "react";
import Modal from "@/app/components/modals/Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "@/app/components/Heading";
import {categories} from "@/app/components/navbar/Categories";
import {CategoryInput} from "@/app/components/input/CategoryInput";
import {FieldValues, useForm, SubmitHandler} from "react-hook-form";
import {CountrySelect} from "@/app/components/CountrySelect";
import dynamic from "next/dynamic";
import {Counter} from "@/app/components/input/Counter";
import {ImageUpload} from "@/app/components/input/ImageUpload";
import Input from "@/app/components/input/Input";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";



enum STEPS {
    CATEGORY= 0,
    ADRRESS,
    LOCATION= 2,
    INFO = 3,
    IMAGES= 4,
    DESCRIPTION= 5,
    PRICE= 6,
}


export const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
        reset

    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            imageSrc: '',
            title: '',
            description: '',
            price: 0,
            startDate: '',
            endDate: '',
            address: '',
            zipcode: '',
            city: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), []);


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((prevState) => prevState - 1);
    };

    const onNext = () => {
        setStep((prevState) => prevState + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }
        return "Next";
    }, [step]);

    const onSubmit : SubmitHandler<FieldValues> = ( (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/events', data).then(() => {
            toast.success('Listing created successfully');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        }).catch(() => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        })
    });

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return "Back";
    }, [step]);


    let bodyContent = (
        <div
            className="
                flex
                flex-col
                gap-2
                items-center
                justify-center
                text-center
            "
        >
            <Heading
                title="Choose your Event"
                subtitle="Select a event category"
                center
            />
            <div
                className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-4
                    w-full
                    max-h-[50vh]
                "
            >
                {
                    categories.map((item) => (
                        <div
                            key={item.label}
                            className="
                                col-span-2
                            "
                        >
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={item.label === category}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))
                }

            </div>
        </div>
    )

    if (step === STEPS.ADRRESS) {
        bodyContent= (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading
                    title="Event Address"
                    subtitle="Where is your event located ?"
                    center
                />
                <Input
                    id="address"
                    label="Address"
                    type="text"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="city"
                    label="City"
                    type="text"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="zipcode"
                    label="Zipcode"
                    type="text"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div

                className="
                flex
                flex-col
                gap-8
                ">
                <Heading
                    title="Event location ?"
                    subtitle="Where can your event be found ?"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading
                    title='Attendance'
                    subtitle='How many attendees are you expecting ?'
                    center
                />
                <Input
                    id="startDate"
                    label="Start Date"
                    type="date"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="endDate"
                    label="End Date"
                    type="date"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Counter
                    title='Number of attendees'
                    subtitle='How many attendees are you expecting ?'
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div
             className="
                flex
                flex-col
                gap-8
             "
            >
                <Heading title='Add a photo of the place'
                         subtitle='Show off your space to guests'
                         center
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value: any) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading title='Event Description.'
                         subtitle='Tell attendees what your event is about ?'
                         center
                />
                <Input
                    id='title'
                    label='Title'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                < hr />
                <Input
                    id='description'
                    label='Description'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading title='Pricing'
                         subtitle="How much will you charge for your event ?"
                />
                <Input
                    formatPrice={true}
                    id="price"
                    label="Price"
                    disabled={isLoading}
                    register={register}
                    type="number"
                    errors={errors}
                    required
                />

            </div>
        )

    }


    return (
        <Modal
            title="SHARE YOU EVENT"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    );
};
