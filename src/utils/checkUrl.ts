import { NotFoundException } from '@nestjs/common';

export const checkUrlForSlash = (req: Request): void => {
  const url: string = req?.url ?? '';
  if (url.endsWith('/')) {
    throw new NotFoundException();
  }
}
