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

const TableStaff = () => {
    const dispatch = useAppDispatch();

    const { bookings } = useAppSelector(state => state.bookings); // Lấy danh sách bookings từ store
    const { stylists } = useAppSelector(state => state.stylists); // Lấy danh sách stylists từ store

    const [selectedDate, setSelectedDate] = useState<string>(""); // Ngày đã chọn
    // const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    // Lấy danh sách booking khi ngày thay đổi
    useEffect(() => {
        if (selectedDate) {
            const timestamp = new Date(selectedDate).getTime(); // Chuyển đổi ngày thành timestamp
            dispatch(getAllBooking({ date: timestamp.toString() })); // Gọi action để fetch bookings theo ngày
        }
    }, [selectedDate, dispatch]);

    return (
        <>
            {/* Date Picker để chọn ngày */}

            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">Staff Booking Management
                </h2>
                <button
                    className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold"
                // onClick={() => setIsCreatePopupOpen(true)} // Sử dụng trạng thái riêng
                >
                    Create Shedule
                </button>
            </div>
            <div className="my-4">
                <label htmlFor="date-picker" className="font-bold">Select Date:</label>
                <input
                    type="date"
                    id="date-picker"
                    className="ml-2 p-2 border border-gray-300 rounded"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Không cho phép chọn ngày trong quá khứ
                />
            </div>
            {/* Bảng hiển thị bookings */}
            {selectedDate && (
                <Table className="mt-8">
                    <TableCaption>Bookings for {new Date(selectedDate).toLocaleDateString()}.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Stylist Name</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings && bookings
                            .filter(booking => {
                                // Lọc bookings theo ngày đã chọn
                                const bookingDate = new Date(parseInt(booking.date));
                                const selected = new Date(selectedDate);

                                return bookingDate.toLocaleDateString() === selected.toLocaleDateString();
                            })
                            .map((booking) => {
                                // Tìm stylist từ danh sách stylists
                                const stylist = stylists?.find(stylist => stylist.id === booking.stylistId);

                                return (
                                    <TableRow key={booking.id}>
                                        <TableCell>{stylist ? `${stylist.firstName} ${stylist.lastName}` : "Unknown Stylist"}</TableCell>
                                        <TableCell>{booking.customerData.firstName}</TableCell>
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
