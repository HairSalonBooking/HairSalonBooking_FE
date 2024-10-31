import { viewFeedbackOfService } from "@/services/features/feedback/feedbackSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { FC, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

type ViewFeedBackProps = {
    serviceId: number;
};

const ViewFeedBack: FC<ViewFeedBackProps> = ({ serviceId }) => {
    const dispatch = useAppDispatch();
    const { feedbacks } = useAppSelector((state) => state.feedbacks);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Fetch feedbacks on component mount
    useEffect(() => {
        const fetchFeedbacks = async () => {
            await dispatch(viewFeedbackOfService({ serviceId }));
        };
        fetchFeedbacks();
    }, [dispatch, serviceId]);

    // Calculate total pages based on the number of feedbacks and items per page
    const totalPages = Math.ceil((feedbacks?.length || 0) / itemsPerPage);

    // Get feedbacks for the current page
    const paginatedFeedbacks = feedbacks?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mx-auto lg:px-20 px-4 bg-gray-900">
            <h1 className="text-3xl font-bold text-white py-10">Feedback</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {paginatedFeedbacks && paginatedFeedbacks.length > 0 ? (
                    paginatedFeedbacks.map((feedback) => (
                        <div
                            key={feedback.id}
                            className="bg-gray-800 rounded-lg shadow p-6"
                        >
                            <div className="flex items-center mb-2">
                                <h3 className="text-lg font-semibold text-white mr-4">
                                    {feedback.userFirstName} {feedback.userLastName}
                                </h3>
                                <span className="text-gray-400 text-sm">
                                    {new Date(feedback.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center mb-2">
                                {[...Array(feedback.rating)].map((_, i) => (
                                    <AiFillStar key={i} className="text-yellow-500" />
                                ))}
                                {[...Array(5 - feedback.rating)].map((_, i) => (
                                    <AiFillStar key={i} className="text-gray-500" />
                                ))}
                            </div>
                            <p className="text-gray-300">{feedback.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No feedback available for this service.</p>
                )}
            </div>

            {/* Pagination Buttons */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 rounded-md ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewFeedBack;