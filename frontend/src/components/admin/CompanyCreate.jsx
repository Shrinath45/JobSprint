import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name cannot be empty!");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company._id}`);
            } else {
                toast.error("Something went wrong while creating the company.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create company.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Your Company Name</h1>
                    <p className="text-gray-500 mt-1">
                        What would you like to name your company? You can change this later.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input
                        type="text"
                        placeholder="JobHunt, Microsoft, etc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-10">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/admin/companies")}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={registerNewCompany}
                        disabled={loading}
                        className="w-full sm:w-auto"
                    >
                        {loading ? "Please wait..." : "Continue"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
