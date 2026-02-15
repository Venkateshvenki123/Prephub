import { useState, useEffect } from 'react';
import JobForm from './JobForm';

const JobsDashboard = () => {
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        const response = await fetch('http://localhost:8001/jobs');
        const data = await response.json();
        setJobs(data);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="dashboard">
            <h1>📊 Job Applications ({jobs.length})</h1>
            <JobForm onJobAdded={fetchJobs} />
            
            <div className="jobs-list">
                {jobs.map(job => (
                    <div key={job.id} className="job-card">
                        <h3>{job.position} @ {job.company}</h3>
                        <p>Location: {job.location}</p>
                        <p>Status: <span className={`status-${job.status.toLowerCase()}`}>{job.status}</span></p>
                        <p>Date: {job.date_applied}</p>
                        <p>Notes: {job.notes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobsDashboard;
