import SideBarStaff from "@/components/layout/Sidebar/SidebarStaff";
import TableSchedule from "@/components/TableSchedule/TableSchedule";
import { useState } from "react";

const ScheduleManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = (isOpen: boolean) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="flex h-screen">
            <div className="fixed z-50">
                <SideBarStaff onToggle={handleSidebarToggle} />
            </div>
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 mt-8 px-4`}
            >
                <TableSchedule />
            </div>
        </div>
    );
};

export default ScheduleManagement;
