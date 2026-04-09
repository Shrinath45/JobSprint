import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.email || !input.password || !input.role) {
            toast.error("All fields are required!");
            return;
        }

        try {
            dispatch(setLoading(true));

            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (res.data.success) {

                // ✅ STORE TOKEN
                sessionStorage.setItem("token", res.data.token);

                // ✅ SET TOKEN GLOBALLY
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${res.data.token}`;

                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/home");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <div>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={input.email} onChange={changeEventHandler} />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" name="password" value={input.password} onChange={changeEventHandler} />
                    </div>

                    {/* <RadioGroup className="flex gap-4 my-5">
                        <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} />
                        <Label>Student</Label>

                        <Input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} />
                        <Label>Recruiter</Label>
                    </RadioGroup>
                     */}

                    <div className="flex gap-4 mt-2">
                        {["student", "recruiter"].map((roleOption) => (
                            <button
                                key={roleOption}
                                type="button"
                                onClick={() => setInput({ ...input, role: roleOption })}
                                className={`px-4 py-2 mb-3 ms-2 flex rounded-lg border transition-all ${input.role === roleOption
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {roleOption.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <Button className="w-full">
                            <Loader2 className="animate-spin mr-2" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full">Login</Button>
                    )}

                    <p className="text-sm mt-3">
                        Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
