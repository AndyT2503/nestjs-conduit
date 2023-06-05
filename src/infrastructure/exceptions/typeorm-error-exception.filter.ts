import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';
import { ExceptionDto } from './exception.dto';

@Catch(TypeORMError)
export class TypeOrmErrorExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorJsonResponse: ExceptionDto = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: [exception.message],
      error: 'Internal server error',
    };
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorJsonResponse);
  }
}
