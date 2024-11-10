import { useAppDispatch, useAppSelector } from "@/services/store/store"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { formatAnyDate } from "@/utils"
import { useEffect } from "react"
import { viewSalaryByStylist } from "@/services/features/stylist/stylistSlice"

const TableSalaryOfStylist = () => {
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector((state) => state.auth)
    const { salary } = useAppSelector((state) => state.stylists)

    useEffect(() => {
        dispatch(viewSalaryByStylist({
            stylistId: Number(auth?.id)
        }));
    }, [auth?.id, dispatch]);
    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">Salary For Stylist</h2>
            </div>

            <Table>
                <TableCaption>A list of your recent services.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>BaseSalary</TableHead>
                        <TableHead>Bonuses</TableHead>
                        <TableHead>Month</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>TotalSalary</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Update At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {salary && salary.length > 0 ? (
                        salary.map(sal => (
                            sal && (
                                <TableRow key={sal.id}>
                                    <TableCell>
                                        {sal.BaseSalary || "None"}
                                    </TableCell>
                                    <TableCell>
                                        {sal.Bonuses ?? 0}
                                    </TableCell>
                                    <TableCell>
                                        {sal.Month
                                            ? sal.Month
                                            : "Empty"}
                                    </TableCell>
                                    <TableCell>
                                        {sal.Year
                                            ? sal.Year
                                            : "Empty"}
                                    </TableCell>
                                    <TableCell>
                                        {sal.TotalSalary}
                                    </TableCell>
                                    <TableCell className="px-3 py-1 rounded-full text-xs font-semibold inline-block bg-green-500 text-white">
                                        Paid
                                    </TableCell>

                                    <TableCell>
                                        {formatAnyDate(sal.updatedAt)}
                                    </TableCell>
                                </TableRow>
                            )
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No services available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default TableSalaryOfStylist
