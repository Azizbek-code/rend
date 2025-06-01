import { PartialType } from '@nestjs/mapped-types';
import {  CreateRent } from './create-rent.dto';

export class updateRent extends PartialType(CreateRent) {}
