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
import { getAllUser, disableUserByAdmin } from "@/services/features/user/userSlice";
import { IUser } from "@/interfaces/User";
import PopupConfirmAction from "../popup/ConfirmDelete/PopupConfirmAction";
import { SearchBar } from "../layout/Search/Search";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"; // Import Pagination từ Shadcn

const ITEMS_PER_PAGE = 10; // Số lượng người dùng hiển thị mỗi trang

const TableUser = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(state => state.users);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null); // Để lưu user được chọn
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State để điều khiển popup
    const [searchText, setSearchText] = useState<string>(""); // State cho thanh tìm kiếm
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]); // State cho danh sách user đã lọc
    const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    // Cập nhật danh sách user dựa trên tìm kiếm và loại bỏ Admin
    useEffect(() => {
        const filtered = users
            ?.filter((user: IUser) => user.roleId !== "R2") // Ẩn người dùng có roleId là R2 (Admin)
            ?.filter((user: IUser) => {
                const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
                return fullName.includes(searchText.toLowerCase());
            });
        setFilteredUsers(filtered);
    }, [searchText, users]);

    // Chỉ hiển thị người dùng dựa trên trang hiện tại
    const indexOfLastUser = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    // Hàm ánh xạ roleId thành vai trò tương ứng
    const getRoleLabel = (roleId: string) => {
        switch (roleId) {
            case "R1":
                return "Staff";
            case "R2":
                return "Admin";
            case "R3":
                return "Stylist";
            case "R4":
                return "Customer";
            default:
                return "Unknown";
        }
    };

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

            {/* Tìm kiếm người dùng */}
            <SearchBar
                text={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={() => { }}
            />

            <Table>
                <TableCaption>A list of your users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">First Name</TableHead>
                        <TableHead className="w-[150px]">Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentUsers && currentUsers.map((user: IUser) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.firstName}</TableCell>
                            <TableCell>{user.lastName ?? '\u00A0'}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phoneNumber ?? '\u00A0'}</TableCell>
                            <TableCell>{user.gender ?? '\u00A0'}</TableCell>
                            <TableCell className="text-right">{getRoleLabel(user.roleId)}</TableCell>
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

            {/* Phân trang sử dụng Shadcn */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={index + 1 === currentPage}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

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
