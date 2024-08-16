import React from 'react'
import { useQuery } from '@apollo/client'
import ClientRow from './ClientRow'
import { GET_CLIENTS } from '../queries/ClientQueries'
import Spinner from './Spinner'

const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    if (loading) return <Spinner />
    if (error) return <div>Error...</div>
    return (
        <>
            {!loading && !error &&
                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map((client) => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            }
        </>)



}

export default Clients
