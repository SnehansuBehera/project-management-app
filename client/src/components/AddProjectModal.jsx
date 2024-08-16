import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { ADD_PROJECT } from "../mutations/ProjectMutation";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { GET_CLIENTS } from "../queries/ClientQueries"


const AddProjectModal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new');
    const [clientId, setClientId] = useState('');

    const { loading, error, data } = useQuery(GET_CLIENTS);
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({ query: GET_PROJECTS, data: { projects: [...projects, addProject] } });
        }
    })
    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || description === '' || status === '' || clientId === '') {
            return alert("Enter all the fields");
        }
        addProject(name, description, status, clientId);
        setDescription('');
        setName('');
        setStatus('new');
        setClientId('');


    }
    if (loading) return null;
    if (error) return <div>Error...</div>
    return (
        <div>
            {!loading && !error &&
                <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                        <div className="d-flex align-items-center">
                            <FaList className="icon" />
                            <div>New Project</div>
                        </div>
                    </button>


                    <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addProjectModalLabel">New Project</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
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

                                            <div className="mt-3">
                                                <label className="form-label">Clients</label>
                                                <select id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                                    <option value="">Select Client</option>
                                                    {data.clients.map((client) => (
                                                        <option key={client.id} value={client.id}>{client.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <button className="btn btn-primary mt-3" type="submit" data-bs-dismiss='modal'>Save Changes</button>
                                        </form>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </>
            }


        </div>
    )
}

export default AddProjectModal;
