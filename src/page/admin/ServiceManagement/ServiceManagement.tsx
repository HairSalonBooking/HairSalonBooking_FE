import SideBar from "@/components/layout/Sidebar/Sidebar";
import TableService from "@/components/TableService/TableService";

const ServiceManagement = () => {
    return (
        <div className="grid grid-cols-12 gap-12 h-screen">
            <div className="col-span-3">
                <SideBar />
            </div>
            <div className="col-span-8 w-auto min-w-64 mt-8">
                <TableService />
            </div>
        </div>
    );
};

export default ServiceManagement;
