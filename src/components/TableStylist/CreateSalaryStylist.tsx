import { createSalaryForStylist, getAllStylist } from "@/services/features/stylist/stylistSlice";
import { useAppDispatch } from "@/services/store/store";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type CreateSalaryStylistProps = {
    isOpen: boolean;
    onClose: () => void;
    stylistId?: number;
};

type FormData = {
    month: string;
    year: string;
};

const CreateSalaryStylist: FC<CreateSalaryStylistProps> = ({
    isOpen,
    onClose,
    stylistId,
}) => {
    const dispatch = useAppDispatch();
    const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        if (!stylistId) return; // Check if stylistId exists
        try {
            await dispatch(createSalaryForStylist({
                stylistId: stylistId,
                month: parseInt(data.month), // Convert string to number
                year: parseInt(data.year)
            })).unwrap(); // Use unwrap to catch any errors

            // Refresh stylist data after successful creation
            await dispatch(getAllStylist()).unwrap();
            reset(); // Reset the form fields
            onClose(); // Close the popup
        } catch {
            toast.error("An error occurred while creating the salary.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create Salary for Stylist</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stylist ID</label>
                        <input
                            type="text"
                            value={stylistId || ''}
                            readOnly
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Month</label>
                        <input
                            type="text"
                            {...register("month", {
                                required: "Month is required",
                                pattern: {
                                    value: /^(0?[1-9]|1[0-2])$/,
                                    message: "Please enter a valid month (01-12)"
                                }
                            })}
                            placeholder="MM"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.month && (
                            <p className="text-sm text-red-500 mt-1">{errors.month.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        <input
                            type="text"
                            {...register("year", {
                                required: "Year is required",
                                pattern: {
                                    value: /^(19|20)\d{2}$/,
                                    message: "Please enter a valid year (e.g., 2023)"
                                }
                            })}
                            placeholder="YYYY"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.year && (
                            <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSalaryStylist;
