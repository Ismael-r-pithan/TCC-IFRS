import { ApiProperty } from '@nestjs/swagger';
import { ResponseQuestionDto } from './response-question.dto';

export class ResponseQuestionListDto {
  @ApiProperty({ type: [ResponseQuestionDto] })
  questions: ResponseQuestionDto[];
  @ApiProperty()
  total: number;
}
