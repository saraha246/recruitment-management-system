import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function VerifyOTP() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(
                "https://recruitment-management-system-production.up.railway.app/api/v1/auth/verify-otp",
                {
                    email,
                    otp,
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data));

            alert("Email verified successfully!");

            navigate("/");
            window.location.reload();

        } catch (err) {
            setError(err.response?.data?.message || "OTP verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6]">
            <Navbar />

            <div className="flex justify-center items-center pt-12">

                <div className="bg-white shadow-md rounded-xl p-8 w-[400px]">

                    <h2 className="text-2xl font-semibold text-center text-[#1A3A5C]">
                        Verify Email
                    </h2>

                    <p className="text-sm text-gray-500 text-center mt-2">
                        Enter the OTP sent to
                    </p>

                    <p className="text-center font-medium mb-6">
                        {email}
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleVerify}>

                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            required
                            className="w-full border rounded-md px-3 py-2 mb-5 text-center text-xl tracking-[8px]"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0F766E] text-white py-2 rounded-md hover:bg-[#0c5d56]"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default VerifyOTP;