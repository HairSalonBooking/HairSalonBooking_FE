import { getAllService } from "@/services/features/service/serviceSlice";
import { getAllStylist } from "@/services/features/stylist/stylistSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import React, { useEffect, useState } from "react";
const BookingForm = () => {
    const dispatch = useAppDispatch();
    const [showService, setShowService] = useState(false);
    const [showStylist, setShowStylist] = useState(false);

    const { stylists } = useAppSelector((state) => state.stylists);
    const { services } = useAppSelector((state) => state.services);

    useEffect(() => {
        dispatch(getAllService())
        dispatch(getAllStylist())
        setShowService(true)
        setShowStylist(true)
    }, [dispatch]);


    const [formData, setFormData] = useState({
        phone: "",
        name: "",
        stylist: "",
        service: "",
        date: "",
        time: "",
        note: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // Handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#201717] p-8 rounded-md shadow-md text-white"> {/* Nền form */}
            <p className="text-red-500 font-semibold text-sm mb-4">* Vui lòng nhập thông tin bắt buộc</p>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Số điện thoại *</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Họ và tên *</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
            </div>

            <div className="border-t border-zinc-700 my-4"></div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Yêu cầu kĩ thuật viên *</label>
                {showStylist && (
                    <select
                        name="stylist"
                        value={formData.stylist}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                    >
                        <option value="" disabled selected>Chọn kĩ thuật viên</option>
                        {stylists && stylists.map((stylist) => (
                            <option key={stylist.id} value={stylist.id}>{stylist.firstName} {stylist.lastName}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Dịch vụ *</label>
                {showService && (
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                    >
                        <option value="" disabled selected>Chọn dịch vụ</option>
                        {services && services.map((service) => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Ngày đặt lịch *</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Chọn khung giờ dịch vụ *</label>
                <div className="grid grid-cols-4 gap-2">
                    {["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00"].map((time) => (
                        <button
                            key={time}
                            type="button"
                            className={`p-3 rounded border ${formData.time === time ? "bg-yellow-500 text-black" : "bg-white text-black"
                                } focus:outline-none hover:bg-yellow-400`}
                            onClick={() => setFormData({ ...formData, time })}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Ghi chú</label>
                <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
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
