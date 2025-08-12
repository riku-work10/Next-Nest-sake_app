import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodeService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEpisodeDto) {
    return this.prisma.episode.create({ data });
  }

  findAll() {
    return this.prisma.episode.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.episode.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: number, data: UpdateEpisodeDto) {
    return this.prisma.episode.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.episode.delete({
      where: { id },
    });
  }
}
