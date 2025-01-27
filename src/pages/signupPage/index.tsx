import { useState, FormEvent } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";

interface SignupForm {
    fullname: string;
    email: string;
    password: string;
    userType: string;
}

export default function SignupPage() {
    const [formData, setFormData] = useState<SignupForm>({
        fullname: "",
        email: "",
        password: "",
        userType: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "https://studycoin-w4q3.onrender.com/api/v1/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error Data:", errorData); // Log the error response for debugging
                throw new Error(errorData?.message || "Something went wrong!");
            }

            const data = await response.json();
            console.log(data);

            // Extract OTP code
            const otpCode = data?.data?.user?.otp?.code;
            if (otpCode) {
                navigate("/otp");
                alert(`Your OTP is: ${otpCode}`); // Alert OTP after navigation
            } else {
                throw new Error("OTP not found in response");
            }

            setFormData({
                fullname: "",
                email: "",
                password: "",
                userType: "",
            });
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xl space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-[#2E74E5] text-2xl md:text-2xl font-medium">
                        Every task has a reward welcome to Learnit
                    </h1>
                    <p className="text-[#2E74E5] text-xl md:text-2xl font-medium">
                        where academic activities <br /> meet rewards
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-900 font-normal">
                            FULL NAME
                        </Label>
                        <Input
                            id="fullName"
                            type="text"
                            required
                            className="border-gray-300 h-12"
                            value={formData.fullname}
                            onChange={(e) =>
                                setFormData({ ...formData, fullname: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="uppercase text-gray-900 font-normal">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            className="border-gray-300 h-12"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-900 font-normal">
                            PASSWORD
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            className="border-gray-300 h-12"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                    </div>

                    <select
                        id="userType"
                        required
                        className="border border-gray-300 rounded h-12 w-full px-3 text-gray-900"
                        value={formData.userType}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                userType: value,
                            }));
                        }}
                    >
                        <option value="" disabled>
                            Select User Type
                        </option>
                        <option value="Student">Student</option>
                        <option value="Lecturer">Lecturer</option>
                    </select>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-1/2 bg-[#2E74E5] hover:bg-[#2E74E5]/90 text-white h-10 text-sm"
                            >
                                {loading ? "Signing up..." : "Signup"}
                            </Button>
                        </div>
                        <div className="py-5 text-center">
                            <p className="text-base font-normal">
                                Already have an account?{" "}
                                <a href="/login">
                                    <span className="text-[#2E74E5] font-semibold">Login</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
