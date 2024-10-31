import { createFeedback } from '@/services/features/feedback/feedbackSlice';
import { useAppDispatch } from '@/services/store/store';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface CreateFeedbackProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: number;
    serviceId: number;
    customerId: number;
}

interface FeedbackFormData {
    rating: number;
    comment: string;
}

const CreateFeedback: React.FC<CreateFeedbackProps> = ({ isOpen, onClose, bookingId, serviceId, customerId }) => {
    const { handleSubmit, control, formState: { errors } } = useForm<FeedbackFormData>();
    const dispatch = useAppDispatch();

    const onSubmit = (data: FeedbackFormData) => {
        const feedback = {
            ...data,
            bookingId,
            serviceId,
            customerId,
        };
        dispatch(createFeedback(feedback)).then(() => {
            onClose(); // Close modal after submission
        });
    };

    if (!isOpen) return null; // Hide modal if `isOpen` is false

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Leave Feedback</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Star Rating */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Rating</label>
                        <Controller
                            name="rating"
                            control={control}
                            defaultValue={0}
                            rules={{ required: "Please select a rating" }}
                            render={({ field }) => (
                                <div className="flex space-x-1 mt-2">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => field.onChange(value)}
                                            className="focus:outline-none"
                                        >
                                            {value <= field.value ? (
                                                <AiFillStar className="text-yellow-500 text-2xl" />
                                            ) : (
                                                <AiOutlineStar className="text-gray-300 text-2xl" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        />
                        {errors.rating && (
                            <p className="text-sm text-red-500 mt-1">{errors.rating.message}</p>
                        )}
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Comment</label>
                        <Controller
                            name="comment"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Please enter a comment",
                                minLength: { value: 5, message: "Comment must be at least 5 characters" },
                            }}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    rows={4}
                                    placeholder="Write your feedback here..."
                                />
                            )}
                        />
                        {errors.comment && (
                            <p className="text-sm text-red-500 mt-1">{errors.comment.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFeedback;