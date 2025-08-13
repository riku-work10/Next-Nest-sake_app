import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateEpisodeDto, @Req() req) {
    return this.episodeService.create({
      ...dto,
      userId: req.user.sub, // JWTのsubから取得
    });
  }

  @Get()
  findAll() {
    return this.episodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodeService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEpisodeDto) {
    return this.episodeService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodeService.remove(Number(id));
  }
}
