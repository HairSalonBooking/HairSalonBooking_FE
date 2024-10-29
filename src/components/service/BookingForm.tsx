import { IBookingRequest } from "@/interfaces/Booking";
import { ITimeBooking } from "@/interfaces/Time";
import { customerCreateBooking } from "@/services/features/booking/bookingSlice";
import { getAllService } from "@/services/features/service/serviceSlice";
import { getAllStylist } from "@/services/features/stylist/stylistSlice";
import { getAllTimeByStylist } from "@/services/features/timeBooking/timeBookingSlice";
import { getUserById } from "@/services/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { logoutUser } from "@/services/features/auth/authSlice";

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
    pointsToUse: number;
    usePoints: boolean;
}

const BookingForm = () => {
    const dispatch = useAppDispatch();
    const [showService, setShowService] = useState(false);
    const [showStylist, setShowStylist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAccountInactive, setIsAccountInactive] = useState(false); // To check inactive account
    const [selectedServices, setSelectedServices] = useState<{ id: string, price: number }[]>([{ id: "", price: 0 }]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [availableTimes, setAvailableTimes] = useState<ITimeBooking[]>([]);
    const [discountedAmount, setDiscountedAmount] = useState<number>(0);
    const [pointsApplied, setPointsApplied] = useState<boolean>(false);

    const { stylists } = useAppSelector((state) => state.stylists);
    const { services } = useAppSelector((state) => state.services);
    const { auth } = useAppSelector((state) => state.auth);
    const { user } = useAppSelector((state) => state.users);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        // Fetch all services and stylists
        dispatch(getAllService());
        dispatch(getAllStylist());
        setShowService(true);
        setShowStylist(true);
    }, [dispatch]);

    const stylistId = watch("stylistId");
    const date = watch("date");
    const pointsToUse = watch("pointsToUse");

    useEffect(() => {
        // Check if user is inactive
        if (auth?.id) {
            dispatch(getUserById({ id: auth.id }))
                .unwrap()
                .then((userData) => {
                    if (userData.status === "Inactive") {
                        setIsAccountInactive(true);
                        toast.error("Your account is inactive. You will be logged out in 1 seconds.");

                        setTimeout(() => {
                            dispatch(logoutUser());
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.error("Error checking user status:", error);
                });
        }
    }, [auth?.id, dispatch]);

    useEffect(() => {
        // Fetch available time slots for selected stylist and date
        if (stylistId && date) {
            const timestamp = new Date(date).getTime();
            dispatch(getAllTimeByStylist({ stylistId: Number(stylistId), date: timestamp }))
                .unwrap()
                .then((times) => {
                    const currentDate = new Date();
                    const selectedDate = new Date(date);

                    if (selectedDate.toDateString() === currentDate.toDateString()) {
                        const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
                        const filteredTimes = times.map((time) => {
                            const [hours, minutes] = time.timeTypeData.valueVi.split(":").map(Number);
                            const timeInMinutes = hours * 60 + minutes;
                            return {
                                ...time,
                                isPast: timeInMinutes <= currentTime,
                            };
                        });
                        setAvailableTimes(filteredTimes);
                    } else {
                        setAvailableTimes(times.map((time) => ({ ...time, isPast: false })));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching available times:", error);
                    setAvailableTimes([]);
                });
        }
    }, [stylistId, date, dispatch]);

    const calculateTotalAmount = (selectedServices: { id: string, price: number }[]) => {
        const amount = selectedServices.reduce((acc, service) => acc + service.price, 0);
        setTotalAmount(amount);

        if (pointsApplied && auth) {
            handlePointsDiscount(pointsToUse, amount);
        } else {
            setDiscountedAmount(amount);
        }
    };

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

    const addServiceField = () => {
        setSelectedServices([...selectedServices, { id: "", price: 0 }]);
    };

    const removeService = (index: number) => {
        if (index !== 0) {
            const updatedServices = selectedServices.filter((_, i) => i !== index);
            setSelectedServices(updatedServices);
            calculateTotalAmount(updatedServices);
        }
    };

    const handlePointsDiscount = (points: number, total: number) => {
        if (points > 30) {
            toast.error("You cannot use more than 30 points.");
            setValue("pointsToUse", 30);
            return;
        }

        if (points > (user?.points ?? 0)) {
            toast.error(`You do not have enough points. You only have ${user?.points} points.`);
            setValue("pointsToUse", user?.points ?? 0);
            return;
        }

        const discountPercentage = points;
        const discount = total * (discountPercentage / 100);
        const newTotal = total - discount;
        setDiscountedAmount(newTotal >= 0 ? newTotal : 0);
    };

    const applyPoints = () => {
        if (auth && pointsToUse > 0) {
            setPointsApplied(true);
            handlePointsDiscount(pointsToUse, totalAmount);
        } else {
            setPointsApplied(false);
            setDiscountedAmount(totalAmount);
        }
    };

    const onSubmit = (data: FormData) => {
        if (isAccountInactive) {
            toast.error("Cannot proceed with booking. Your account is inactive.");
            return;
        }

        if (selectedServices.length === 0 || selectedServices[0].id === "") {
            toast.error('Please select at least one service');
            return;
        }

        if (!data.timeType) {
            toast.error('Please select a time');
            return;
        }

        data.usePoints = data.pointsToUse > 0;

        const date = new Date(data.date).getTime();
        const selectedTime = availableTimes?.find(time => time.timeType === data.timeType);
        const timeValueVi = selectedTime?.timeTypeData?.valueVi || '';
        const formattedDate = new Date(data.date).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        const timeString = `${formattedDate} - ${timeValueVi}`;
        const stylist = stylists?.find(s => s.id === Number(data.stylistId));
        const stylistName = stylist ? `${stylist.firstName} ${stylist.lastName}` : '';
        const serviceIds = selectedServices.map(s => Number(s.id));

        setIsLoading(true);

        const payload = {
            ...data,
            date,
            timeString,
            stylistName,
            serviceIds,
            amount: totalAmount,
            pointsToUse: auth ? data.pointsToUse : 0,
            usePoints: data.usePoints,
        } as IBookingRequest;

        dispatch(customerCreateBooking(payload))
            .unwrap()
            .then((response) => {
                setIsLoading(false);
                if (response.errCode === 0) {
                    toast.success("Booking successful, please check your email.");
                    dispatch(getUserById({ id: auth?.id ?? 0 }));
                } else {
                    toast.error(response.errMsg);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.errMsg || 'An error occurred while booking.');
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#201717] p-8 rounded-md shadow-md text-white">
            {isAccountInactive && (
                <p className="text-red-600 font-semibold text-sm mb-4">Your account is inactive.</p>
            )}

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
                        <option value="" disabled>Select a stylist</option>
                        {stylists?.map((stylist) => (
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
                    min={new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' })}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                />
                {errors.date && <span className="text-red-500">Booking date is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Select Time *</label>
                <div className="grid grid-cols-4 gap-2">
                    {availableTimes.length > 0 ? (
                        availableTimes.map((timeType, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`p-3 rounded border ${timeType.isPast ? "bg-gray-300 text-gray-500 cursor-not-allowed" : watch("timeType") === timeType.timeType
                                    ? "bg-yellow-500 text-black"
                                    : "bg-white text-black"
                                    } focus:outline-none hover:bg-yellow-400`}
                                onClick={() => !timeType.isPast && setValue("timeType", timeType.timeType)}
                                disabled={timeType.isPast}
                            >
                                {timeType.timeTypeData.valueVi}
                            </button>
                        ))
                    ) : (
                        <p className="font-semibold text-red-600">No available time slots</p>
                    )}
                </div>
                {errors.timeType && <span className="text-red-500">Time slot is required</span>}
            </div>

            {auth && (
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Points to Use (Max 30 for 30%)</label>
                    <input
                        type="number"
                        {...register("pointsToUse")}
                        min={0}
                        max={30}
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-yellow-500"
                    />
                    {errors.pointsToUse && <span className="text-red-500">Points value is invalid</span>}

                    <button
                        type="button"
                        onClick={applyPoints}
                        className="bg-yellow-600 text-black py-2 px-4 rounded hover:bg-yellow-500 mt-2"
                    >
                        Apply Points
                    </button>
                </div>
            )}

            <div className="mb-4">
                <p className="text-lg font-bold">
                    Total: {totalAmount}$ - {pointsToUse}% = {discountedAmount.toFixed(2)} $
                </p>
            </div>

            <button type="submit" className="bg-yellow-600 text-black py-3 px-4 rounded hover:bg-yellow-500" disabled={isLoading || isAccountInactive}>
                {isLoading ? <ClipLoader color="#000" size={24} /> : "Book Appointment"}
            </button>
        </form>
    );
};

export default BookingForm;
