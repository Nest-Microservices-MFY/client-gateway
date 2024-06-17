import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

// TODO: ver si lo usamos
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
