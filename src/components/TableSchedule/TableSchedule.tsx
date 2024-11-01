import { useEffect, useState } from "react";
import { ITimeBooking } from "@/interfaces/Time";
import { getAllTimeByStylist } from "@/services/features/timeBooking/timeBookingSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import CreateSchedulePopup from "../popup/CreateSchedule/CreateSchedulePopup";

interface FormData {
    stylistId: string;
    date: string;
}

const TableSchedule = () => {
    const dispatch = useAppDispatch();
    const { stylists } = useAppSelector((state) => state.stylists);
    const [availableTimes, setAvailableTimes] = useState<ITimeBooking[]>([]);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const stylistId = watch("stylistId");
    const date = watch("date");

    useEffect(() => {
        if (stylistId && date) {
            const timestamp = new Date(date).getTime();

            dispatch(getAllTimeByStylist({ stylistId: Number(stylistId), date: timestamp }))
                .unwrap()
                .then((times) => setAvailableTimes(times))
                .catch((error) => {
                    console.error("Error fetching available times:", error);
                    setAvailableTimes([]);
                });
        }
    }, [stylistId, date, dispatch]);

    const getTimeSlotStatus = (statusTime: string) => {
        return statusTime === "enable" ?
            { text: "Available", color: "text-green-500" } :
            { text: "Booked", color: "text-red-500" };
    };

    return (
        <>
            {isCreatePopupOpen && (
                <CreateSchedulePopup
                    isOpen={isCreatePopupOpen}
                    onClose={() => setIsCreatePopupOpen(false)}
                />
            )}

            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-2xl text-gray-800">Stylist Schedule</h2>
                <button
                    className="border border-green-700 bg-green-600 hover:bg-green-500 p-2 rounded-lg text-white font-bold transition-colors"
                    onClick={() => setIsCreatePopupOpen(true)}
                >
                    Create Schedule
                </button>
            </div>

            <div className="p-8 bg-white shadow-lg rounded-xl">
                <form onSubmit={handleSubmit(() => { })}>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Select Stylist *</label>
                        <select
                            {...register("stylistId", { required: true })}
                            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Choose a stylist</option>
                            {stylists && stylists.map((stylist) => (
                                <option key={stylist.id} value={stylist.id}>{`${stylist.lastName} ${stylist.firstName}`}</option>
                            ))}
                        </select>
                        {errors.stylistId && <span className="text-red-500 text-sm">Stylist is required</span>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Select Date *</label>
                        <input
                            type="date"
                            {...register("date", { required: true })}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.date && <span className="text-red-500 text-sm">Date is required</span>}
                    </div>
                </form>

                {stylistId && date && (
                    <Table className="mt-8 w-full">
                        <TableCaption className="text-sm text-gray-500">Available time slots for stylist on {new Date(date).toLocaleDateString()}.</TableCaption>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="text-left p-4 text-gray-700 font-medium">Time Slot</TableHead>
                                <TableHead className="text-left p-4 text-gray-700 font-medium">Stylist Name</TableHead>
                                <TableHead className="text-left p-4 text-gray-700 font-medium">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {availableTimes.length > 0 ? (
                                availableTimes.map((time) => {
                                    const status = getTimeSlotStatus(time.statusTime);
                                    return (
                                        <TableRow key={time.id} className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="p-4">{time.timeTypeData?.valueEn}</TableCell>
                                            <TableCell className="p-4">{`${time.stylistData?.lastName} ${time.stylistData?.firstName}`}</TableCell>
                                            <TableCell className={`p-4 font-semibold ${status.color}`}>{status.text}</TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="p-4 text-center text-gray-500">No available time slots for this date.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    );
};

export default TableSchedule;
