import * as requestp from 'request-promise';
import express = require('express');
import { Inject, Service } from '@tsed/common';
import { JsonOnlyPayload } from '../models/JsonOnlyPayload';
import { productsListModel, productSummary } from '../models/northwindModel';
import { northwindOrdersModel } from '../models/northwindModel';
import { ObjectMapper } from 'json-object-mapper';



@Service()
export class northwindService {
    private newLine = require('os').EOL;
    
    public async getProducts(
        request: express.Request
    ): Promise<JsonOnlyPayload<productsListModel>> {
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: 'https://services.odata.org/V2/Northwind/Northwind.svc/Current_Product_Lists/',
            qs: {$format: "json"},
            json: true
        }
        
        var response = await requestp(options);
               
        const deserializedData = ObjectMapper.deserialize<productsListModel>(productsListModel, response.d);
        console.log('The Response Was: '+'\n'+response.d);
        return new JsonOnlyPayload<productsListModel>(deserializedData);
    }

    public async getProductsCount(
        request: express.Request
    ): Promise<JsonOnlyPayload<Number>> {
        var response;
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: 'https://services.odata.org/V2/Northwind/Northwind.svc/Current_Product_Lists/$count',
            qs: {$format: "json"},
            json: true
        }

        response = await requestp(options);

        console.log('The Response Was: \n'+response.d);

        return new JsonOnlyPayload<Number>(response);
    }

    public async getProduct(
        request: express.Request,
        productId,
        productName    
    ): Promise<JsonOnlyPayload<productSummary>> {
        var response;
        var productLoc = "https://services.odata.org/V2/Northwind/Northwind.svc/Current_Product_Lists(ProductID="+productId+",ProductName='"+productName+"')/";
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: productLoc,
            qs: {$format: "json"},
            json: true
        }

        var response = await requestp(options);

        console.log('The response was: \n' + response.d);
        const deserializedData = ObjectMapper.deserialize<productSummary>(productSummary, response.d);

        return new JsonOnlyPayload<productSummary>(deserializedData);
    }

    public async getProductName(
        request: express.Request,
        productId
    ): Promise<JsonOnlyPayload<productsListModel>> {
        var response;
        const filter = 'ProductID eq '+productId;
        var productLoc = "https://services.odata.org/V2/Northwind/Northwind.svc/Current_Product_Lists/";
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: productLoc,
            qs: {$format: "json", $filter: filter},
            json: true
        }

        var response = await requestp(options);

        const deserializedData = ObjectMapper.deserialize<productsListModel>(productsListModel, response.d);
        console.log('The Response Was: '+'\n'+response.d);

        return new JsonOnlyPayload<productsListModel>(deserializedData);
    }

    public async getOrderDetails(
        request: express.Request
    ): Promise<JsonOnlyPayload<northwindOrdersModel>> {
        var response;
        const options = {
            proxy: 'http://haproxy.csda.gov.au:8080',
            strictSSL: false,
            url: "https://services.odata.org/V2/Northwind/Northwind.svc/Order_Details/",
            qs: {$format: "json", $expand: "Order,Order/Employee"}, 
            json: true
        }

        var response = await requestp(options);

        console.log('the response was:\n'+response.d);
        const deserializedData = ObjectMapper.deserialize<northwindOrdersModel>(northwindOrdersModel, response.d);

        return new JsonOnlyPayload<northwindOrdersModel>(deserializedData);        
    }
}
