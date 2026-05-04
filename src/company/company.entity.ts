import { User } from 'src/entities/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  domain!: string; 

  @Column({ nullable: true })
  logoUrl?: string;

  @OneToMany(() => User, user => user.company)
  users!: User[];
}