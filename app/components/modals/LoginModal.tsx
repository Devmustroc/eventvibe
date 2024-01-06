'use client';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import React, {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/input/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {register,
        handleSubmit,
        formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const signInWithGoogle = useCallback(() => {
        signIn('google', {callbackUrl: '/'});
    }, []);


    const handleSignUp = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const onSubmit: SubmitHandler<FieldValues> =
        (data) => {
            setIsLoading(true);

            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    setIsLoading(false);

                    if (callback?.ok) {
                        toast.success('Logged in');
                        router.refresh();
                        loginModal.onClose();
                    }

                    if (callback?.error) {
                        toast.error(callback.error);
                    }
                });
        }


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
                subtitle="Log in to your account"
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
                id="password"
                label="Password"
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
                onClick={signInWithGoogle}
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
                        Don&apos;t have an account?
                    </div>
                    <div
                        onClick={handleSignUp}
                        className="
                            text-brand_primary
                            font-bold
                            cursor-pointer
                            hover:underline
                        "
                    >
                       Sing up
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Log in"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;