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
import { getAllBooking } from "@/services/features/booking/bookingSlice"; // Action to fetch bookings
import CreateSchedulePopup from "../popup/CreateSchedule/CreateSchedulePopup";

const TableStaff = () => {
    const dispatch = useAppDispatch();

    const { bookings } = useAppSelector(state => state.bookings); // Fetch bookings from the store
    const { stylists } = useAppSelector(state => state.stylists); // Fetch stylists from the store

    const [selectedDate, setSelectedDate] = useState<string>(""); // Selected date
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false); // State to control the popup

    // Fetch bookings when the date changes
    useEffect(() => {
        if (selectedDate) {
            const timestamp = new Date(selectedDate).getTime(); // Convert date to timestamp
            dispatch(getAllBooking({ date: timestamp.toString() })); // Dispatch action to fetch bookings for the selected date
        }
    }, [selectedDate, dispatch]);

    return (
        <>
            {/* Create Schedule Popup */}
            {isCreatePopupOpen && (
                <CreateSchedulePopup
                    isOpen={isCreatePopupOpen}
                    onClose={() => setIsCreatePopupOpen(false)} // Close popup handler
                />
            )}

            {/* Date Picker to select date */}
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">Staff Booking Management</h2>
                <button
                    className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold"
                    onClick={() => setIsCreatePopupOpen(true)} // Open popup when clicked
                >
                    Create Schedule
                </button>
            </div>

            <div className="my-4">
                <label htmlFor="date-picker" className="font-bold">Select Date:</label>
                <input
                    type="date"
                    id="date-picker"
                    className="ml-2 p-2 border border-gray-300 rounded"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Prevent selection of past dates
                />
            </div>

            {/* Display bookings table */}
            {selectedDate && (
                <Table className="mt-8">
                    <TableCaption>Bookings for {new Date(selectedDate).toLocaleDateString()}.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Stylist Name</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings && bookings
                            .filter(booking => {
                                // Filter bookings by selected date
                                const bookingDate = new Date(parseInt(booking.date));
                                const selected = new Date(selectedDate);
                                return bookingDate.toLocaleDateString() === selected.toLocaleDateString();
                            })
                            .map((booking) => {
                                // Find stylist from stylists array
                                const stylist = stylists?.find(stylist => stylist.id === booking.stylistId);

                                return (
                                    <TableRow key={booking.id}>
                                        <TableCell>{stylist ? `${stylist.firstName} ${stylist.lastName}` : "Unknown Stylist"}</TableCell>
                                        <TableCell>{booking.customerData.firstName}</TableCell>
                                        <TableCell>{booking.customerData.email}</TableCell>
                                        <TableCell>{booking.timeTypeDataBooking.valueEn}</TableCell>
                                        <TableCell>
                                            {booking.statusId === 'S1' && 'Pending'}
                                            {booking.statusId === 'S2' && 'Confirm'}
                                            {booking.statusId === 'S3' && 'Success'}
                                            {booking.statusId === 'S4' && 'Cancel'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <button
                                                className="border border-slate-600 p-2 rounded-lg text-white bg-red-600 font-bold ml-2"
                                                onClick={() => console.log(`Cancel booking ${booking.id}`)}
                                            >
                                                Cancel
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default TableStaff;
