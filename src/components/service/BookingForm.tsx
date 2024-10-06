import { getAllService } from "@/services/features/service/serviceSlice";
import { getAllStylist } from "@/services/features/stylist/stylistSlice";
import { getAllTime } from "@/services/features/timeBooking/timeBookingSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Import react-hook-form

// Định nghĩa kiểu dữ liệu cho form


interface FormData {
    phone: string;
    fullname: string;
    stylistId: string;
    service: string;
    date: string;
    time: string;
    note?: string; // Note có thể không bắt buộc
}



const BookingForm = () => {
    const dispatch = useAppDispatch();
    const [showService, setShowService] = useState(false);
    const [showStylist, setShowStylist] = useState(false);

    const { stylists } = useAppSelector((state) => state.stylists);
    const { services } = useAppSelector((state) => state.services);
    const { times } = useAppSelector((state) => state.times);
    // Sử dụng useForm với kiểu dữ liệu FormData
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        dispatch(getAllService());
        dispatch(getAllStylist());
        dispatch(getAllTime());
        setShowService(true);
        setShowStylist(true);
    }, [dispatch]);

    // Xử lý submit với kiểu dữ liệu FormData
    const onSubmit = (data: FormData) => {
        console.log(data); // Console log dữ liệu form khi submit
        // dispatch data ở đây

    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#201717] p-8 rounded-md shadow-md text-white">
            <p className="text-red-500 font-semibold text-sm mb-4">* Vui lòng nhập thông tin bắt buộc</p>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Số điện thoại *</label>
                <input
                    type="text"
                    {...register("phone", { required: true })} // Sử dụng register từ react-hook-form
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.phone && <span className="text-red-500">Số điện thoại là bắt buộc</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Họ và tên *</label>
                <input
                    type="text"
                    {...register("fullname", { required: true })}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.fullname && <span className="text-red-500">Họ và tên là bắt buộc</span>}
            </div>

            <div className="border-t border-zinc-700 my-4"></div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Yêu cầu kĩ thuật viên *</label>
                {showStylist && (
                    <select
                        {...register("stylistId", { required: true })}
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                    >
                        <option value="" disabled selected>Chọn kĩ thuật viên</option>
                        {stylists && stylists.map((stylist) => (
                            <option key={stylist.id} value={stylist.id}>{stylist.firstName} {stylist.lastName}</option>
                        ))}
                    </select>
                )}
                {errors.stylistId && <span className="text-red-500">Kĩ thuật viên là bắt buộc</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Dịch vụ *</label>
                {showService && (
                    <select
                        {...register("service", { required: true })}
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                    >
                        <option value="" disabled selected>Chọn dịch vụ</option>
                        {services && services.map((service) => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                )}
                {errors.service && <span className="text-red-500">Dịch vụ là bắt buộc</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Ngày đặt lịch *</label>
                <input
                    type="date"
                    {...register("date", { required: true })}
                    min={new Date().toISOString().split("T")[0]} // Set min to today's date
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.date && <span className="text-red-500">Ngày đặt lịch là bắt buộc</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Chọn khung giờ dịch vụ *</label>
                <div className="grid grid-cols-4 gap-2">
                    {times && times.map((time, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`p-3 rounded border ${watch("time") === time.keyMap.toString() ? "bg-yellow-500 text-black" : "bg-white text-black"
                                } focus:outline-none hover:bg-yellow-400`}
                            onClick={() => setValue("time", time.keyMap.toString())} // Set time id as the value
                        >
                            {time.valueEn} {/* Display the time value */}
                        </button>
                    ))}
                </div>
                {errors.time && <span className="text-red-500">Khung giờ là bắt buộc</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Ghi chú</label>
                <textarea
                    {...register("note")}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
            </div>

            <button type="submit" className="bg-yellow-600 text-black py-3 px-4 rounded hover:bg-yellow-500">
                Đặt lịch
            </button>
        </form>
    );
};

export default BookingForm;
