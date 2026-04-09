import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import AppliedJobTable from './AppliedJobTable';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Navbar />

      {/* Browse Results (Commented) */}
      {/* 
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Search Results ({allJobs.length})
        </Typography>
        <Grid container spacing={3}>
          {allJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Job job={job} />
            </Grid>
          ))}
        </Grid>
      </Container> 
      */}

      {/* Applied Jobs Table */}
      <Container maxWidth="md" sx={{ mt: 8, minWidth: "90vw" }}>
        <Paper
          elevation={3}
          sx={{ borderRadius: 4, p: 4, bgcolor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
        >
          <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
            Applied Jobs
          </Typography>

          <AppliedJobTable />
        </Paper>
      </Container>
    </Box>
  );
};

export default Browse;
