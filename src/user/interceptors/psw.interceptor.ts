import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class PswInterceptor implements NestInterceptor {
  intercept(_, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data?: UserEntity | UserEntity[]) => {
        if (data) {
          const usersArray = Array.isArray(data) ? data : [data];
          const result = usersArray.map(
            (item): Omit<UserEntity, 'password'> => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { password, ...userData } = item;
              return userData;
            },
          );
          return result.length > 1 ? result : result[0];
        }
      }),
    );
  }
}
