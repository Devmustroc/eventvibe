'use client';

import {SafeUser} from "@/app/types";
import Heading from "@/app/components/Heading";
import React, {useState} from "react";
import {Container} from "@/app/components/Container";
import Input from "@/app/components/input/Input";
import {useRouter} from "next/navigation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {ImageUpload} from "@/app/components/input/ImageUpload";

interface ProfileClientProps {
    currentUser: SafeUser,
}

const ProfileClient: React.FC<ProfileClientProps> = ({
     currentUser
     }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            id: currentUser?.id,
            name: currentUser?.name,
            email: currentUser?.email,
            age: currentUser?.age,
            image: currentUser?.image,
        }
    })

    const image = watch('image');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true,
        });
    };


    const onSubmit : SubmitHandler<FieldValues> =  (data) => {
        if (!currentUser) {
            return;
        }
        setIsLoading(true);

        axios.put(`/api/users/${currentUser.id}`, data)
            .then(() => {
                toast.success('Profile updated');
                router.refresh();
            })
            .catch(() => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    return (
      <Container>
            <div
                className="
                        pt-[140px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        w-full
                        mb-12
                "
            >
                <Heading
                    title="Profile"
                    subtitle="User Profile"
                />
                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                    mt-4
                    w-full
                    px-4
                    py-4
                    bg-white
                    rounded-lg
                    shadow-[3px_3px_9px_#d9d9d9]
                    pb-8
                "
                >
                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            bg-white
                            rounded-full
                        "
                    >
                        <div
                            className="
                                    relative
                                    h-1/2
                                    w-1/2
                                    bg-brand_secondary
                                    rounded-full
                                "
                        >
                            <div
                                className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                    "
                            >
                                <div
                                    className="
                                            w-full
                                            h-full
                                            rounded-full
                                            overflow-hidden
                                        "
                                >
                                    <ImageUpload
                                        value={image}
                                        onChange={(value) => setCustomValue('image', value)}
                                        avatar
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className="
                            flex
                            flex-col
                            items-start
                            justify-start
                            bg-white
                            rounded-lg
                            mb-3
                        "
                        >
                            <p
                                className="
                            mt-3
                            text-md
                            font-medium
                            text-gray-800
                        "
                            >
                                Name : <span
                                className="
                                font-medium
                                text-xl
                                text-brand_black
                        "

                            >{currentUser?.name}</span>
                            </p>
                            <p
                                className="
                                mt-3
                                text-md
                                font-medium
                                text-gray-800
                        "
                            >
                                Email : <span
                                className="
                                font-medium
                                text-xl
                                text-black
                        "
                            >{currentUser?.email}</span>
                            </p>
                            <p
                                className="
                                mt-3
                                text-md
                                font-medium
                                text-gray-800
                        "
                            >
                                Age : <span
                                className="
                                font-medium
                                text-xl
                                text-brand_primary
                        "
                            >{currentUser?.age}</span>
                            </p>
                        </div>
                    </div>
                    <div
                        className="
                        flex
                        flex-col
                        bg-white
                        gap-4
                    "
                    >
                        <h2
                            className="
                            text-xl
                            font-medium
                            text-gray-800
                        "

                        >
                            Update Profile information
                        </h2>
                        <Input
                            id="name"
                            label="Name"
                            type="text"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <Input
                            id="email"
                            label="Email"
                            type="email"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <Input
                            id="age"
                            label="Age"
                            type="number"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <div
                            className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        bg-white
                        gap-4
                        px-4
                        py-4
                    "

                        >
                            <button
                                onClick={handleSubmit(onSubmit)}
                                disabled={isLoading}
                                className={`
                                relative
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                rounded-full
                                hover:opacity-80
                                border-brand_light
                                hover:bg-brand_light
                                shadow-[3px_3px_9px_#bdcbc4]
                                py-2
                                px-6
                                text-md
                                font-semibold
                                border-2
                    `}
                            >
                                Update Profile
                            </button>
                        </div>

                    </div>
                </div>
            </div>
      </Container>
    )
};

export default ProfileClient;