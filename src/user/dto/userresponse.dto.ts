import { User } from '../user.model';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.get('id') as number;
    this.name = user.get('name') as string;
    this.email = user.get('email') as string;
    this.createdAt = user.get('createdAt') as Date;
    this.updatedAt = user.get('updatedAt') as Date;
  }
}
