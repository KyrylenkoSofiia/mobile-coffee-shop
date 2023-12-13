import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createProductDto } from '../dtos/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schema/products.schema';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async createProduct(@Body() body: createProductDto) {
    const { title } = body;

    const isProductExist = await this.findProductByTitle(title);
    if (isProductExist.length > 0) {
      throw new HttpException(
        'Product with this title already exists',
        HttpStatus.CONFLICT,
      );
    }
    const product = new this.productModel({
      _id: new mongoose.Types.ObjectId(),
      ...body,
      availableSizes: ['S', 'M', 'L'],
      stars: 0,
      starsCount: 0,
    });
    await product.save();
    return product;
  }
  async findProductById(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return await this.productModel.findOne({ _id: objectId });
  }
  async findProductByTitle(title: string) {
    const products = await this.productModel.find({ title });
    return products;
  }
  async deleteProduct(id: string) {
    try {
      const product = await this.findProductById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      await product.deleteOne();
      return product;
    } catch (err) {
      throw new HttpException(String(err), 500);
    }
  }
  async getAllProducts(search?: string) {
    try {
      let query = {};

      if (search) {
        query = { title: { $regex: new RegExp(search, 'i') } };
      }

      const products = await this.productModel.find(query).exec();
      return products;
    } catch (err) {
      throw new HttpException(String(err), 500);
    }
  }
}
