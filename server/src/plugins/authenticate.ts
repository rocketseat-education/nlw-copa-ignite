import { FastifyInstance, FastifyRequest } from "fastify";

export async function authenticate(request: FastifyRequest) {
  await request.jwtVerify()
}
