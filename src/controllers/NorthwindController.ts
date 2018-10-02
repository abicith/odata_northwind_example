import express = require('express');
import { 
    Authenticated,
    Controller,
    Get,
    Inject,
    Req,
    MergeParams,
    Required,
    PathParams
} from '@tsed/common';
import { Description, Returns } from '@tsed/swagger';
import { OK, NO_CONTENT, CREATED } from 'http-status-codes';
import { JsonOnlyPayload } from '../models/JsonOnlyPayload';
import { northwindService } from '../services/northwindService'
import { productsListModel, productSummary } from '../models/northwindModel';
import { northwindOrdersModel } from '../models/northwindModel';

@Controller('/northwind')
@MergeParams()
@Description('Controller for Exercise')
export class NorthwindController {
    constructor(@Inject() private northwindService: northwindService) { }

    @Get('/Products')
    @Authenticated()
    @Description('Get all product ID\'s and names')
    @Returns(OK, { type: productsListModel })
    public async getProductDets(
        @Req() req: express.Request,
    ): Promise<JsonOnlyPayload<productsListModel>> {
        return this.northwindService.getProducts(req);
    }

    @Get('/Products/Count')
    @Authenticated()
    @Description('Get a count of how many results there are in Products')
    @Returns(OK, { type: Number })
    public async getProductsCount(
        @Req() req: express.Request,
    ): Promise<JsonOnlyPayload<Number>> {
        return this.northwindService.getProductsCount(req);
    }
    
    @Get('/productid/:productId/productname/:productName')
    @Authenticated()
    @Description('retrive product name for specified id')
    @Returns(OK, { type: productSummary })
    public async getProduct(
        @Req() req: express.Request,
        @Required()
        @Description('a positive integer')
        @PathParams('productId')
        productId: string,
        @Required()
        @Description('products name')
        @PathParams('productName')
        productName: string
    ): Promise<JsonOnlyPayload<productSummary>> {
        return this.northwindService.getProduct(req, productId, productName);
    }

    @Get('/productid/:productId')
    @Authenticated()
    @Description('retrive product name for specified id')
    @Returns(OK, { type: productsListModel })
    public async getProductName(
        @Req() req: express.Request,
        @Required()
        @Description('a positive integer')
        @PathParams('productId')
        productId: string
    ): Promise<JsonOnlyPayload<productsListModel>> {
        return this.northwindService.getProductName(req, productId);
    }

    @Get('/details')
    @Authenticated()
    @Description('Get all products and their order details')
    @Returns(OK, { type: northwindOrdersModel })
    public async getOrderDetails(
        @Req() req: express.Request,
    ): Promise<JsonOnlyPayload<northwindOrdersModel>> {
        return this.northwindService.getOrderDetails(req);
    }
}