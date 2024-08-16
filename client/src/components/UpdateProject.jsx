import React, { useState } from 'react'
import { UPDATE_PROJECT } from '../mutations/ProjectMutation';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/ProjectQueries';

const UpdateProject = ({ project }) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('');

    const [UpdateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    })

    const onSubmit = (e) => {
        e.preventDefault();
        if (!name || !description || !status) {
            return alert('Please fill out all fields');
        }
        UpdateProject(name, description, status);

    }

    return (
        <div className='mt-5'>
            <h3>Update Project Details</h3>
            <form onSubmit={onSubmit}>
                <label className="form-label">Name</label>
                <input id="name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                <label className="form-label">Description</label>
                <textarea id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <label className="form-label">Status</label>
                <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button type='submit' className='btn btn-primary mt-3'>Save Changes</button>
            </form>
        </div>
    )
}

export default UpdateProject
