import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { ORDER_SERVICE } from '../config';
import { PaginationDto } from 'src/common/dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  /**
   *
   * POST crear order
   *
   */
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('createOrder', createOrderDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   *
   * GET muestra todas las ordenes
   *
   */
  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('findAllOrders', orderPaginationDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   *
   * GET endpoint para buscar ordenes por su id (UUID)
   *
   */
  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id: id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   *
   * GET endpoint para buscar todas las ordenes filtrado por status (como parámetro)
   *
   */
  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('findAllOrders', {
          ...paginationDto,
          status: statusDto.status,
        }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   *
   * GET muestra todas las ordenes
   *
   */
  @Patch(':id')
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('changeOrderStatus', {
          id,
          status: statusDto.status,
        }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
