// import { clients, projects } from '../SampleData.js';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } from 'graphql';
import Client from '../model/ClientSchema.js';
import Project from '../model/ProjectSchema.js';

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent) {
                return Client.findById(parent.clientId);
            }

        }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent) {
                return Project.find();
            }
        },
        clients: {
            type: GraphQLList(ClientType),
            resolve(parent) {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                })
                return client.save();
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                Project.find({ clientId: args.id }).then((projects) => {
                    projects.forEach((project) => {
                        project.remove();
                    })
                })
                return Client.findByIdAndDelete(args.id);
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            "new": { value: "Not Started" },
                            "progress": { value: "In Progress" },
                            "completed": { value: "Completed" }
                        }
                    }),
                    defaultValue: 'Not Started'
                },
                clientId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })
                return project.save();
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Project.findByIdAndDelete(args.id);
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            "new": { value: "Not Started" },
                            "progress": { value: "In Progress" },
                            "completed": { value: "Completed" }
                        }
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        }
                    },
                    { new: true }
                )
            }
        }

    }

})
export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})