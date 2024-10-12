import { IService } from "@/interfaces/Service";
import { updateService, getAllService } from "@/services/features/service/serviceSlice";
import { useAppDispatch } from "@/services/store/store";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormServiceData = {
    id: number;
    name: string;
    description: string;
    image: FileList | string;  // Allow both FileList and string for image
    price: number;
};

type UpdateServicePopupProps = {
    isOpen: boolean;
    onClose: () => void;
    service: IService;  // Pass the specific service to edit
};

const UpdateServicePopup: FC<UpdateServicePopupProps> = ({ isOpen, onClose, service }) => {
    const dispatch = useAppDispatch();
    const [imageUrl, setImageUrl] = useState<string | null>(service.image || null);  // Store the image URL

    // Use form and set default values to the selected service
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormServiceData>({
        defaultValues: {
            id: service.id,
            name: service.name,
            description: service.description,
            price: Number(service.price),  // Ensure price is a number
        },
    });

    // Reset form whenever a new service is selected
    useEffect(() => {
        reset({
            ...service,
            price: Number(service.price),
        });
        setImageUrl(service.image || null);  // Update imageUrl when service changes
    }, [service, reset]);

    const onSubmit = async (data: FormServiceData) => {
        const formData = new FormData();
        formData.append('id', data.id.toString());
        formData.append('name', data.name);
        formData.append('description', data.description);

        if (data.image && typeof data.image !== 'string' && data.image.length > 0) {
            formData.append('imageFile', data.image[0]);  // Key is 'imageFile' just like in Postman
        }

        formData.append('price', data.price.toString());

        const result = await dispatch(updateService({ data: formData }));
        if (updateService.fulfilled.match(result)) {
            await dispatch(getAllService());
            onClose();
        }
    };

    return (
        <div
            id="info-popup"
            className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 items-center justify-center backdrop-blur-sm bg-black/50`}
        >
            <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    Update Service
                </h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            Name
                        </label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            Description
                        </label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            Image
                        </label>
                        {imageUrl && (
                            <img src={imageUrl} alt="Service" className="mb-2 w-full h-40 object-cover rounded-lg" />
                        )}
                        <input
                            type="file"
                            {...register("image")}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            Price
                        </label>
                        <input
                            type="number"
                            {...register("price", { required: "Price is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-200"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg dark:bg-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateServicePopup;
