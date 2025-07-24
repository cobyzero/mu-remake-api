import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const user = this.userRepository.create(registerDto);
        return this.userRepository.save(user);
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOneBy({ username: loginDto.username });
        if (!user) {
            throw new Error('User not found');
        }
        return {
            access_token: this.jwtService.sign({ id: user.id }),
        };
    }
}
