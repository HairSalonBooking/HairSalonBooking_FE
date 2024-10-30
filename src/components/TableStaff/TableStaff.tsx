import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { getAllBooking, cancelBookingByStaff } from "@/services/features/booking/bookingSlice";
import PopupConfirmAction from "@/components/popup/ConfirmDelete/PopupConfirmAction";

const TableStaff = () => {
    const dispatch = useAppDispatch();
    const { bookings } = useAppSelector(state => state.bookings);

    const [selectedDate, setSelectedDate] = useState<string>(""); // Selected date
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
    const [selectedFirstName, setSelectedFirstName] = useState<string | null>(null);
    const [selectedStylistName, setSelectedStylistName] = useState<string | null>(null);
    const [selectedTimeString, setSelectedTimeString] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Set default date to today's date when component is mounted
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in 'yyyy-mm-dd' format
        setSelectedDate(today); // Set selected date to today
    }, []);

    // Fetch bookings when the date changes
    useEffect(() => {
        if (selectedDate) {
            const timestamp = new Date(selectedDate).getTime(); // Convert date to timestamp
            dispatch(getAllBooking({ date: timestamp.toString() })); // Dispatch action to fetch bookings for the selected date
        }
    }, [selectedDate, dispatch]);

    // Handle click on "Cancel" button
    const handleCancelClick = (bookingId: number, email: string, firstName: string, stylistName: string, timeString: string) => {
        setSelectedBookingId(bookingId);
        setSelectedEmail(email);
        setSelectedFirstName(firstName);
        setSelectedStylistName(stylistName);
        setSelectedTimeString(timeString);
        setIsPopupOpen(true); // Open popup
    };

    // Confirm cancel action
    const handleConfirmCancel = () => {
        if (selectedBookingId !== null && selectedEmail && selectedFirstName && selectedStylistName && selectedTimeString) {
            setLoading(true);
            // Gửi toàn bộ payload
            dispatch(cancelBookingByStaff({
                bookingId: selectedBookingId,
                email: selectedEmail,
                firstName: selectedFirstName,
                stylistName: selectedStylistName,
                timeString: selectedTimeString
            }))
                .unwrap()
                .then(() => {
                    dispatch(getAllBooking({ date: new Date(selectedDate).getTime().toString() })); // Refresh booking list after cancellation
                })
                .finally(() => {
                    setLoading(false);
                    setIsPopupOpen(false); // Close popup
                });
        }
    };

    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">Staff Booking Management</h2>
            </div>
            <div className="my-4">
                <label htmlFor="date-picker" className="font-bold">Select Date:</label>
                <input
                    type="date"
                    id="date-picker"
                    className="ml-2 p-2 border border-gray-300 rounded"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            {/* Display bookings table */}
            {selectedDate && (
                <Table className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
                    <TableCaption className="text-lg font-semibold text-gray-700">
                        Bookings for {new Date(selectedDate).toLocaleDateString()}.
                    </TableCaption>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/5">Stylist Name</TableHead>
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/5">Customer Name</TableHead>
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/5">Email</TableHead>
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/6">Time</TableHead>
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/6">Status</TableHead>
                            <TableHead className="p-4 text-right text-gray-600 font-bold w-32">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings && bookings.length > 0 ? (
                            bookings
                                .filter(booking => {
                                    const bookingDate = new Date(parseInt(booking.date));
                                    const selected = new Date(selectedDate);
                                    return bookingDate.toLocaleDateString() === selected.toLocaleDateString();
                                })
                                .map((booking) => {

                                    return (
                                        <TableRow key={booking.id} className="odd:bg-gray-50 even:bg-white hover:bg-gray-100">
                                            {/* <TableCell className="p-4">{stylist ? `${stylist.firstName} ${stylist.lastName}` : "Unknown Stylist"}</TableCell> */}
                                            <TableCell className="p-4">{booking.stylistDataBooking.firstName} {booking.stylistDataBooking.lastName}</TableCell>
                                            <TableCell className="p-4">{booking.customerData.firstName}</TableCell>
                                            <TableCell className="p-4">{booking.customerData.email}</TableCell>
                                            <TableCell className="p-4">{booking.timeTypeDataBooking.valueEn}</TableCell>
                                            <TableCell className="p-4">
                                                {booking.statusId === 'S1' && <span className="text-yellow-500 font-semibold">Pending</span>}
                                                {booking.statusId === 'S2' && <span className="text-blue-500 font-semibold">Confirm</span>}
                                                {booking.statusId === 'S3' && <span className="text-green-500 font-semibold">Complete</span>}
                                                {booking.statusId === 'S4' && <span className="text-red-500 font-semibold">Cancelled</span>}
                                            </TableCell>
                                            <TableCell className="p-4 text-right w-32">
                                                {(booking.statusId === 'S1' || booking.statusId === 'S2') ? (
                                                    <button
                                                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-lg transition-colors duration-200"
                                                        onClick={() => handleCancelClick(
                                                            booking.id,
                                                            booking.customerData.email,
                                                            booking.customerData.firstName,
                                                            `${booking.stylistDataBooking.firstName} ${booking.stylistDataBooking.lastName}`,
                                                            booking.timeTypeDataBooking.valueEn
                                                        )}
                                                    >
                                                        Cancel
                                                    </button>
                                                ) : (
                                                    <span className="inline-block px-4 py-2 text-xs font-semibold rounded-full w-full text-center">
                                                        {booking.statusId === 'S3' && '\u00A0'}
                                                        {booking.statusId === 'S4' && '\u00A0'}
                                                    </span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="p-4 text-center text-gray-500">
                                    No bookings found for the selected date.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}

            {/* Popup Confirm Cancel */}
            <PopupConfirmAction
                title="Are you sure you want to cancel this booking?"
                content="This action cannot be undone."
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onConfirm={handleConfirmCancel}
                actionCancel="No"
                actionDelete="Yes, Cancel"
                loading={loading} // Truyền trạng thái loading

            />

            {/* Loading state */}
            {loading && <div className="text-center text-white mt-4">Processing...</div>}
        </>
    );
};

export default TableStaff;
