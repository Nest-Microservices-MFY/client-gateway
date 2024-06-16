import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE } from '../config';
import { PaginationDto } from '../common/dto';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  /**
   *
   * POST crear product
   *
   */
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(
        this.productsClient.send(
          { cmd: 'create_product' },
          { ...createProductDto },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   *
   * GET obtener todos los product
   *
   */
  @Get()
  async findAllProducts(@Query() paginationDto: PaginationDto) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'find_all_products' }, paginationDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   *
   * GET obtener todos los product eliminados mediante soft delete
   *
   */
  @Get('deleted')
  async findAllDeletedProducts(@Query() paginationDto: PaginationDto) {
    try {
      return await firstValueFrom(
        this.productsClient.send(
          { cmd: 'find_all_products_deleted' },
          paginationDto,
        ),
      );
    } catch (error) {}
  }

  /**
   *
   * GET obtener product por su id
   *
   */
  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_product_by_id' }, { id: id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   *
   * PATCH actualizar product por su id
   *
   */
  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await firstValueFrom(
        this.productsClient.send(
          { cmd: 'update_product' },
          { ...updateProductDto, id: +id },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   *
   * DELETE eliminar product por su id
   *
   */
  @Delete(':id')
  async removeProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_product' }, { id: id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
