import React from 'react'
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from '../mutations/ClientMutation';
import { GET_CLIENTS } from '../queries/ClientQueries'
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/ProjectQueries'

const ClientRow = ({ client }) => {
    const [deleteClient] = useMutation(DELETE_CLIENT,
        {
            variables: { id: client.id },
            refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
            // update(cache, { data: { deleteClient } }) {
            //     const { clients } = cache.readQuery({ query: GET_CLIENTS });
            //     cache.writeQuery({
            //         query: GET_CLIENTS,
            //         data: { clients: clients.filter((client) => client.id != deleteClient.id) }
            //     })
            // }
        });
    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.phone}</td>
            <td>{client.email}</td>
            <td className=''>
                <button onClick={deleteClient} className='btn btn-danger btn-sm'><FaTrash /></button>
            </td>
        </tr>
    )
}

export default ClientRow
