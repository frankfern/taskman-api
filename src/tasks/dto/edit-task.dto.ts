import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class EditTaskDto extends PartialType(
  OmitType(CreateTaskDto, ['slug'] as const),
) {}
