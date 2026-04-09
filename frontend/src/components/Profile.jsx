import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [profile, setProfile] = useState(user?.profile || {});

  useEffect(() => {
    setProfile(user?.profile || {});
  }, [user]);

  const isResume = !!profile.resume;

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          {/* Avatar and Details */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Avatar className="h-24 w-24 mx-auto sm:mx-0">
              <AvatarImage
                src={
                  profile.profilePhoto ||
                  'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'
                }
                alt="profile"
              />
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm text-gray-600">{profile.bio || 'No bio added.'}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="text-right">
            <Button onClick={() => setOpen(true)} variant="outline" className="w-full sm:w-auto">
              <Pen className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500" />
            <span className="text-sm break-all">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500" />
            <span className="text-sm">{user?.phoneNumber || 'NA'}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h1 className="font-semibold text-sm mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, idx) => (
                <Badge key={idx} className="text-xs">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="my-6">
          <Label className="text-md font-bold block mb-1">Resume</Label>
          {isResume ? (
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm hover:underline break-all"
            >
              {profile.resumeOriginalName || 'View Resume'}
            </a>
          ) : (
            <span className="text-sm text-gray-500">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 mb-10">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

