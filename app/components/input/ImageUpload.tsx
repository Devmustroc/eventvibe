import React, {useCallback} from "react";
import {CldUploadWidget} from "next-cloudinary";
import {TbPhotoPlus} from "react-icons/tb";
import Image from "next/image";

declare global {
    let cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
    avatar?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value,
    avatar,
    }) => {
        const handleUpload = useCallback((result: any) => {
            onChange(result.info.secure_url);
        }, [onChange])
        return (

        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset='ofmkag8f'
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return (
                    {avatar} ? (
                        <div
                            onClick={() => open?.()}
                            className="
                                    relative
                                    cursor-pointer
                                    h-[500px]
                                    hover:opacity-80
                                    transition
                                    border-dashed
                                    border-2
                                    border-gray-300
                                    flex
                                    flex-col
                                    justify-center
                                    items-center
                                    gap-4
                                    text-brand_secondary
                        "
                        >
                            <TbPhotoPlus
                                size={40}
                                className="
                                hover:opacity-80
                                hover:translate-y-[-2px]
                            "
                            />
                            <div
                                className="
                                text-sm
                                transition
                                hover:opacity-80
                            "
                            >
                               Upload
                            </div>
                            {
                                value && (
                                    <div
                                        className="
                                                absolute
                                                w-full
                                                h-full
                                                rounded-lg
                                         "
                                    >
                                        <Image
                                            alt="Uploaded image"
                                            objectFit={'cover'}
                                            fill
                                            src={value}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    ): (
                        <div
                            onClick={() => open?.()}
                            className="
                                    relative
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                    border-dashed
                                    rouded-full
                                    w-[100px]
                                    h-[100px]
                                    rounded-lg
                                    border-2
                                    flex
                                    flex-col
                                    justify-center
                                    items-center
                        "
                        >
                            <TbPhotoPlus
                                size={40}
                                className="
                                hover:opacity-80
                                hover:translate-y-[-2px]
                            "
                            />
                            <div
                                className="
                                text-sm
                                transition
                                hover:opacity-80
                            "
                            >
                                Click to upload
                            </div>
                            {
                                value && (
                                    <div
                                        className="
                                        absolute
                                        top-0
                                        left-0
                                        w-full
                                        h-full
                                        rounded-lg
                                        overflow-x-auto
                                    "
                                    >
                                        <Image
                                            alt="Uploaded image"
                                            fill
                                            style={{objectFit: 'cover'}}
                                            src={value}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    )
                )
            }}
        </CldUploadWidget>
    );
};
