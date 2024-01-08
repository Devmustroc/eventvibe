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
    currentUser: SafeUser | null,
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
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
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
        <Container
            className="
                pt-[100px]
                pb-[100px]
            "
        >
            <div
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    w-full
                    pt-[50px]
                    pb-[50px]
                    "
            >
            <Heading
                title="Profile"
                subtitle="Update your profile"
                center
            />
           <div
                className="
                      mt-10
                      grid-cols-2
                      gap-4
                      grid
                      rounded-lg
                      px-[50px]
                      pv-[50px]
                      pb-[50px]
                      xs:w-[90%]
                      md:w-[50%]
                      xl:w-[40%]
                      2xl:w-[40%]
                      border-2
                      border-gray-200
                      shadow-md
                      "
           >
               <div
                   className="
                        col-span-2
                        flex
                        xs:flex-col
                        flex-start
                        mt-8
                        "
               >
                   <div
                       className="bg-white  rounded-lg  w-full h-full">
                       <div
                            className="
                                  flex
                                  flex-row
                                  items-stat
                                  justify-start
                                  rounded-full
                                  p-5
                                  text-center
                                  gap-8
                                  "
                       >
                           <ImageUpload
                               value={image}
                               onChange={(value: any) => setCustomValue('imageSrc', value)}
                               avatar
                           />
                       </div>
                       <div className="p-5">
                           <a href="#">
                               <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                   <span>{currentUser?.firstName}</span> <span>{currentUser?.lastName}</span></h5>
                           </a>
                           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {currentUser?.email}
                           </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {currentUser?.age}
                            </p>
                       </div>
                   </div>
               </div>
               <div
                   className="
                        grid
                        col-span-2
                        gap-4
                        "
               >
                   <form>
                       <div className="grid gap-6 mb-6 md:grid-cols-1">
                           <div>
                               <Input
                                   label="First name"
                                   id="firstName"
                                   type="text"
                                   register={register}
                                   required
                               />
                           </div>
                           <div>
                               <Input
                                   label="Last name"
                                   id="lastName"
                                   type="text"
                                   value={currentUser?.lastName}
                                   register={register}
                                   required
                               />
                           </div>
                           <div>
                               <Input
                                   label="Username"
                                   id="username"
                                   type="text"
                                   value={currentUser?.name}
                                   register={register}
                                   required
                               />
                            </div>
                           <div>
                                <Input
                                    label="Email"
                                    id="email"
                                    type="email"
                                    value={currentUser?.email}
                                    register={register}
                                    required
                                />
                           </div>
                           <div>
                                <Input
                                    label="Age"
                                    id="age"
                                    type="number"
                                    value={currentUser?.age}
                                    register={register}
                                    required
                                />
                            </div>
                            </div>

                       <button
                           onClick={handleSubmit(onSubmit)}
                           type="submit"
                           className="text-white bg-brand_secondary hover:bg-brand_primary hover:text-brand_secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md">Submit
                       </button>
                   </form>
               </div>
           </div>
            </div>
      </Container>
    )
};

export default ProfileClient;