import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/ClientMutation";
import { GET_CLIENTS } from "../queries/ClientQueries";


const AddClientModal = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({ query: GET_CLIENTS, data: { clients: [...clients, addClient] } });
        }
    })
    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || phone === '') {
            return alert("Enter all the fields");
        }
        addClient(name, email, phone);
        setEmail('');
        setName('')
        setPhone('');

    }
    return (
        <div>

            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
                <div className="d-flex align-items-center">
                    <FaUser className="icon" />
                    <div>Add Client</div>
                </div>
            </button>


            <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <form onSubmit={onSubmit}>
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                    <label className="form-label">Email</label>
                                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label className="form-label">Phone</label>
                                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <button className="btn btn-secondary mt-3" type="submit" data-bs-dismiss='modal'>Save Changes</button>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddClientModal;
