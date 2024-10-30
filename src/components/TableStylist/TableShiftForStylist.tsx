import { getBookingForStylist } from "@/services/features/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { completeBookingByStylist } from "@/services/features/stylist/stylistSlice";

const TableShiftForStylist = () => {
    // Get bookings and stylist data from the store
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector((state) => state.auth);
    const { bookings } = useAppSelector((state) => state.bookings);

    // Component state
    const [selectedDate, setSelectedDate] = useState<string>(""); // Selected date
    const [loading, setLoading] = useState(false); // Loading state for data fetch

    // Set today's date as default on component mount
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in 'yyyy-mm-dd' format
        setSelectedDate(today); // Set selected date to today
    }, []);

    // Fetch bookings when the date changes
    useEffect(() => {
        if (selectedDate) {
            const timestamp = new Date(selectedDate).getTime().toString(); // Convert date to timestamp
            setLoading(true);
            dispatch(
                getBookingForStylist({
                    stylistId: Number(auth?.id),
                    date: timestamp,
                })
            ).finally(() => setLoading(false));
        }
    }, [selectedDate, dispatch, auth?.id]);

    const handleCompleteBooking = (bookingId: number, email: string) => {
        dispatch(completeBookingByStylist({ bookingId, email })).then(() => {
            dispatch(
                getBookingForStylist({
                    stylistId: Number(auth?.id),
                    date: new Date(selectedDate).getTime().toString(),
                })
            );
        });
    };

    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">Schedule for me</h2>
            </div>
            <div className="my-4">
                <label htmlFor="date-picker" className="font-bold">
                    Select Date:
                </label>
                <input
                    type="date"
                    id="date-picker"
                    className="ml-2 p-2 border border-gray-300 rounded"
                    value={selectedDate} // Set the value to the current selected date
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Prevent past date selection
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
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/5">
                                Customer Name
                            </TableHead>
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/5">
                                Email
                            </TableHead>
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/6">
                                Time
                            </TableHead>
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/6">
                                Status
                            </TableHead>
                            <TableHead className="p-4 text-left text-gray-600 font-bold w-1/6">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings && bookings.length > 0 ? (
                            bookings
                                .filter((booking) => {
                                    const bookingDate = new Date(parseInt(booking.date));
                                    const selected = new Date(selectedDate);
                                    return (
                                        bookingDate.toLocaleDateString() ===
                                        selected.toLocaleDateString()
                                    );
                                })
                                .map((booking) => {
                                    return (
                                        <TableRow
                                            key={booking.id}
                                            className="odd:bg-gray-50 even:bg-white hover:bg-gray-100"
                                        >
                                            <TableCell className="p-4">
                                                {booking.customerData.firstName}
                                            </TableCell>
                                            <TableCell className="p-4">
                                                {booking.customerData.email}
                                            </TableCell>
                                            <TableCell className="p-4">
                                                {booking.timeTypeDataBooking.valueEn}
                                            </TableCell>
                                            <TableCell className="p-4">
                                                {booking.statusId === "S1" && (
                                                    <span className="text-yellow-500 font-semibold">
                                                        Pending
                                                    </span>
                                                )}
                                                {booking.statusId === "S2" && (
                                                    <span className="text-blue-500 font-semibold">
                                                        Confirm
                                                    </span>
                                                )}
                                                {booking.statusId === "S3" && (
                                                    <span className="text-green-500 font-semibold">
                                                        Complete
                                                    </span>
                                                )}
                                                {booking.statusId === "S4" && (
                                                    <span className="text-red-500 font-semibold">
                                                        Cancelled
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="p-4">
                                                {booking.statusId === "S2" && (
                                                    <button
                                                        className="text-green-500"
                                                        onClick={() =>
                                                            handleCompleteBooking(
                                                                booking.id,
                                                                booking.customerData.email
                                                            )
                                                        }
                                                    >
                                                        Complete
                                                    </button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="p-4 text-center text-gray-500"
                                >
                                    No bookings found for the selected date.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}

            {/* Loading state */}
            {loading && (
                <div className="text-center text-gray-700 mt-4">Loading bookings...</div>
            )}
        </>
    );
};

export default TableShiftForStylist;
