import { FC } from 'react';

type PopupConfirmActionProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    content?: string;
    actionDelete?: string;
    actionCancel?: string;
};

const PopupConfirmAction: FC<PopupConfirmActionProps> = ({ isOpen, title, content, actionDelete, actionCancel, onClose, onConfirm }) => {
    if (!isOpen) return null; // Không hiển thị popup nếu không mở

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-md">
                <h2 className="text-lg mb-4 text-black font-bold">{title}</h2>
                <p className='italic text-base text-black'>{content}</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onConfirm}
                    >
                        {actionDelete}
                    </button>
                    <button
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        {actionCancel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupConfirmAction;
