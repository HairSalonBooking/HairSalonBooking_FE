import Header from '@/components/layout/Header/Header';
import PopupConfirmAction from '@/components/popup/ConfirmDelete/PopupConfirmAction';
import { getCustomerBooking, cancleBookingByCustomer } from '@/services/features/booking/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/services/store/store';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ViewBookingPage = () => {
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector((state) => state.auth);
    const { customerBooking } = useAppSelector((state) => state.bookings);
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null); // State for selected booking ID
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup
    const [loading, setLoading] = useState(false); // State for loading status

    useEffect(() => {
        if (auth?.id !== undefined) {
            dispatch(getCustomerBooking({ customerId: auth.id }));
        }
    }, [dispatch, auth?.id]);

    const handleCancelClick = (bookingId: number) => {
        setSelectedBookingId(bookingId); // Set the selected booking ID
        setIsPopupOpen(true); // Open the confirmation popup
    };
    const handleConfirmCancel = () => {
        if (selectedBookingId !== null) {
            if (auth?.id) {  // Kiểm tra nếu auth và auth.id không null hoặc undefined
                setLoading(true); // Start loading
                dispatch(cancleBookingByCustomer({ bookingId: selectedBookingId }))
                    .unwrap()
                    .then(() => {
                        dispatch(getCustomerBooking({ customerId: auth.id })); // Fetch updated bookings
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    })
                    .finally(() => {
                        setLoading(false); // Stop loading
                        setIsPopupOpen(false); // Close the popup
                    });
            } else {
                toast.error("User is not authenticated.");
            }
        }
    };


    return (
        <div className="relative min-h-screen bg-gray-900 text-gray-200">
            <div className="relative z-10">
                <Header />
                <div className="container mx-auto pt-36 pb-20 px-10">
                    {loading && <div className="text-center text-white mb-4">Processing...</div>}
                    <div className="md:flex md:space-x-16 justify-center">
                        <table className="table-auto border-collapse border border-gray-700 text-left">
                            <thead>
                                <tr>
                                    <th className="border border-gray-700 px-4 py-2">Service Name</th>
                                    <th className="border border-gray-700 px-4 py-2">Stylist</th>
                                    <th className="border border-gray-700 px-4 py-2">Application Day</th>
                                    <th className="border border-gray-700 px-4 py-2">Status</th>
                                    <th className="border border-gray-700 px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerBooking && customerBooking.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="border border-gray-700 px-4 py-2">
                                            {booking.services.map((service, index) => (
                                                <span key={index}>
                                                    {service.name}
                                                    {index < booking.services.length - 1 ? " , " : ""}
                                                </span>
                                            ))}
                                        </td>                                        <td className="border border-gray-700 px-4 py-2">{booking.stylistDataBooking.firstName}</td>
                                        <td className="border border-gray-700 px-4 py-2">
                                            {booking.timeTypeDataBooking.valueEn} {new Date(parseInt(booking.date)).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-700 px-4 py-2">
                                            {booking.statusId === 'S1' && 'Pending'}
                                            {booking.statusId === 'S2' && 'Confirm'}
                                            {booking.statusId === 'S3' && 'Success'}
                                            {booking.statusId === 'S4' && 'Cancel'}
                                        </td>
                                        <td className="border border-gray-700 px-4 py-2">
                                            {booking.statusId !== 'S4' && (
                                                <button
                                                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-700 rounded-md"
                                                    onClick={() => handleCancelClick(booking.id)} // Trigger popup with booking ID
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <PopupConfirmAction
                    title="Are you sure you want to cancel this booking?"
                    content="This action cannot be undone."
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)} // Close the popup
                    onConfirm={handleConfirmCancel} // Confirm cancellation
                    actionCancel="No"
                    actionDelete="Yes, Cancel"
                />
            </div>
        </div>
    );
};

export default ViewBookingPage;
