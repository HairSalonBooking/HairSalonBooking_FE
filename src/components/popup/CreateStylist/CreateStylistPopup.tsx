import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/services/store/store";
import { createStylist, getAllStylist } from "@/services/features/stylist/stylistSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type FormStylistData = {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
    positionId: string;  // Added positionId here
};

type CreateStylistPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateStylistPopup: FC<CreateStylistPopupProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormStylistData>();
    const [showPassword, setShowPassword] = useState(false);

    // Handler for toggling password visibility
    const handleShowPass = () => setShowPassword(!showPassword);

    const onSubmit = async (data: FormStylistData) => {
        // Map positionId based on the selected position
        let positionMappedId = "";
        switch (data.positionId) {
            case "1":
                positionMappedId = "P0"; // Apprentice Barber
                break;
            case "2":
                positionMappedId = "P1"; // Barber
                break;
            case "3":
                positionMappedId = "P2"; // Master Barber
                break;
            default:
                positionMappedId = "P0"; // Default to Apprentice Barber if not selected
        }

        const formData = {
            ...data,
            positionId: positionMappedId, // Set the mapped positionId
            roleId: "R3", // Set roleId to "R3" for creating a stylist
            confirmPassword: data.password, // Assuming confirmPassword is the same as password
            success: true // Assuming success is a boolean value
        };

        try {
            const result = await dispatch(createStylist(formData));

            if (createStylist.fulfilled.match(result)) {
                await dispatch(getAllStylist());
                onClose();
                reset();  // Reset the form after submission
            } else {
                toast.error("Failed to create stylist");
            }
        } catch (error) {
            console.error("Error creating stylist:", error);
            toast.error("Error creating stylist");
        }
    };

    const handleClose = () => {
        reset();  // Reset form when the popup is closed
        onClose();
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                            />
                            <div
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg"
                                onClick={handleShowPass}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
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

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400">
                            Position
                        </label>
                        <select
                            {...register("positionId", { required: "Position is required" })}
                            className="w-full px-3 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        >
                            <option value="">Select position</option>
                            <option value="1">Apprentice Barber</option>
                            <option value="2">Barber</option>
                            <option value="3">Master Barber</option>
                        </select>
                        {errors.positionId && <p className="text-red-500 text-sm">{errors.positionId.message}</p>}
                    </div>

                    <div className="flex justify-between items-center space-y-4 sm:flex sm:space-y-0">
                        <button
                            type="button"
                            onClick={handleClose}
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
