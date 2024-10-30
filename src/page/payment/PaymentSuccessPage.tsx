import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/services/store/store';  // Import store
import { verifyBooking } from '@/services/features/booking/bookingSlice';  // Import verifyBooking

const PaymentSuccessPage: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);  // Trạng thái loading
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

    console.log('PaymentSuccessPage rendered');

    // Xử lý các tham số từ URL
    useEffect(() => {
        console.log('useEffect triggered');
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token') || '';
        const stylistId = searchParams.get('stylistId') || '';
        const paymentId = searchParams.get('paymentId') || '';
        const payerId = searchParams.get('PayerID') || '';

        console.log('Params:', { token, stylistId, paymentId, payerId });

        if (!token || !paymentId || !payerId || !stylistId) {
            setVerificationStatus('Missing required parameters.');
            setLoading(false);
            return;
        }

        // Gọi API verify booking
        dispatch(verifyBooking({ token, paymentId, payerId, stylistId }))
            .then(unwrapResult)
            .then(() => {
                console.log('API call successful');
                setLoading(false);
            })
            .catch((error) => {
                console.error('API call failed:', error);
                setVerificationStatus(`Verification failed: ${error.errMsg || 'Unknown error'}`);
                setLoading(false);
            });
    }, [location.search, dispatch]);

    // Hiển thị trạng thái loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
                <div className="text-xl font-bold">Processing your payment, please wait...</div>
            </div>
        );
    }

    // Hiển thị kết quả xác minh
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
                <div className="flex justify-center mb-6">
                    <img
                        src="https://img.icons8.com/?size=100&id=108637&format=png&color=000000"
                        alt="Complete"
                        className="w-24 h-24"
                    />
                </div>
                <h1 className="text-3xl font-bold text-blue-800 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your booking. Your payment was successfully processed, and we have reserved your appointment. We look forward to serving you!
                </p>
                <p className="text-gray-500 mb-8">
                    Please check your email for the booking confirmation and details. If you have any questions, feel free to contact us.
                </p>

                {verificationStatus && (
                    <div className="text-sm text-red-600 mb-4">
                        {verificationStatus}
                    </div>
                )}

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300"
                    onClick={() => window.location.href = '/'}
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
