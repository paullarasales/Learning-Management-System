import InstructorLayout from "@/Layouts/InstructorLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <InstructorLayout>
            <Head title="Admin Dashboard" />
            <div className="py-12"></div>
        </InstructorLayout>
    );
}
