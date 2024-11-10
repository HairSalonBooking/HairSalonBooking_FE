import Header from '@/components/layout/Header/Header';
import PopupConfirmAction from '@/components/popup/ConfirmDelete/PopupConfirmAction';
import { getCustomerBooking, cancelBookingByCustomer } from '@/services/features/booking/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/services/store/store';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CreateFeedback from '../../../components/service/CreateFeedback';

const ViewBookingPage = () => {
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector((state) => state.auth);
    const { customerBooking } = useAppSelector((state) => state.bookings);
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // feedback state
    const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
    const [feedbackData, setFeedbackData] = useState<{ bookingId: number; serviceId: number; customerId: number } | null>(null);

    useEffect(() => {
        if (auth?.id !== undefined) {
            dispatch(getCustomerBooking({ customerId: auth.id }));
        }
    }, [dispatch, auth?.id]);

    const handleCancelClick = (bookingId: number) => {
        setSelectedBookingId(bookingId);
        setIsPopupOpen(true);
    };

    const handleConfirmCancel = () => {
        if (selectedBookingId !== null && auth?.id) {
            setLoading(true);
            dispatch(cancelBookingByCustomer({ bookingId: selectedBookingId }))
                .unwrap()
                .then(() => {
                    dispatch(getCustomerBooking({ customerId: auth.id }));
                })
                .catch((error) => {
                    toast.error(error.message);
                })
                .finally(() => {
                    setLoading(false);
                    setIsPopupOpen(false);
                });
        } else {
            toast.error("User is not authenticated.");
        }
    };
    // feedback
    const handleFeedbackClick = (bookingId: number, serviceId: number) => {
        setFeedbackData({ bookingId, serviceId, customerId: auth?.id || 0 });
        setIsFeedbackPopupOpen(true);
    };

    const closeFeedbackPopup = () => {
        setIsFeedbackPopupOpen(false);
        setFeedbackData(null); // Clear feedback data when popup is closed
    };
    // Sort the bookings based on the date in descending order
    const sortedBookings = customerBooking?.slice().sort((a, b) => {
        const dateA = new Date(parseInt(a.date));
        const dateB = new Date(parseInt(b.date));
        return dateB.getTime() - dateA.getTime(); // Sort descending
    });

    return (
        <div className="relative min-h-screen bg-gray-900 text-gray-200">
            <div className="relative z-10">
                <Header />
                <div className="container mx-auto pt-36 pb-20 px-10">
                    {loading && <div className="text-center text-white mb-4">Processing...</div>}
                    <div className="md:flex md:space-x-16 justify-center">
                        <table className="min-w-full table-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                            <thead className="bg-gray-900 text-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left uppercase font-medium text-gray-300">Service Name</th>
                                    <th className="px-6 py-3 text-left uppercase font-medium text-gray-300">Stylist</th>
                                    <th className="px-6 py-3 text-left uppercase font-medium text-gray-300">Application Day</th>
                                    <th className="px-6 py-3 text-center uppercase font-medium text-gray-300">Status</th>
                                    <th className="px-6 py-3 text-center uppercase font-medium text-gray-300">Action</th>
                                    <th className="px-6 py-3 text-center uppercase font-medium text-gray-300">Feedback</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {sortedBookings && sortedBookings.map((booking) => (
                                    booking.services.map((service, i) => (
                                        <tr key={`${booking.id}-${service.id}`} className={` hover:bg-gray-600 transition duration-200`}>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{service.name}</td>
                                            <td className="px-6 py-4 text-gray-300">{booking.stylistDataBooking?.firstName || 'N/A'}</td>
                                            <td className="px-6 py-4 text-gray-300">
                                                {booking.timeTypeDataBooking.valueEn} {new Date(parseInt(booking.date)).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block 
                        ${booking.statusId === 'S1' ? 'bg-yellow-400 text-gray-900' :
                                                        booking.statusId === 'S2' ? 'bg-blue-400 text-gray-900' :
                                                            booking.statusId === 'S3' ? 'bg-green-500 text-white' :
                                                                'bg-red-400 text-gray-900'}`}>
                                                    {booking.statusId === 'S1' && 'Pending'}
                                                    {booking.statusId === 'S2' && 'Confirm'}
                                                    {booking.statusId === 'S3' && 'Complete'}
                                                    {booking.statusId === 'S4' && 'Cancel'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {i === 0 && booking.statusId === 'S1' ? (
                                                    <button
                                                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-lg transition-colors duration-200"
                                                        onClick={() => handleCancelClick(booking.id)}
                                                    >
                                                        Cancel
                                                    </button>
                                                ) : (
                                                    <span className="inline-block px-4 py-2 text-xs font-semibold rounded-full w-full text-center">
                                                        {booking.statusId === 'S2' && '\u00A0'}
                                                        {booking.statusId === 'S3' && '\u00A0'}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {booking.statusId === 'S3' && (
                                                    <button
                                                        key={service.id}
                                                        className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md shadow-lg transition-colors duration-200"
                                                        onClick={() => handleFeedbackClick(booking.id, service.id)}
                                                    >
                                                        Feedback
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
                <PopupConfirmAction
                    title="Are you sure you want to cancel this booking?"
                    content="This action cannot be undone."
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onConfirm={handleConfirmCancel}
                    actionCancel="No"
                    actionDelete="Yes, Cancel"
                />
                {feedbackData && (
                    <CreateFeedback
                        isOpen={isFeedbackPopupOpen}
                        onClose={closeFeedbackPopup}
                        bookingId={feedbackData.bookingId}
                        serviceId={feedbackData.serviceId}
                        customerId={feedbackData.customerId}
                    />
                )}
            </div>
        </div>
    );
};

export default ViewBookingPage;