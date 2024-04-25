import { JwtService } from '@nestjs/jwt';
import { User } from './user.model';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User | null>;
    login(user: User): Promise<{
        access_token: string;
    }>;
}
