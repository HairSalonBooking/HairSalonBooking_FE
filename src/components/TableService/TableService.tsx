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
import { useAppSelector, useAppDispatch } from "@/services/store/store";
import { formatAnyDate } from "@/utils";
import { deleteService, getAllService } from "@/services/features/service/serviceSlice";
import UpdateServicePopup from "../popup/UpdateService/UpdateService";
import { IService } from "@/interfaces/Service";
import CreateServicePopup from "../popup/CreateService/CreateServicePopup";
import PopupConfirmAction from "../popup/ConfirmDelete/PopupConfirmAction";

const TableService = () => {
    const dispatch = useAppDispatch();
    const { services } = useAppSelector(state => state.services);

    // State for delete confirmation popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to control edit popup
    const [serviceIdToDelete, setServiceIdToDelete] = useState<number | null>(null);
    const [serviceToEdit, setServiceToEdit] = useState<any>(null); // State to store the service to edit
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    // Close delete confirmation popup
    const closeDeletePopup = () => {
        setIsPopupOpen(false);
        setServiceIdToDelete(null);
    };

    const openEditPopup = (service: IService) => {
        setServiceToEdit(service); // Set the service to be edited
        setIsEditPopupOpen(true); // Open the edit popup
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setServiceToEdit(null);
    };

    // Handle delete button click
    const handleDeleteClick = (id: number) => {
        setServiceIdToDelete(id);
        setIsPopupOpen(true);
    };

    // Confirm and execute service deletion
    const handleConfirmDelete = async () => {
        if (serviceIdToDelete !== null) {
            await dispatch(deleteService({ id: serviceIdToDelete }));
            dispatch(getAllService());
            closeDeletePopup();
        }
    };

    useEffect(() => {
        dispatch(getAllService());
    }, [dispatch]);
    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">List Service Management</h2>
                <button
                    className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold"
                    onClick={() => setIsCreatePopupOpen(true)} // Sử dụng trạng thái riêng
                >
                    Create Service
                </button>
            </div>

            <Table>
                <TableCaption>A list of your recent services.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Name</TableHead>
                        <TableHead className="w-[100px]">Price</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Create At</TableHead>
                        <TableHead className="text-right">Update At</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services && services.length > 0 ? (
                        services.map(service => (
                            service && (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium w-[40vh]">
                                        {service.name || "No Name"}
                                    </TableCell>
                                    <TableCell className="w-[30vh]">
                                        {service.price ?? 0}
                                    </TableCell>
                                    <TableCell>
                                        {service.description
                                            ? (service.description.length > 30
                                                ? `${service.description.slice(0, 30)}...`
                                                : service.description)
                                            : "Empty"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatAnyDate(service.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatAnyDate(service.updatedAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button
                                            className="border border-slate-600 p-2 rounded-lg text-white bg-slate-800 font-bold"
                                            onClick={() => openEditPopup(service)} // Open edit modal with service details
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="border border-slate-600 p-2 rounded-lg text-white bg-red-600 font-bold ml-2"
                                            onClick={() => handleDeleteClick(service.id)}
                                        >
                                            Delete
                                        </button>
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

            <CreateServicePopup
                isOpen={isCreatePopupOpen}
                onClose={() => setIsCreatePopupOpen(false)}
            />

            {/* Popup xác nhận xóa */}
            <PopupConfirmAction
                title={"Are you confirm delete?"}
                content={"Are you sure you want to delete?"}
                actionDelete={"Delete"}
                actionCancel={"Cancel"}
                isOpen={isPopupOpen}
                onClose={closeDeletePopup}
                onConfirm={handleConfirmDelete}
            />

            {/* Update service modal */}
            {serviceToEdit && (
                <UpdateServicePopup
                    isOpen={isEditPopupOpen}
                    onClose={closeEditPopup}
                    service={serviceToEdit} // Pass the specific service to edit
                />
            )}
        </>
    );
};

export default TableService;
