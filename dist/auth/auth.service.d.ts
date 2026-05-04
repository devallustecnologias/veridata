import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user/user.entity';
export declare class AuthService {
    private jwtService;
    private userRepository;
    private googleClient;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    register(data: {
        username: string;
        email: string;
        password: string;
        profile?: string;
        situacao?: string;
    }): Promise<any>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    googleLogin(credential: string): Promise<{
        access_token: string;
        uid: string;
    }>;
}
