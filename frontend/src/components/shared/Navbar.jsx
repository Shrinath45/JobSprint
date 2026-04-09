import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        localStorage.removeItem("token");
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Sprint</span>
        </h1>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>

                {/* ✅ Only show when user is logged in */}
                {user && (
                  <li>
                    <Link to="/saved">Saved Jobs</Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {/* Desktop Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-4 text-gray-600">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div
                    className="flex items-center gap-2 cursor-pointer mt-1"
                    onClick={logoutHandler}
                  >
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/home" onClick={() => setMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                    Jobs
                  </Link>
                </li>

                {/* ✅ Only show when logged in */}
                {user && (
                  <li>
                    <Link to="/saved" onClick={() => setMenuOpen(false)}>
                      Saved Jobs
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4 text-gray-600">
              {user?.role === "student" && (
                <Link
                  to="/profile"
                  className="flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <User2 size={18} />
                  View Profile
                </Link>
              )}
              <button
                className="flex items-center gap-2 text-red-600"
                onClick={() => {
                  logoutHandler();
                  setMenuOpen(false);
                }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;