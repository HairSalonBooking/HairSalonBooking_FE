import { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // You can handle form submission here (e.g., sending data to an API)
        if (formData.name && formData.email && formData.phone) {
            console.log("Form submitted:", formData);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Liên hệ chúng tôi</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Họ tên của bạn"
                        className="w-full border-2 border-gray-600 rounded-md p-3 bg-gray-700 text-white"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email của bạn"
                        className="w-full border-2 border-gray-600 rounded-md p-3 bg-gray-700 text-white"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input
                    type="text"
                    name="phone"
                    placeholder="Điện thoại của bạn"
                    className="w-full border-2 border-gray-600 rounded-md p-3 bg-gray-700 text-white"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="notes"
                    placeholder="Ghi chú"
                    rows={4}
                    className="w-full border-2 border-gray-600 rounded-md p-3 bg-gray-700 text-white"
                    value={formData.notes}
                    onChange={handleChange}
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
                >
                    Gửi
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
