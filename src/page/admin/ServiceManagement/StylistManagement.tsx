import SideBar from "@/components/layout/Sidebar/Sidebar";
import TableStylist from "@/components/TableStylist/TableStylist";
import { useState } from "react";

const ServiceManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = (isOpen: boolean) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="flex h-screen">
            <div className="fixed z-50">
                <SideBar onToggle={handleSidebarToggle} />
            </div>
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 mt-8 px-4`}
            >
                <TableStylist />
            </div>
        </div>
    );
};

export default ServiceManagement;
