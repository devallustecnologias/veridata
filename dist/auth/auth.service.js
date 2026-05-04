"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const user_entity_1 = require("../entities/user/user.entity");
const google_auth_library_1 = require("google-auth-library");
let AuthService = class AuthService {
    jwtService;
    userRepository;
    googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async register(data) {
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(data.password, 10);
        }
        catch (err) {
            console.error('Erro ao gerar hash da senha:', err);
            throw new common_1.InternalServerErrorException('Erro interno ao criar a senha.');
        }
        const user = this.userRepository.create({
            ...data,
            password: hashedPassword,
            uid: (0, uuid_1.v4)(),
        });
        let userCreate;
        try {
            userCreate = await this.userRepository.save(user);
        }
        catch (err) {
            console.error('Erro ao salvar o usuário:', err);
            if (err.code === '23505') {
                throw new common_1.InternalServerErrorException('Email já cadastrado.');
            }
            throw new common_1.InternalServerErrorException('Erro ao registrar o usuário.');
        }
        return userCreate;
    }
    async login(email, password) {
        let user;
        try {
            user = await this.userRepository.findOne({
                where: { email },
            });
        }
        catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw new common_1.InternalServerErrorException('Erro ao realizar o login.');
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        let passwordMatch;
        try {
            passwordMatch = await bcrypt.compare(password, user.password);
        }
        catch (error) {
            console.error('Erro ao comparar senhas:', error);
            throw new common_1.InternalServerErrorException('Erro ao realizar o login.');
        }
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.uid, username: user.username };
        try {
            return { accessToken: this.jwtService.sign(payload) };
        }
        catch (error) {
            console.error('Erro ao gerar token:', error);
            throw new common_1.InternalServerErrorException('Erro ao realizar o login.');
        }
    }
    async googleLogin(credential) {
        let ticket;
        try {
            ticket = await this.googleClient.verifyIdToken({
                idToken: credential,
                audience: "76258390090-0blp9d4bhj7d65b6ugbmhdh72mtivgug.apps.googleusercontent.com",
            });
        }
        catch (err) {
            console.error('Erro ao verificar token do Google:', err);
            throw new common_1.InternalServerErrorException('Token inválido.');
        }
        const payload = ticket.getPayload();
        const { email, name, picture } = payload;
        if (!email) {
            throw new common_1.InternalServerErrorException('Email não encontrado no Google.');
        }
        let user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            user = this.userRepository.create({
                email,
                username: name,
                uid: (0, uuid_1.v4)(),
                password: (0, uuid_1.v4)(),
            });
            try {
                user = await this.userRepository.save(user);
            }
            catch (err) {
                console.error('Erro ao criar usuário Google:', err);
                throw new common_1.InternalServerErrorException('Erro ao registrar usuário Google.');
            }
        }
        const payloadToSign = { sub: user.uid, username: user.username };
        return { access_token: this.jwtService.sign(payloadToSign), uid: user.uid };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map