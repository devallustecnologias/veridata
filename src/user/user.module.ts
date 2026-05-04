import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { User } from 'src/entities/user/user.entity';
import { Plan } from 'src/entities/plan/plan.entity';
import { Permission } from 'src/entities/permission/permission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Plan, Permission]),],
    controllers: [
        UserController,],
    providers: [
        UserService,],
})
export class UserModule { }
