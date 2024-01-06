'use client';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import React, {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/input/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import {signIn} from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";







const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {register,
        handleSubmit,
        formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const handleLogin = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);


    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        setIsLoading(true);
        axios.post('/api/register', data).then(() => {
            toast.success("Registered successfully");
            registerModal.onClose();
            loginModal.onOpen();
        }).catch((error) => {
            console.error(error);
            toast.error("something went wrong");
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const bodyContent = (
        <div
            className="
                flex
                flex-col
                gap-4
            "
        >
            <Heading
                title="Colloc Hub"
                subtitle="Create your account"
                center
            />
            <Input
                id="email"
                label="email"
                type="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                type="text"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Name"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div
            className="
                flex
                flex-col
                gap-4
                mt-3
            "
        >
            <hr
                className="
                    border-brand_light
                    border-[2px]
                "
            />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue With Facebook"
                icon={FaFacebook}
                onClick={() => signIn('facebook')}
            />
            <div
                className="
                    text-center
                    text-brand_secondary
                    mt-4
                    font-light
                "
            >
                <div
                    className="
                        flex
                        flex-row
                        gap-2
                        justify-center
                        items-center
                   "
                >
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={handleLogin}
                        className="
                            text-brand_primary
                            font-bold
                            cursor-pointer
                            hover:underline
                        "
                    >
                       Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;