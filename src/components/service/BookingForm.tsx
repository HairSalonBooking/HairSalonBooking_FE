import { IBookingRequest } from "@/interfaces/Booking";
import { ITimeBooking } from "@/interfaces/Time";
import { customerCreateBooking } from "@/services/features/booking/bookingSlice";
import { getAllService } from "@/services/features/service/serviceSlice";
import { getAllStylist } from "@/services/features/stylist/stylistSlice";
import { getAllTimeByStylist } from "@/services/features/timeBooking/timeBookingSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
    phone: string;
    fullName: string;
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
    const [availableTimes, setAvailableTimes] = useState<ITimeBooking[]>([]);

    const { stylists } = useAppSelector((state) => state.stylists);
    const { services } = useAppSelector((state) => state.services);
    const { times } = useAppSelector((state) => state.times);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        dispatch(getAllService());
        dispatch(getAllStylist());
        setShowService(true);
        setShowStylist(true);
    }, [dispatch]);

    const stylistId = watch("stylistId");
    const date = watch("date");

    useEffect(() => {
        if (stylistId && date) {
            const timestamp = new Date(date).getTime();

            dispatch(getAllTimeByStylist({ stylistId: Number(stylistId), date: timestamp }))
                .unwrap()
                .then((times) => {
                    console.log("Fetched available times:", times); // Log the times for debugging
                    setAvailableTimes(times);
                })
                .catch((error) => {
                    console.error("Error fetching available times:", error);
                    setAvailableTimes([]);
                });
        }
    }, [stylistId, date, dispatch]);

    // Calculate total amount based on selected services
    const calculateTotalAmount = (selectedServices: { id: string, price: number }[]) => {
        const amount = selectedServices.reduce((acc, service) => acc + service.price, 0);
        setTotalAmount(amount);
    };

    // Handle service selection change
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

    // Add new service field
    const addServiceField = () => {
        setSelectedServices([...selectedServices, { id: "", price: 0 }]);
    };

    // Remove service from the list (cannot remove the first service)
    const removeService = (index: number) => {
        if (index !== 0) {
            const updatedServices = selectedServices.filter((_, i) => i !== index);
            setSelectedServices(updatedServices);
            calculateTotalAmount(updatedServices);
        }
    };

    // Handle form submission
    const onSubmit = (data: FormData) => {
        if (selectedServices.length === 0 || selectedServices[0].id === "") {
            toast.error('Please select at least one service');
            return;
        }

        if (!data.timeType) {
            toast.error('Please select a time');
            return;
        }

        // Chuyển đổi ngày sang timestamp
        const date = new Date(data.date).getTime();

        // Định dạng lại ngày và thời gian sang giờ Việt Nam
        const selectedTime = times?.find(time => time.keyMap === data.timeType);
        const formattedDate = new Date(data.date).toLocaleDateString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
        });
        const timeString = `${formattedDate} - ${selectedTime?.valueVi || ''}`; // valueVi cho tiếng Việt

        // Lấy tên đầy đủ của stylist
        const stylist = stylists?.find(s => s.id === Number(data.stylistId));
        const stylistName = stylist ? `${stylist.firstName} ${stylist.lastName}` : '';

        // Chuyển đổi serviceIds từ string[] sang number[]
        const serviceIds = selectedServices.map(s => Number(s.id));

        const payload = {
            ...data,
            date,
            timeString,
            stylistName,
            serviceIds,
            amount: totalAmount,

        } as IBookingRequest;

        dispatch(customerCreateBooking(payload))
            .unwrap()
            .then((response) => {
                if (response.errCode === 0) {
                    toast.success("Booking successful, please check your email.");
                } else {
                    toast.error(response.errMsg);
                }
            })
            .catch((error) => {
                toast.error(error.errMsg || 'An error occurred while booking.');
            });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#201717] p-8 rounded-md shadow-md text-white">
            <p className="text-red-500 font-semibold text-sm mb-4">* Required fields</p>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Phone Number *</label>
                <input
                    type="text"
                    {...register("phone", { required: true })}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.phone && <span className="text-red-500">Phone number is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Full Name *</label>
                <input
                    type="text"
                    {...register("fullName", { required: true })}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.fullName && <span className="text-red-500">Full name is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email *</label>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Select Stylist *</label>
                {showStylist && (
                    <select
                        {...register("stylistId", { required: true })}
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                    >
                        <option value="" disabled selected>Select a stylist</option>
                        {stylists && stylists.map((stylist) => (
                            <option key={stylist.id} value={stylist.id}>{stylist.firstName} {stylist.lastName}</option>
                        ))}
                    </select>
                )}
                {errors.stylistId && <span className="text-red-500">Stylist is required</span>}
            </div>

            <div className="border-t border-zinc-700 my-4"></div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Services *</label>
                {showService ? (
                    selectedServices.map((service, index) => (
                        <div key={index} className="flex items-center mb-2 space-x-2 w-full">
                            <select
                                value={service.id}
                                onChange={(event) => handleServiceChange(index, event)}
                                className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                            >
                                <option value="" disabled>Select a service</option>
                                {services?.map((service) => (
                                    <option key={service.id} value={service.id.toString()}>{service.name} - {Number(service.price).toLocaleString()}$</option>
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
                    <p>Loading services...</p>
                )}
                <button
                    type="button"
                    onClick={addServiceField}
                    className="bg-white text-black py-2 px-4 rounded mt-2 hover:bg-gray-200"
                >
                    Add Service
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Booking Date *</label>
                <input
                    type="date"
                    {...register("date", { required: true })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.date && <span className="text-red-500">Booking date is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Select Time *</label>
                <div className="grid grid-cols-4 gap-2">
                    {availableTimes.length > 0 ? (
                        availableTimes.map((timeType, index) => {
                            console.log("Time type:", timeType);
                            return (

                                <button
                                    key={index}
                                    type="button"
                                    className={`p-3 rounded border ${watch("timeType") === timeType.timeType ? "bg-yellow-500 text-black" : "bg-white text-black"
                                        } focus:outline-none hover:bg-yellow-400`}
                                    onClick={() => {
                                        setValue("timeType", timeType.timeType); // Make sure this sets the timeType correctly
                                    }}
                                >
                                    {timeType.timeTypeData.valueVi}
                                </button>
                            );
                        })
                    ) : (
                        <p className="font-semibold text-red-600">No available time slots</p>
                    )}
                </div>

                {errors.timeType && <span className="text-red-500">Time slot is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Note</label>
                <textarea
                    {...register("note")}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
            </div>

            <div className="mb-4">
                <p className="text-lg font-bold">Total: {totalAmount.toLocaleString()} $</p>
            </div>

            <button type="submit" className="bg-yellow-600 text-black py-3 px-4 rounded hover:bg-yellow-500">
                Book Appointment
            </button>
        </form>
    );
};

export default BookingForm;
