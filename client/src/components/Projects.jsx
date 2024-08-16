import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_PROJECTS } from '../queries/ProjectQueries'
import Spinner from './Spinner';
import ProjectCard from './ProjectCard';
const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    // console.log(data.projects.length);
    if (loading) return <Spinner />;
    if (error) return <div>Error...</div>;
    return (
        <>
            {
                data.projects.length > 0 ? (
                    <div className='row mt-4'>
                        {
                            data.projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        }
                    </div>
                ) : (
                    <p>No Projects</p>
                )}
        </>
    )
}

export default Projects
