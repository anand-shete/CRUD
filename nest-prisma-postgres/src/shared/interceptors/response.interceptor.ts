import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface CustomResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, CustomResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<CustomResponse<T>> {
    return next.handle().pipe(
      map((resBody: any) => {
        return {
          success: true,
          message: resBody.message ?? "Response success",
          data: resBody.data,
        };
      }),
    );
  }
}
