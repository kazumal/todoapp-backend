import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class TaskBody {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsBoolean()
  isCompleted: boolean;
}
