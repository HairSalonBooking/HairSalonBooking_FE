import Header from '@/components/layout/Header/Header';
import { getCustomerBooking } from '@/services/features/booking/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/services/store/store';
import { useEffect } from 'react';


const ViewBookingPage = () => {
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector((state) => state.auth);
    const { customerBooking } = useAppSelector((state) => state.bookings)
    // Fetch user points when the component mounts or auth changes
    useEffect(() => {
        if (auth?.id !== undefined) {
            dispatch(getCustomerBooking({ customerId: auth.id }));
        }
    }, [dispatch, auth?.id]);
    return (
        <div className="relative min-h-screen bg-gray-900 text-gray-200">
            <div className="relative z-10">
                <Header />
                <div className="container mx-auto pt-36 pb-20 px-10">
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
                                        <td className="border border-gray-700 px-4 py-2">{"DDDD"}</td>
                                        <td className="border border-gray-700 px-4 py-2">{"DDDD"}</td>
                                        <td className="border border-gray-700 px-4 py-2">{booking.timeTypeDataBooking.valueEn} {new Date(parseInt(booking.date)).toLocaleDateString()}

                                        </td>
                                        <td className="border border-gray-700 px-4 py-2">
                                            {booking.statusId === 'S1' && 'Pending'}
                                            {booking.statusId === 'S2' && 'Confirm'}
                                            {booking.statusId === 'S3' && 'Success'}
                                            {booking.statusId === 'S4' && 'Cancel'}
                                        </td>
                                        <td className="border border-gray-700 px-4 py-2">
                                            <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-700 rounded-md">
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBookingPage;
