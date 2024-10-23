import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentCancelPage: React.FC = () => {
    const location = useLocation();
    const [cancelMessage, setCancelMessage] = useState<string | null>(null);

    useEffect(() => {
        // Extract query params from URL (lấy token từ URL)
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token') || '';

        if (token) {
            // Nếu có token, bạn có thể hiển thị hoặc xử lý thêm
            setCancelMessage('Your payment was cancelled. Please try again or contact support if needed.');
        } else {
            setCancelMessage('Payment cancellation information is missing.');
        }
    }, [location.search]);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-100 to-red-300">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
                <div className="flex justify-center mb-6">
                    <img
                        src="https://img.icons8.com/?size=100&id=100702&format=png&color=000000"
                        alt="Cancel"
                        className="w-24 h-24"
                    />
                </div>
                <h1 className="text-3xl font-bold text-red-800 mb-4">Payment Cancelled</h1>
                <p className="text-gray-600 mb-6">
                    {cancelMessage || 'Payment process was cancelled. You can try again or return to the home page.'}
                </p>
                <p className="text-gray-500 mb-8">
                    If you have any questions or need assistance, please contact our support team.
                </p>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition duration-300"
                    onClick={() => window.location.href = '/'}
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentCancelPage;
