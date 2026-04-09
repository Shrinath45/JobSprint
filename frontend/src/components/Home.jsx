import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    } else if (user?.role === 'student') {
      navigate("/home");
    }
  }, []);
  return (
    <div>
      <HeroSection />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home