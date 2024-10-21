import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { createSchedule, getAllTime } from "@/services/features/timeBooking/timeBookingSlice";
import { getAllStylist } from "@/services/features/stylist/stylistSlice";

interface CreateSchedulePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateSchedulePopup: React.FC<CreateSchedulePopupProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();

    const { times } = useAppSelector(state => state.times); // Fetch available time slots
    const { stylists } = useAppSelector(state => state.stylists); // Fetch stylists

    const [selectedStylist, setSelectedStylist] = useState<number | null>(null); // Stylist selection
    const [selectedDate, setSelectedDate] = useState<string>(""); // Date selection
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]); // Selected time slots

    useEffect(() => {
        if (isOpen) {
            dispatch(getAllTime(),
            );
            dispatch(getAllStylist()) // Fetch available time slots when popup opens
        }
    }, [isOpen, dispatch]);


    const toggleTimeSelection = (timeKey: string) => {
        if (selectedTimes.includes(timeKey)) {
            setSelectedTimes(selectedTimes.filter(time => time !== timeKey));
        } else {
            setSelectedTimes([...selectedTimes, timeKey]);
        }
    };

    const handleSubmit = () => {
        if (selectedStylist && selectedDate && selectedTimes.length > 0) {
            const dateTimestamp = new Date(selectedDate).getTime(); // Convert date to timestamp
            const arrSchedule = selectedTimes.map(timeType => ({
                stylistId: selectedStylist,
                date: dateTimestamp,
                timeType,
            }));

            dispatch(createSchedule({ arrSchedule })); // Dispatch createSchedule action
            onClose(); // Close popup after submission
        } else {
            alert("Please select stylist, date, and time slots.");
        }
    };

    if (!isOpen) return null;

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="font-bold text-lg text-center mb-4">Create Schedule</h2>

                {/* Stylist selection */}
                <div className="my-4">
                    <label htmlFor="stylist-select" className="block mb-2 font-bold">Select Stylist:</label>
                    <select
                        id="stylist-select"
                        value={selectedStylist || ""}
                        onChange={(e) => setSelectedStylist(Number(e.target.value))}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="">Select a stylist</option>
                        {stylists && stylists.map(stylist => (
                            <option key={stylist.id} value={stylist.id}>
                                {`${stylist.firstName} ${stylist.lastName || ""}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date selection */}
                <div className="my-4">
                    <label htmlFor="date-picker" className="block mb-2 font-bold">Select Date:</label>
                    <input
                        type="date"
                        id="date-picker"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        min={today} // Disable past dates
                    />
                </div>

                {/* Time slot selection */}
                <div className="my-4">
                    <label className="block mb-2 font-bold">Select Time Slots:</label>
                    <div className="grid grid-cols-3 gap-2">
                        {times && times.map(time => (
                            <button
                                key={time.keyMap}
                                type="button"
                                className={`border p-2 rounded ${selectedTimes.includes(time.keyMap) ? "bg-green-600 text-white" : "bg-gray-100"
                                    }`}
                                onClick={() => toggleTimeSelection(time.keyMap)}
                            >
                                {time.valueVi} {/* Display time in Vietnamese */}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit and Cancel buttons */}
                <div className="flex justify-end mt-6">
                    <button
                        className="border border-gray-300 rounded p-2 bg-green-600 text-white font-bold"
                        onClick={handleSubmit}
                    >
                        Save Schedule
                    </button>
                    <button
                        className="border border-gray-300 rounded p-2 bg-red-600 text-white font-bold ml-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateSchedulePopup;
