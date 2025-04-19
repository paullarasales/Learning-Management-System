import InstructorLayout from "@/Layouts/InstructorLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <InstructorLayout>
            <Head title="Admin Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm-rounded-lg">
                        <div className="p-6 text-gray-900">
                            Instructor Dashboard
                        </div>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}
