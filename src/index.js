import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

const App = () => {
    const [reports, setReports] = useState([]);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');

    const getReports = async () => {
        try {
            const response = await axios.get('/api/reports');
            console.log(response);
            setReports(response.data.reports);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getReports();
    }, [])

    const onChange = (event) => {
        if (event.target.name === 'title') {
            setTitle(event.target.value);
        } else if (event.target.name === 'location') {
            setLocation(event.target.value);
        } else if (event.target.name === 'description') {
            setDescription(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const createReport = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/reports', {
                title,
                location,
                description,
                password
            });
            setReports([...reports, response.data]);
            getReports();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <h1>Phenomena</h1>

            <ul>
                {
                    reports.map((report, index) => {
                        return <li key={index}>{report.title}</li>
                    })
                }
            </ul>

            <form>

                <input
                    value={title}
                    onChange={onChange}
                    name='title'
                    placeholder='title'
                />

                <input
                    value={location}
                    onChange={onChange}
                    name='location'
                    placeholder='location'
                />


                <input
                    value={description}
                    onChange={onChange}
                    name='description'
                    placeholder='description'
                />

                <input
                    value={password}
                    onChange={onChange}
                    name='password'
                    placeholder='password'
                />

                <button
                    onClick={createReport}>
                    Submit Report
                </button>

            </form>
        </>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />)