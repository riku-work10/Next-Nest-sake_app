import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, name: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, name, password: hashed },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return { access_token: token, user };
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
