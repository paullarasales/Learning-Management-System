import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AdminAuthenticatedLayout>
            <Head title="Admin Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm-rounded-lg">
                        <div className="p-6 text-gray-900">Admin Dashboard</div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
