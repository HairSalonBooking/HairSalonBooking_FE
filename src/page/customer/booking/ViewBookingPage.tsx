import Header from '@/components/layout/Header/Header';
import PopupConfirmAction from '@/components/popup/ConfirmDelete/PopupConfirmAction';
import { getCustomerBooking, cancelBookingByCustomer } from '@/services/features/booking/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/services/store/store';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ViewBookingPage = () => {
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector((state) => state.auth);
    const { customerBooking } = useAppSelector((state) => state.bookings);
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {customerBooking && customerBooking.map((booking, index) => (
                                    <tr key={booking.id} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600 transition duration-200`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            {booking.services.map((service, i) => (
                                                <span key={i}>
                                                    {service.name}
                                                    {i < booking.services.length - 1 ? ", " : ""}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{booking.stylistDataBooking?.firstName || 'N/A'}</td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {booking.timeTypeDataBooking.valueEn} {new Date(parseInt(booking.date)).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block 
                                                ${booking.statusId === 'S1' ? 'bg-yellow-500 text-gray-900' :
                                                    booking.statusId === 'S2' ? 'bg-blue-500 text-gray-900' :
                                                        booking.statusId === 'S3' ? 'bg-green-500 text-gray-900' :
                                                            'bg-red-500 text-gray-900'}`}>
                                                {booking.statusId === 'S1' && 'Pending'}
                                                {booking.statusId === 'S2' && 'Confirm'}
                                                {booking.statusId === 'S3' && 'Success'}
                                                {booking.statusId === 'S4' && 'Cancel'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {booking.statusId === 'S1' ? (
                                                <button
                                                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-lg transition-colors duration-200"
                                                    onClick={() => handleCancelClick(booking.id)}
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <span className="inline-block px-4 py-2 text-xs font-semibold rounded-full w-full text-center
                                                    ${booking.statusId === 'S2' ? 'bg-blue-500 text-gray-900' :
                                                    booking.statusId === 'S3' ? 'bg-green-500 text-gray-900' : 
                                                    'bg-yellow-500 text-gray-900'}">
                                                    {booking.statusId === 'S2' && '\u00A0'}
                                                    {booking.statusId === 'S3' && '\u00A0'}
                                                </span>
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
                    onClose={() => setIsPopupOpen(false)}
                    onConfirm={handleConfirmCancel}
                    actionCancel="No"
                    actionDelete="Yes, Cancel"
                />
            </div>
        </div>
    );
};

export default ViewBookingPage;
