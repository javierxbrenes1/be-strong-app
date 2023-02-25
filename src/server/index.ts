import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import subscribeApollo from './apollo';

const server = fastify()

const start = async() => {
  try{
    
    await subscribeApollo(server);
    
    const address = await server.listen({ port: 8080 });

    console.log(`Server listening at ${address}`)
  }catch(er) {
    server.log.error(er)
    console.log(er)
    process.exit(1)
  }
}

start();