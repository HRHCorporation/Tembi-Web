"use client";

import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop"; 
import {
    useCallback,
    useState,
} from "react";

import getCroppedImg
    from "./crop-image";

interface Props {
    image: string;

    setCroppedBlob:
    (blob: Blob) => void;
}

export function ImageCropper({
    image,
    setCroppedBlob,
}: Props) {

    const [crop, setCrop] =
        useState({
            x: 0,
            y: 0,
        });

    const [zoom, setZoom] =
        useState(1);

    const onCropComplete =
        useCallback(
            async (
                croppedArea: Area,
                croppedAreaPixels: Area
            ) => {

                try {

                    const croppedImage =
                        await getCroppedImg(
                            image,
                            croppedAreaPixels
                        );

                    if (croppedImage) {

                        setCroppedBlob(
                            croppedImage
                        );

                    }

                } catch (error) {

                    console.error(error);

                }
            },
            [image, setCroppedBlob]
        );

    return (
        <div className="space-y-4">

            {/* CROP AREA */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-black">

                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={
                        onCropComplete
                    }
                />

            </div>

            {/* ZOOM */}
            <div>

                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) =>
                        setZoom(
                            Number(
                                e.target.value
                            )
                        )
                    }
                    className="w-full"
                />

            </div>

        </div>
    );
}