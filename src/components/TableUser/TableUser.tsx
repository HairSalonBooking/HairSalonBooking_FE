import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { formatAnyDate } from "@/utils";
import { getAllUser, disableUserByAdmin } from "@/services/features/user/userSlice"; // Import action
import { IUser } from "@/interfaces/User";
import PopupConfirmAction from "../popup/ConfirmDelete/PopupConfirmAction";

const TableUser = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(state => state.users);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null); // Để lưu user được chọn
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State để điều khiển popup

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    // Hàm mở popup xác nhận
    const handleToggleStatus = (user: IUser) => {
        setSelectedUser(user);
        setIsPopupOpen(true);
    };

    // Hàm xử lý sau khi xác nhận
    const handleConfirmToggle = () => {
        if (selectedUser) {
            dispatch(disableUserByAdmin({ id: selectedUser.id }))
                .unwrap()
                .then(() => {
                    setIsPopupOpen(false); // Đóng popup
                    dispatch(getAllUser()); // Gọi lại API để cập nhật danh sách user sau khi trạng thái thay đổi
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">List User Management</h2>
            </div>

            <Table>
                <TableCaption>A list of your users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">First Name</TableHead>
                        <TableHead className="w-[150px]">Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead className="text-right">Created At</TableHead>
                        <TableHead className="text-right">Updated At</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users && users.map((user: IUser) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.firstName}</TableCell>
                            <TableCell>{user.lastName ?? "N/A"}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phoneNumber ?? "N/A"}</TableCell>
                            <TableCell>{user.gender ?? "N/A"}</TableCell>
                            <TableCell className="text-right">{formatAnyDate(user.createdAt)}</TableCell>
                            <TableCell className="text-right">{formatAnyDate(user.updatedAt)}</TableCell>
                            <TableCell className="text-right">
                                {user.status === "Active" ? (
                                    <button
                                        className="border border-slate-600 p-2 rounded-lg text-white bg-red-600 font-bold ml-2"
                                        onClick={() => handleToggleStatus(user)}
                                    >
                                        InActive
                                    </button>
                                ) : (
                                    <button
                                        className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold ml-2"
                                        onClick={() => handleToggleStatus(user)}
                                    >
                                        Active
                                    </button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Popup xác nhận */}
            <PopupConfirmAction
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onConfirm={handleConfirmToggle}
                title={`Are you sure you want to ${selectedUser?.status === "Active" ? "disable" : "enable"} this user?`}
                content="This action cannot be undone."
                actionDelete="Confirm"
                actionCancel="Cancel"
            />
        </>
    );
};

export default TableUser;
