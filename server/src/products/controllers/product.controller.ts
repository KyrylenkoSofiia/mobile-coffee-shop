import { createProductDto } from '../dtos/create-product.dto';
import { ProductService } from './../services/product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('all')
  async getAllProducts(@Query('search') search: string) {
    return await this.productService.getAllProducts(search);
  }
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.findProductById(id);
  }

  @Post('create')
  async createProduct(@Body() body: createProductDto) {
    return await this.productService.createProduct(body);
  }
  @Delete(':id')
  async deleteProduct(@Param() id: string) {
    return await this.productService.deleteProduct(id);
  }
}
