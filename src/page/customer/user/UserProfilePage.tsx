import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header/Header";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { getUserById, editUserbyID } from "@/services/features/user/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const { auth } = useAppSelector((state) => state.auth);
    const { user } = useAppSelector((state) => state.users);

    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        gender: user?.gender || "",
        address: user?.address || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        imageFile: null as File | null,  // Image file state
    });

    // State to manage avatar URL
    const [avatar, setAvatar] = useState(user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");

    // Fetch user information when component mounts
    useEffect(() => {
        if (auth?.id) {
            dispatch(getUserById({ id: auth.id }));
        }
    }, [dispatch, auth?.id]);

    // Update formData and avatar when user data changes
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender || "",
                address: user.address || "",
                phoneNumber: user.phoneNumber || "",
                email: user.email,
                imageFile: null,
            });
            setAvatar(user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
        }
    }, [user]);

    // Handle input changes for text fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle avatar change (preview and save the file)
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                imageFile: file,
            });

            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                if (event.target?.result) {
                    setAvatar(event.target.result.toString());
                }
            };
            fileReader.readAsDataURL(file);
        }
    };

    // Handle saving changes
    const handleSaveChanges = async () => {
        if (!auth?.id) {
            toast.error("User ID is missing");
            return;
        }

        // Validate phone number and email
        const phoneNumber = formData.phoneNumber || user?.phoneNumber || "";
        const email = formData.email || user?.email || "";

        if (!phoneNumber || !email) {
            if (!phoneNumber) {
                toast.error("Phone number is required");
            }
            if (!email) {
                toast.error("Email is required");
            }
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error("Invalid email format");
            return;
        }

        const data = new FormData();
        data.append("id", auth.id.toString());  // Ensure ID is added to form data
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("gender", formData.gender);
        data.append("address", formData.address);
        data.append("phoneNumber", phoneNumber);  // Use updated or existing phone number
        data.append("email", email);  // Use updated or existing email

        if (formData.imageFile) {
            data.append("imageFile", formData.imageFile);  // Append image file to form data
        }


        const result = await dispatch(editUserbyID({ data }));
        if (editUserbyID.fulfilled.match(result)) {
            setIsEditing(false);  // Disable editing mode
            if (auth?.id) {
                dispatch(getUserById({ id: auth.id }));
            }
        }
    };

    // Toggle between edit and view mode
    const handleEditToggle = () => {
        if (isEditing) {
            if (auth?.id) {
                dispatch(getUserById({ id: auth.id }));  // Refresh user data when canceling
            }
        }
        setIsEditing(!isEditing);
    };
    return (
        <div className="relative min-h-screen bg-gray-900 text-gray-200">
            <div className="relative z-10">
                {auth?.roleId !== 'R3' && <Header />}
                <div className="container mx-auto pt-36 pb-20 px-10">
                    <div className="md:flex md:space-x-16 justify-center">
                        <div className="w-full md:w-2/5 bg-gray-900 p-10 rounded-lg shadow-md text-center relative bg-opacity-95">
                            <div className="relative w-60 h-60 mx-auto mb-6">
                                <img
                                    className="w-full h-full rounded-full border-4 border-gray-300 object-cover"
                                    src={avatar}
                                    alt="Avatar"
                                />
                                {isEditing && (
                                    <div className="absolute bottom-2 left-0 right-0 text-center">
                                        <label className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-yellow-600">
                                            Change Avatar
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl font-semibold text-white mb-3">
                                {user?.lastName || ""} {user?.firstName}
                            </h1>
                            {!isEditing && (
                                <button
                                    onClick={handleEditToggle}
                                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <div className="w-full md:w-3/5 bg-gray-900 p-10 rounded-lg shadow-md bg-opacity-95">
                            <h2 className="text-2xl font-semibold mb-6 text-white">Profile Information</h2>

                            {/* Render Points only if roleId is not R3 */}
                            {auth?.roleId !== 'R3' && (
                                <div className="mb-6 text-yellow-500 font-semibold">
                                    Points: {user?.points || 0}
                                </div>
                            )}
                            <a className="absolute top-4 left-4 text-white" href="/shift-stylist">
                                <div className="flex items-center">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 320 512"
                                        className="mr-3 h-[13px] w-[8px] text-white"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                                    </svg>
                                    <p className="ml-0 text-sm text-white">Back to Shift Stylist</p>
                                </div>
                            </a>
                            {isEditing ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="Enter your first name"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter your last name"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium">Phone Number</label>
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    placeholder="Enter your phone number"
                                                    value={formData.phoneNumber}
                                                    onChange={(e) => {
                                                        // Ensure only 9 digits are entered after +84
                                                        const phoneNumber = e.target.value.replace(/\D/g, '');  // Remove non-numeric characters
                                                        if (phoneNumber.length <= 9) {
                                                            setFormData({
                                                                ...formData,
                                                                phoneNumber: phoneNumber,
                                                            });
                                                        }
                                                    }}
                                                    maxLength={9} // Limit input to 9 digits
                                                    className="w-full px-4 py-3 border rounded-r-lg bg-gray-800 text-white border-gray-600"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-medium">Gender</label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleSelectChange}  // Select uses handleSelectChange
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Enter your address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4 mt-6">
                                        <button
                                            onClick={handleEditToggle}
                                            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSaveChanges}
                                            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium text-gray-400">First Name</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {formData.firstName || '\u00A0'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-gray-400">Last Name</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {formData.lastName || '\u00A0'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium text-gray-400">Phone Number</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {"+84" + formData.phoneNumber || '\u00A0'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-gray-400">Gender</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {formData.gender || '\u00A0'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium text-gray-400">Email</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {formData.email || '\u00A0'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium text-gray-400">Address</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {formData.address || '\u00A0'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
