import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Users, BookOpen, UserCheck } from "lucide-react"; // Optional icons

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({
    chartData,
    totalData,
    recentInstructors,
    recentStudents,
    recentClasses,
}) {
    const data = {
        labels: chartData.months,
        datasets: [
            {
                label: "Instructors",
                data: chartData.instructors,
                borderColor: "#4f46e5",
                backgroundColor: "rgba(79, 70, 229, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
            {
                label: "Students",
                data: chartData.students,
                borderColor: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
            {
                label: "Classes",
                data: chartData.classes,
                borderColor: "#f97316",
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: "#111827",
                titleColor: "#fff",
                bodyColor: "#d1d5db",
                borderColor: "#4b5563",
                borderWidth: 1,
                callbacks: {
                    label: (tooltipItem) =>
                        `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
            },
            legend: {
                position: "top",
                labels: {
                    color: "#4b5563",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#6b7280",
                },
            },
            y: {
                ticks: {
                    color: "#6b7280",
                },
                beginAtZero: true,
            },
        },
    };

    const cards = [
        {
            label: "Total Instructors",
            value: totalData.instructors,
            icon: <UserCheck className="text-indigo-600 w-6 h-6" />,
        },
        {
            label: "Total Students",
            value: totalData.students,
            icon: <Users className="text-emerald-600 w-6 h-6" />,
        },
        {
            label: "Total Classes",
            value: totalData.classes,
            icon: <BookOpen className="text-orange-500 w-6 h-6" />,
        },
    ];

    return (
        <AdminAuthenticatedLayout>
            <div className="min-h-screen bg-white p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4"
                            >
                                <div className="p-3 bg-gray-100 rounded-full">
                                    {card.icon}
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">
                                        {card.label}
                                    </h2>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {card.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chart and Recent Students */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                User Distribution Over 12 Months
                            </h2>
                            <Line data={data} options={options} />
                        </div>

                        {/* Recent Students */}
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Recent Students
                            </h2>
                            <ul className="divide-y divide-gray-200">
                                {recentStudents.map((student) => (
                                    <li key={student.id} className="py-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            {student.firstname}{" "}
                                            {student.lastname}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {student.email}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Recent Classes and Instructors */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Classes */}
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Recent Classes
                            </h2>
                            <ul className="divide-y divide-gray-200">
                                {recentClasses.map((cls) => (
                                    <li key={cls.id} className="py-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            {cls.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {cls.schedule}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recent Instructors */}
                        <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Recent Instructors
                            </h2>
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-gray-500">
                                            Photo
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-500">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-500">
                                            Email
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-500">
                                            Specialization
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentInstructors.map((instructor) => (
                                        <tr key={instructor.id}>
                                            <td className="px-4 py-2">
                                                {instructor.profile_picture ? (
                                                    <img
                                                        src={`/profiles/${instructor.profile_picture}`}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400">
                                                        N/A
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                {instructor.firstname}{" "}
                                                {instructor.lastname}
                                            </td>
                                            <td className="px-4 py-2">
                                                {instructor.email}
                                            </td>
                                            <td className="px-4 py-2">
                                                {instructor.specialization ??
                                                    "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
