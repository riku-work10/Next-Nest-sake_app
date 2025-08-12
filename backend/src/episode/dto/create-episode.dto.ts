import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class CreateEpisodeDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
