import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { CustomException } from "../exception/custom.exception";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const reply = ctx.getResponse<FastifyReply>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";

    if (exception instanceof CustomException) {
      status = exception.status;
      message = exception.message;
    }

    reply.status(status).send({
      success: false,
      message: exception.message ?? message,
      path: request.url,
    });
  }
}
