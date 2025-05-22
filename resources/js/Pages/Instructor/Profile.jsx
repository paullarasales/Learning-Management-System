import { useState } from "react";
import InstructorLayout from "@/Layouts/InstructorLayout";
import axios from "axios";

export default function Profile({ user }) {
    const [form, setForm] = useState({
        firstname: user.firstname || "",
        middlename: user.middlename || "",
        lastname: user.lastname || "",
        email: user.email || "",
        contact_number: user.contact_number || "",
        specialization: user.specialization || "",
        bio: user.bio || "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        try {
            await axios.put("/instructor/profile", form);
            setSuccess("Profile updated successfully!");
        } catch (err) {
            setError("Failed to update profile.");
        }
        setLoading(false);
    };

    return (
        <InstructorLayout>
            <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-6">My Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            value={form.firstname}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            name="middlename"
                            value={form.middlename}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            value={form.lastname}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            name="contact_number"
                            value={form.contact_number}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Specialization
                        </label>
                        <input
                            type="text"
                            name="specialization"
                            value={form.specialization}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            rows={3}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                    {success && <div className="text-green-600">{success}</div>}
                    {error && <div className="text-red-600">{error}</div>}
                </form>
            </div>
        </InstructorLayout>
    );
}
