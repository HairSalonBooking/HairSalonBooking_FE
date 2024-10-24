import { useEffect, useState } from "react";
import { ITimeBooking } from "@/interfaces/Time";
import { getAllTimeByStylist } from "@/services/features/timeBooking/timeBookingSlice";
import { getAllBooking } from "@/services/features/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";

interface FormData {
    stylistId: string;
    date: string;
}

const TableSchedule = () => {
    const dispatch = useAppDispatch();
    const { stylists } = useAppSelector((state) => state.stylists); // Get stylists from the store
    const { bookings } = useAppSelector((state) => state.bookings); // Get bookings from the store
    const [availableTimes, setAvailableTimes] = useState<ITimeBooking[]>([]); // Available time slots

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const stylistId = watch("stylistId");
    const date = watch("date");

    // Fetch available times and bookings when stylistId and date are selected
    useEffect(() => {
        if (stylistId && date) {
            const timestamp = new Date(date).getTime(); // Convert date to timestamp

            // Fetch available time slots for the stylist
            dispatch(getAllTimeByStylist({ stylistId: Number(stylistId), date: timestamp }))
                .unwrap()
                .then((times) => setAvailableTimes(times))
                .catch((error) => {
                    console.error("Error fetching available times:", error);
                    setAvailableTimes([]);
                });

            // Fetch all bookings for the selected date
            dispatch(getAllBooking({ date: timestamp.toString() }));
        }
    }, [stylistId, date, dispatch]);

    // Function to check the booking status for a specific time slot
    const getTimeSlotStatus = (timeType: string) => {
        const booking = bookings && bookings.find(
            (b) => b.stylistId === Number(stylistId) && b.timeType === timeType
        );

        // Determine the status based on booking statusId
        if (booking) {
            if (booking.statusId === 'S1' || booking.statusId === 'S2') {
                return "Already Booked"; // Pending or Confirmed means Already Booked
            } else if (booking.statusId === 'S3' || booking.statusId === 'S4') {
                return "Not Yet Booked"; // Success or Cancel means Not Yet Booked
            }
        }
        return "Not Yet Booked"; // Default status if no booking found
    };

    return (
        <div className="p-8">
            <h2 className="font-bold text-xl mb-4">Stylist Schedule</h2>

            {/* Form for selecting stylist and date */}
            <form onSubmit={handleSubmit(() => { })}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Select Stylist *</label>
                    <select
                        {...register("stylistId", { required: true })}
                        className="w-full p-3 bg-gray-200 border border-gray-300 text-black rounded"
                    >
                        <option value="">Choose a stylist</option>
                        {stylists && stylists.map((stylist) => (
                            <option key={stylist.id} value={stylist.id}>{`${stylist.lastName} ${stylist.firstName}`}</option>
                        ))}
                    </select>
                    {errors.stylistId && <span className="text-red-500">Stylist is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Select Date *</label>
                    <input
                        type="date"
                        {...register("date", { required: true })}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full p-3 bg-gray-200 border border-gray-300 text-black rounded"
                    />
                    {errors.date && <span className="text-red-500">Date is required</span>}
                </div>
            </form>

            {/* Display available time slots */}
            {stylistId && date && (
                <Table className="mt-8">
                    <TableCaption>Available time slots for stylist on {new Date(date).toLocaleDateString()}.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time Slot</TableHead>
                            <TableHead>Stylist Name</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {availableTimes.length > 0 ? (
                            availableTimes.map((time) => (
                                <TableRow key={time.id}>
                                    <TableCell>{time.timeTypeData?.valueEn}</TableCell>
                                    <TableCell>{`${time.stylistData?.lastName} ${time.stylistData?.firstName}`}</TableCell>
                                    <TableCell>{getTimeSlotStatus(time.timeType)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>No available time slots for this date.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default TableSchedule;
