import { FC } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/services/store/store"; // Ensure the path is correct
import { createStylist, getAllStylist } from "@/services/features/stylist/stylistSlice"; // Ensure the correct slice is imported
import { toast } from "react-toastify";

type FormStylistData = {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    roleId: string;
    phoneNumber: string;
    image: FileList; // Allowing for an image file
};

type CreateStylistPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateStylistPopup: FC<CreateStylistPopupProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<FormStylistData>();

    const onSubmit = async (data: FormStylistData) => {
        // Log form data for debugging purposes
        console.log("Form data:", data);

        // Validate that email is defined
        if (!data.email) {
            console.error("Email is undefined");
            toast.error("Email is required");
            return;
        }

        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);  // Email should be appended here
        formData.append('password', data.password);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('roleId', data.roleId);

        // Append image file if provided
        if (data.image && data.image.length > 0) {
            formData.append('imageFile', data.image[0]);
        }

        try {
            const result = await dispatch(createStylist(formData));

            if (createStylist.fulfilled.match(result)) {
                await dispatch(getAllStylist()); // Refresh the list after successful creation
                toast.success("Stylist created successfully");
                onClose();
            } else {
                toast.error("Failed to create stylist");
            }
        } catch (error) {
            console.error("Error creating stylist:", error);
            toast.error("Error creating stylist");
        }
    };

    return (
        <div
            id="info-popup"
            className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 items-center justify-center backdrop-blur-sm bg-black/50`}
        >
            <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    Create Stylist
                </h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            First Name
                        </label>
                        <input
                            {...register("firstName", { required: "First name is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            Last Name
                        </label>
                        <input
                            {...register("lastName", { required: "Last name is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            {...register("phoneNumber", { required: "Phone number is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                    </div>

                    {/* Image file input for the stylist's profile picture */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image")}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    <input type="hidden" value="R3" {...register("roleId")} /> {/* Role is fixed as "R3" */}

                    <div className="flex justify-between items-center space-y-4 sm:flex sm:space-y-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 w-full text-sm font-medium text-white bg-red-500 rounded-lg border border-gray-200 sm:w-auto hover:bg-red-700 focus:ring-4 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 w-full text-sm font-medium text-white bg-green-700 rounded-lg sm:w-auto hover:bg-green-800 focus:ring-4 focus:outline-none"
                        >
                            Create Stylist
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStylistPopup;
