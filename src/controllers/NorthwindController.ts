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
import { NorthwindService } from '../services/northwindService';
import { ProductsListModel, ProductSummary } from '../models/northwindModel';
import { NorthwindOrdersModel } from '../models/northwindModel';
import { CarrierListModel, CarrierModel, FlightListModel, FlightModel } from '../models/carriersModel';

@Controller('/northwind')
@MergeParams()
@Description('Controller for Exercise')
export class NorthwindController {
    constructor(@Inject() private northwindService: NorthwindService) { }

    @Get('/Flight/carrierID/:carrid/connectionID/:connid/Datetime/:Fldate')
    @Authenticated()
    @Description('get a flight')
    @Returns(OK, { type: FlightModel })
    public async getFlight(
        @Req() req: express.Request,
        @Required()
        @Description('ID of carrier')
        @PathParams('carrid')
        carrierId: string,
        @Required()
        @Description('ID of connection')
        @PathParams('connid')
        connId: string,
        @Required()
        @Description('Datetime of flight')
        @PathParams('Fldate')
        Fldate: string
    ): Promise<JsonOnlyPayload<FlightModel>> {
        return this.northwindService.getFlight(req, carrierId, connId, Fldate);
    }

    @Get('/Carriers')
    @Authenticated()
    @Description('Get all carriers')
    @Returns(OK, { type: CarrierListModel })
    public async getCarriers(
        @Req() req: express.Request,
    ): Promise<JsonOnlyPayload<CarrierListModel>> {
        return this.northwindService.getCarriers(req);
    }

    @Get('/Flights')
    @Authenticated()
    @Description('Get all flights')
    @Returns(OK, { type: FlightListModel })
    public async getFlights(
        @Req() req: express.Request,
    ): Promise<JsonOnlyPayload<FlightListModel>> {
        return this.northwindService.getFlights(req);
    }

    @Get('/FlightsByCarrier/CID/:carrierId')
    @Authenticated()
    @Description('Get all flights from specified carrier')
    @Returns(OK, { type: FlightListModel })
    public async getFlightsByCarrier(
        @Req() req: express.Request,
        @Required()
        @Description('ID of carrier')
        @PathParams('carrierId')
        carrierId: string
    ): Promise<JsonOnlyPayload<FlightListModel>> {
        return this.northwindService.getFlightsByCarrier(req, carrierId);
    }

    @Get('/Products')
    @Authenticated()
    @Description('Get all product ID\'s and names')
    @Returns(OK, { type: ProductsListModel })
    public async getProductDets(
        @Req() req: express.Request,
    ): Promise<JsonOnlyPayload<ProductsListModel>> {
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
    @Returns(OK, { type: ProductSummary })
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
    ): Promise<JsonOnlyPayload<ProductSummary>> {
        return this.northwindService.getProduct(req, productId, productName);
    }

    @Get('/productid/:productId')
    @Authenticated()
    @Description('retrive product name for specified id')
    @Returns(OK, { type: ProductsListModel })
    public async getProductName(
        @Req() req: express.Request,
        @Required()
        @Description('a positive integer')
        @PathParams('productId')
        productId: string
    ): Promise<JsonOnlyPayload<ProductsListModel>> {
        return this.northwindService.getProductName(req, productId);
    }

    @Get('/details')
    @Authenticated()
    @Description('Get all products and their order details')
    @Returns(OK, { type: NorthwindOrdersModel })
    public async getOrderDetails(
        @Req() req: express.Request,
    ): Promise<JsonOnlyPayload<NorthwindOrdersModel>> {
        return this.northwindService.getOrderDetails(req);
    }
}
