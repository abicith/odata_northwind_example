import * as requestp from 'request-promise';
import express = require('express');
import { Inject, Service } from '@tsed/common';
import { JsonOnlyPayload } from '../models/JsonOnlyPayload';
import { ProductsListModel, ProductSummary } from '../models/northwindModel';
import { NorthwindOrdersModel } from '../models/northwindModel';
import { ObjectMapper } from 'json-object-mapper';
import { CarrierListModel, FlightListModel, FlightModel } from '../models/carriersModel';
import { UserDeets } from '../../user_details';

@Service()
export class NorthwindService {
    private newLine = require('os').EOL;

    public async getFlight(
        request: express.Request,
        Carrid: string,
        Connid: string,
        Fldate: string
    ): Promise<JsonOnlyPayload<FlightModel>> {
        const authHeader = {
            channel: 'acos',
            'user-id': request.headers['iv-user'] as string
        };
        const loginDeets = new UserDeets;
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: `${loginDeets.url}/ZSFLIGHT_PROJECT2_SRV/Flights(Carrid='${Carrid}',Connid='${Connid}',Fldate=datetime'${Fldate}')`,
            auth: {
                'user': loginDeets.uname,
                'pass': loginDeets.pword,
                'sendImmediately': true
            },
            qs: {$format: 'json', 'sap-client': '421'},
            headers: authHeader,
            json: true
        };
        const response = await requestp(options);
        const deserializedData = ObjectMapper.deserialize<FlightModel>(FlightModel, response.d);
        return new JsonOnlyPayload<FlightModel>(deserializedData);
    }

    public async getCarriers(
        request: express.Request
    ): Promise<JsonOnlyPayload<CarrierListModel>> {
        const authHeader = {
            channel: 'acos',
            'user-id': request.headers['iv-user'] as string
        };
        const loginDeets = new UserDeets;
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: `${loginDeets.url}/ZSFLIGHT_PROJECT2_SRV/Carriers`,
            auth: {
                'user': loginDeets.uname,
                'pass': loginDeets.pword,
                'sendImmediately': true
            },
            qs: {$format: 'json', 'sap-client': '421'},
            headers: authHeader,
            json: true
        };
        const response = await requestp(options);
        const deserializedData = ObjectMapper.deserialize<CarrierListModel>(CarrierListModel, response.d);
        return new JsonOnlyPayload<CarrierListModel>(deserializedData);
    }

    public async getFlights(
        request: express.Request
    ): Promise<JsonOnlyPayload<FlightListModel>> {
        const authHeader = {
            channel: 'acos',
            'user-id': request.headers['iv-user'] as string
        };
        const loginDeets = new UserDeets;
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: `${loginDeets.url}/ZSFLIGHT_PROJECT2_SRV/Flights`,
            auth: {
                'user': loginDeets.uname,
                'pass': loginDeets.pword,
                'sendImmediately': true
            },
            qs: {$format: 'json', 'sap-client': '421'},
            headers: authHeader,
            json: true
        };
        const response = await requestp(options);
        const deserializedData = ObjectMapper.deserialize<FlightListModel>(FlightListModel, response.d);
        return new JsonOnlyPayload<FlightListModel>(deserializedData);
    }

    public async getFlightsByCarrier(
        request: express.Request,
        carrierId: string
    ): Promise<JsonOnlyPayload<FlightListModel>> {
        const authHeader = {
            channel: 'acos',
            'user-id': request.headers['iv-user'] as string
        };
        const loginDeets = new UserDeets;
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: `${loginDeets.url}/ZSFLIGHT_PROJECT2_SRV/Carriers('${carrierId}')/Flights`,
            auth: {
                'user': loginDeets.uname,
                'pass': loginDeets.pword,
                'sendImmediately': true
            },
            qs: {$format: 'json', 'sap-client': '421'},
            headers: authHeader,
            json: true
        };
        const response = await requestp(options);
        const deserializedData = ObjectMapper.deserialize<FlightListModel>(FlightListModel, response.d);
        return new JsonOnlyPayload<FlightListModel>(deserializedData);
    }

    public async getProducts(
        request: express.Request
    ): Promise<JsonOnlyPayload<ProductsListModel>> {
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: 'https://services.odata.org/V2/Northwind/Northwind.svc/Current_Product_Lists/',
            qs: {$format: 'json'},
            json: true
        };

        const response = await requestp(options);
        const deserializedData = ObjectMapper.deserialize<ProductsListModel>(ProductsListModel, response.d);
        console.log('The Response Was: ' + '\n' + response.d);
        return new JsonOnlyPayload<ProductsListModel>(deserializedData);
    }

    public async getProductsCount(
        request: express.Request
    ): Promise<JsonOnlyPayload<Number>> {
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: 'https://services.odata.org/V2/Northwind/Northwind.svc/Current_Product_Lists/$count',
            qs: {$format: 'json'},
            json: true
        };

        const response = await requestp(options);

        console.log('The Response Was: \n' + response.d);

        return new JsonOnlyPayload<Number>(response);
    }

    public async getProduct(
        request: express.Request,
        productId,
        productName
    ): Promise<JsonOnlyPayload<ProductSummary>> {
        const productLoc = `https://services.odata.org/V2/Northwind/Northwind.svc/
        Current_Product_Lists(ProductID="+productId+",ProductName='"+productName+"')/`;
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: productLoc,
            qs: {$format: 'json'},
            json: true
        };

        const response = await requestp(options);

        console.log('The response was: \n' + response.d);
        const deserializedData = ObjectMapper.deserialize<ProductSummary>(ProductSummary, response.d);

        return new JsonOnlyPayload<ProductSummary>(deserializedData);
    }

    public async getProductName(
        request: express.Request,
        productId
    ): Promise<JsonOnlyPayload<ProductsListModel>> {
        const filter = 'ProductID eq ' + productId;
        const productLoc = 'https://services.odata.org/V2/Northwind/Northwind.svc/Current_Product_Lists/';
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: productLoc,
            qs: {$format: 'json', $filter: filter},
            json: true
        };

        const response = await requestp(options);

        const deserializedData = ObjectMapper.deserialize<ProductsListModel>(ProductsListModel, response.d);
        console.log('The Response Was: ' + '\n' + response.d);

        return new JsonOnlyPayload<ProductsListModel>(deserializedData);
    }

    public async getOrderDetails(
        request: express.Request
    ): Promise<JsonOnlyPayload<NorthwindOrdersModel>> {
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: 'https://services.odata.org/V2/Northwind/Northwind.svc/Order_Details/',
            qs: {$format: 'json', $expand: 'Order,Order/Employee'},
            json: true
        };

        const response = await requestp(options);

        console.log('the response was:\n' + response.d);
        const deserializedData = ObjectMapper.deserialize<NorthwindOrdersModel>(NorthwindOrdersModel, response.d);

        return new JsonOnlyPayload<NorthwindOrdersModel>(deserializedData);
    }
}
