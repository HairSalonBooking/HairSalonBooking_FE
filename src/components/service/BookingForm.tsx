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

    const [selectedServices, setSelectedServices] = useState<{ id: string, price: number }[]>([{ id: "", price: 0 }]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [availableTimes, setAvailableTimes] = useState<ITimeBooking[]>([]);
    const [discountedAmount, setDiscountedAmount] = useState<number>(0);
    const [pointsApplied, setPointsApplied] = useState<boolean>(false);

    const { stylists } = useAppSelector((state) => state.stylists);
    const { services } = useAppSelector((state) => state.services);
    const { auth } = useAppSelector((state) => state.auth); // Get auth from the store
    const { user } = useAppSelector((state) => state.users); // Get user points

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        dispatch(getAllService());
        dispatch(getAllStylist());
        setShowService(true);
        setShowStylist(true);
    }, [dispatch]);

    const stylistId = watch("stylistId");
    const date = watch("date");
    const pointsToUse = watch("pointsToUse");

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

    // Function to calculate the total amount for the selected services
    const calculateTotalAmount = (selectedServices: { id: string, price: number }[]) => {
        const amount = selectedServices.reduce((acc, service) => acc + service.price, 0);
        setTotalAmount(amount);

        // Calculate discounted amount for display only
        if (pointsApplied && auth) {
            handlePointsDiscount(pointsToUse, amount);
        } else {
            setDiscountedAmount(amount); // No discount applied if not logged in or no points are used
        }
    };

    // Handles service change and recalculates total amount
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

    // Handles the points discount for display purposes
    const handlePointsDiscount = (points: number, total: number) => {
        // Limit points to a maximum of 30 (30% discount)
        if (points > 30) {
            toast.error("You cannot use more than 30 points.");
            setValue("pointsToUse", 30); // Set points to maximum of 30
            return;
        }

        // Check if user has enough points
        if (points > (user?.points ?? 0)) {
            toast.error(`You do not have enough points. You only have ${user?.points} points.`);
            setValue("pointsToUse", user?.points ?? 0); // Set points to the user's maximum available points
            return;
        }

        // Calculate discount: 10 points = 10%, 20 points = 20%, 30 points = 30%
        const discountPercentage = points; // Points directly represent the percentage
        const discount = total * (discountPercentage / 100);
        const newTotal = total - discount;
        setDiscountedAmount(newTotal >= 0 ? newTotal : 0); // Ensure the total doesn't go negative
    };

    // Apply points and update the total with the discount
    const applyPoints = () => {
        if (auth && pointsToUse > 0) {
            setPointsApplied(true);
            handlePointsDiscount(pointsToUse, totalAmount); // Apply points and calculate the new total
        } else {
            setPointsApplied(false);
            setDiscountedAmount(totalAmount); // Reset to original total if no points or not logged in
        }
    };

    const onSubmit = (data: FormData) => {
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

        // Bật trạng thái loading
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
                setIsLoading(false); // Tắt trạng thái loading sau khi hoàn thành
                if (response.errCode === 0) {
                    toast.success("Booking successful, please check your email.");
                    dispatch(getUserById({ id: auth?.id ?? 0 }));
                } else {
                    toast.error(response.errMsg);
                }
            })
            .catch((error) => {
                setIsLoading(false); // Tắt trạng thái loading trong trường hợp lỗi
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
                                className={`p-3 rounded border ${watch("timeType") === timeType.timeType ? "bg-yellow-500 text-black" : "bg-white text-black"
                                    } focus:outline-none hover:bg-yellow-400`}
                                onClick={() => setValue("timeType", timeType.timeType)}
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
                        max={30} // Limit input to maximum of 30 points
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

            <button type="submit" className="bg-yellow-600 text-black py-3 px-4 rounded hover:bg-yellow-500" disabled={isLoading}>
                {isLoading ? <ClipLoader color="#000" size={24} /> : "Book Appointment"}
            </button>
        </form>
    );
};

export default BookingForm;
