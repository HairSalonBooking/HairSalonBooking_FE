import { getAllService } from "@/services/features/service/serviceSlice";
import { getAllStylist } from "@/services/features/stylist/stylistSlice";
import { getAllTime } from "@/services/features/timeBooking/timeBookingSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
    phone: string;
    fullname: string;
    email: string;
    stylistId: string;
    stylistName: string;
    services: string[];
    date: string;
    timeType: string;
    timeString: string;
    note?: string;
}

const BookingForm = () => {
    const dispatch = useAppDispatch();
    const [showService, setShowService] = useState(false);
    const [showStylist, setShowStylist] = useState(false);
    const [selectedServices, setSelectedServices] = useState<{ id: string, price: number }[]>([{ id: "", price: 0 }]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const { stylists } = useAppSelector((state) => state.stylists);
    const { services } = useAppSelector((state) => state.services);
    const { times } = useAppSelector((state) => state.times);

    const { register, handleSubmit, setValue, watch, formState: { errors }, trigger } = useForm<FormData>();

    useEffect(() => {
        dispatch(getAllService());
        dispatch(getAllStylist());
        dispatch(getAllTime());
        setShowService(true);
        setShowStylist(true);
    }, [dispatch]);

    // Tính tổng số tiền dựa trên các dịch vụ đã chọn
    const calculateTotalAmount = (selectedServices: { id: string, price: number }[]) => {
        const amount = selectedServices.reduce((acc, service) => acc + service.price, 0);
        setTotalAmount(amount);
    };

    // Xử lý khi chọn dịch vụ
    const handleServiceChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedServiceId = Number(event.target.value);
        const service = services?.find((s) => s.id === selectedServiceId);
        if (service) {
            const updatedServices = [...selectedServices];
            updatedServices[index] = { id: service.id.toString(), price: Number(service.price) };
            setSelectedServices(updatedServices);
            calculateTotalAmount(updatedServices);
        }
    };

    // Xử lý thêm ô chọn dịch vụ mới
    const addServiceField = () => {
        setSelectedServices([...selectedServices, { id: "", price: 0 }]);
    };

    // Xóa dịch vụ khỏi danh sách (không thể xóa dịch vụ đầu tiên)
    const removeService = (index: number) => {
        if (index !== 0) {
            const updatedServices = selectedServices.filter((_, i) => i !== index);
            setSelectedServices(updatedServices);
            calculateTotalAmount(updatedServices);
        }
    };

    // Xử lý submit với kiểu dữ liệu FormData
    const onSubmit = (data: FormData) => {
        if (selectedServices.length === 0 || selectedServices[0].id === "") {
            toast.error('Vui lòng chọn ít nhất một dịch vụ');
            return;
        }

        if (!data.timeType) {
            toast.error('Vui lòng chọn khung giờ dịch vụ');
            return;
        }

        // Convert date to timestamp (keeping date as timestamp)
        const date = new Date(data.date).getTime();

        // Convert date and time to formatted string (for timeString)
        const selectedTime = times?.find(time => time.keyMap === data.timeType);
        const formattedDate = new Date(data.date).toLocaleDateString('en-GB'); // Format as "DD/MM/YYYY"
        const timeString = `${formattedDate} - ${selectedTime?.valueEn || ''}`;

        // Get stylist's full name
        const stylist = stylists?.find(s => s.id === Number(data.stylistId));
        const stylistName = stylist ? `${stylist.firstName} ${stylist.lastName}` : '';

        // Convert serviceIds from string[] to number[]
        const serviceIds = selectedServices.map(s => Number(s.id));

        const payload = {
            ...data,
            date,  // Date as timestamp
            timeType: selectedTime?.keyMap,  // Time type (keyMap value)
            timeString,  // Formatted date and time string (e.g., "10/07/2024 - 9PM")
            stylistName,  // FirstName + LastName
            serviceIds,
            amount: totalAmount
        };

        console.log(payload);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#201717] p-8 rounded-md shadow-md text-white">
            <p className="text-red-500 font-semibold text-sm mb-4">* Vui lòng nhập thông tin bắt buộc</p>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Số điện thoại *</label>
                <input
                    type="text"
                    {...register("phone", { required: true })}
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

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email *</label>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.email && <span className="text-red-500">Email là bắt buộc</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Chọn kĩ thuật viên *</label>
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

            <div className="border-t border-zinc-700 my-4"></div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Dịch vụ *</label>
                {showService ? (
                    selectedServices.map((service, index) => (
                        <div key={index} className="flex items-center mb-2 space-x-2 w-full">
                            <select
                                value={service.id}
                                onChange={(event) => handleServiceChange(index, event)}
                                className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                            >
                                <option value="" disabled>Chọn dịch vụ</option>
                                {services?.map((service) => (
                                    <option key={service.id} value={service.id.toString()}>{service.name} - {Number(service.price).toLocaleString()} VND</option>
                                ))}
                            </select>
                            {index !== 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeService(index)}
                                    className="p-2 rounded-full text-red-500 hover:bg-red-200"
                                >
                                    &#x2716;
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Đang tải dịch vụ...</p>
                )}
                <button
                    type="button"
                    onClick={addServiceField}
                    className="bg-white text-black py-2 px-4 rounded mt-2 hover:bg-gray-200"
                >
                    Thêm dịch vụ
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Ngày đặt lịch *</label>
                <input
                    type="date"
                    {...register("date", { required: true })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.date && <span className="text-red-500">Ngày đặt lịch là bắt buộc</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Chọn khung giờ dịch vụ *</label>
                <div className="grid grid-cols-4 gap-2">
                    {times && times.map((timeType, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`p-3 rounded border ${watch("timeType") === timeType.keyMap.toString() ? "bg-yellow-500 text-black" : "bg-white text-black"
                                } focus:outline-none hover:bg-yellow-400`}
                            onClick={() => {
                                setValue("timeType", timeType.keyMap.toString());
                                trigger("timeType"); // Kích hoạt validation sau khi chọn khung giờ
                            }}
                        >
                            {timeType.valueEn}
                        </button>
                    ))}
                </div>
                {errors.timeType && <span className="text-red-500">Khung giờ là bắt buộc</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Ghi chú</label>
                <textarea
                    {...register("note")}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
            </div>

            <div className="mb-4">
                <p className="text-lg font-bold">Tổng tiền: {totalAmount.toLocaleString()} VND</p>
            </div>

            <button type="submit" className="bg-yellow-600 text-black py-3 px-4 rounded hover:bg-yellow-500">
                Đặt lịch
            </button>
        </form>
    );
};

export default BookingForm;
