import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: null,
    profilePhoto: null
  });

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = e => {
    const file = e.target.files?.[0];
    if (file && file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }
    setInput({ ...input, file });
  };

  const profilePhotoChangeHandler = e => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith('image/')) {
      toast.error('Only image files are allowed for profile photo');
      return;
    }
    setInput({ ...input, profilePhoto: file });
  };

  const submitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("fullname", input.fullname);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("bio", input.bio);
  formData.append("skills", input.skills);

  if (input.file) {
    formData.append("resume", input.file);
  }

  if (input.profilePhoto) {
    formData.append("profilePhoto", input.profilePhoto);
  }

  try {
    setLoading(true);

    const res = await axios.post(
  `${USER_API_END_POINT}/profile/update`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`, // ✅ REQUIRED
    },
  }
);

    if (res.data.success) {
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
    setOpen(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {[
              { label: 'Name', name: 'fullname', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Number', name: 'phoneNumber', type: 'text' },
              { label: 'Bio', name: 'bio', type: 'text' },
              { label: 'Skills', name: 'skills', type: 'text' }
            ].map(({ label, name, type }) => (
              <div className="flex flex-col gap-1" key={name}>
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  value={input[name]}
                  onChange={changeEventHandler}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <Label htmlFor="resume">Resume (PDF)</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={profilePhotoChangeHandler}
              />
            </div>

            {input.profilePhoto && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(input.profilePhoto)}
                  alt="Preview"
                  className="w-16 h-16 rounded-full mx-auto mt-2 object-cover"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full my-2" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Update'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;

