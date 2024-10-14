import { useEffect } from "react";
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
import { getAllUser } from "@/services/features/user/userSlice";
import { IUser } from "@/interfaces/User";

const TableUser = () => {
    const dispatch = useAppDispatch();

    const { users } = useAppSelector(state => state.users); // Lấy dữ liệu stylist từ store

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

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
                                <button className="border border-slate-600 p-2 rounded-lg text-white bg-red-600 font-bold ml-2">InActive</button>
                                <button className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold ml-2">Active</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default TableUser;
