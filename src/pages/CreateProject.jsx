import { useState,useContext } from 'react';
import { authContext } from '../context/AuthContext';
import axios from 'axios';

function CreateProject() {

    const { user } = useContext(authContext)
    const token = localStorage.getItem('token')

    const [projectForm, setProjectForm] = useState({
        name: '',
        description: '',
        type: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/projects', projectForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Project created:', response.data);

            setProjectForm({
                name: '',
                description: '',
                type: ''
            });

            setMessage('Project created successfully!');

            setTimeout(() => setMessage(''), 3000);

        } catch (error) {
            console.error('Error creating project:', error);
            setMessage('Failed to create project.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <br />
                    <input
                        className='formControl'
                        type='text'
                        name='name'
                        value={projectForm.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <br />
                    <input
                        className='formControl'
                        type='text'
                        name='description'
                        value={projectForm.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Type:</label>
                    <br />
                    <input
                        className='formControl'
                        type='text'
                        name='type'
                        value={projectForm.type}
                        onChange={handleChange}
                    />
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default CreateProject;
