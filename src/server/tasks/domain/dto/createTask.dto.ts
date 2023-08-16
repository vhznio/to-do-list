/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

export const CreateTaskSchema = Joi.object<CreateTaskDto>({
  name: Joi.string().required(),
  date: Joi.date().iso().required(),
  priority: Joi.string().valid('LOW', 'MID', 'HIGH').required(),
  status: Joi.boolean(),
});

export interface CreateTaskDto {
  name: string;
  date: Date;
  priority: string;
  status: boolean | null;
}
