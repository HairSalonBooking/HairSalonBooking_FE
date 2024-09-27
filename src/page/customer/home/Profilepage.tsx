import React, { useState } from "react";
import Header from "@/components/layout/Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstName: "Phan Van ",
        lastName: "Hung",
        phone: "+84 367988177",
        gender: "Male",
        birthday: new Date("2003-08-02"),
        email: "hunglorfptu@gmail.com",
        Address: "Bien Hoa, Dong Nai",
    });

    const [avatar, setAvatar] = useState(
        "https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/460869808_3762001557399439_4877959658229225624_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG7ePPB6KZv4DwKgU2W3E-0XfZoyybNOQNd9mjLJs05A-LIsxdHXe-Aq0soB8TtVxPdzXyXVTwFUk_iGL7ZoN2R&_nc_ohc=mgjl8NOfvC8Q7kNvgHjC6Km&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=AlskCHEJLhA9BZ0YE2PlONy&oh=00_AYBu5sTNv8Q1HT_szfS3GxlYs8yldKwgZuy_FreGN5XUKw&oe=66FC0F0F"
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                if (event.target?.result) {
                    setAvatar(event.target.result.toString());
                }
            };
            fileReader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSaveChanges = () => {
        const today = new Date();
        const selectedDate = profile.birthday;
        const age = today.getFullYear() - selectedDate.getFullYear();

        // Ensure the user is at least 15 years old
        if (age < 15 || (age === 15 && today < new Date(selectedDate.setFullYear(today.getFullYear() - 15)))) {
            alert("You must be at least 15 years old.");
        } else {
            alert("Profile updated");
            setIsEditing(false); // Hide buttons after saving
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    }

    return (
        <div className="relative min-h-screen bg-gray-900 text-gray-200">
            <div className="relative z-10">
                {/* Header */}
                <Header />

                <div className="container mx-auto pt-36 pb-20 px-10">
                    <div className="md:flex md:space-x-16 justify-center">
                        {/* Left Side - Profile Card */}
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
                                {profile.firstName} {profile.lastName}
                            </h1>
                            <p className="text-gray-400 mb-6">Owner at HairCare Platform</p>
                            {!isEditing && (
                                <button
                                    onClick={handleEditToggle}
                                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        {/* Right Side - Profile Details */}
                        <div className="w-full md:w-3/5 bg-gray-900 p-10 rounded-lg shadow-md bg-opacity-95">
                            <h2 className="text-2xl font-semibold mb-6 text-white">Profile Information</h2>

                            {isEditing ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={profile.firstName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={profile.lastName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={profile.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium">Gender</label>
                                            <select
                                                name="gender"
                                                value={profile.gender}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                            >
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium">Birthday</label>
                                            <DatePicker
                                                selected={profile.birthday}
                                                onChange={(date: Date | null) => {
                                                    if (date) {
                                                        setProfile({ ...profile, birthday: date });
                                                    }
                                                }}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                                dateFormat="MMMM dd, yyyy" // Format in English
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={profile.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium">Address</label>
                                            <input
                                                type="text"
                                                name="Address"
                                                value={profile.Address}
                                                onChange={handleChange}
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
                                                {profile.firstName}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-gray-400">Last Name</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {profile.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium text-gray-400">Phone Number</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {profile.phone}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-gray-400">Gender</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {profile.gender}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium text-gray-400">Birthday</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {format(new Date(profile.birthday), "MMMM dd, yyyy")}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-gray-400">Email</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {profile.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block font-medium text-gray-400"> Address</label>
                                            <p className="px-4 py-3 border rounded-lg bg-gray-800 text-white border-gray-600">
                                                {profile.Address}
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
