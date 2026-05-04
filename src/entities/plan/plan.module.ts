import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { Module } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Plan } from './plan.entity';
import { Permission } from '../permission/permission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Plan, Permission]),],
    controllers: [
        PlanController,],
    providers: [
        PlanService,],
})
export class PlanModule { }
