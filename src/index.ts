import cors from 'cors';
import server, { PORT } from './server';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema/generalSchema';
import { mocks } from './mocks';

server.use(cors());

const apolloServer = new ApolloServer({
    typeDefs,
    mocks,
    mockEntireSchema: false,
});

const startServer = async () => {
    await apolloServer.start();

    apolloServer.applyMiddleware({ app: server, path: '/' , cors: false});

    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
};

startServer();