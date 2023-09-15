import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizFeedbackDto } from './create-quiz-feedback.dto';

export class UpdateQuizFeedbackDto extends PartialType(CreateQuizFeedbackDto) {}
