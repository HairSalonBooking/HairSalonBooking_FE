import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/services/store/store";
import { createStylist, getAllStylist } from "@/services/features/stylist/stylistSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type FormStaffData = {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
};

type CreateStaffPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateStaffPopup: FC<CreateStaffPopupProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormStaffData>();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPass = () => setShowPassword(!showPassword);

    const onSubmit = async (data: FormStaffData) => {
        const formData = {
            ...data,
            roleId: "R1", // Thiết lập roleId cho Staff
            confirmPassword: data.password,
            success: true,
        };

        try {
            const result = await dispatch(createStylist(formData));

            if (createStylist.fulfilled.match(result)) {
                await dispatch(getAllStylist());
                onClose();
                reset();
            } else {
                toast.error("Failed to create staff");
            }
        } catch (error) {
            console.error("Error creating staff:", error);
            toast.error("Error creating staff");
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <div
            id="info-popup"
            className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 items-center justify-center backdrop-blur-sm bg-black/50`}
        >
            <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    Create Staff
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
                            Create Staff
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStaffPopup;
