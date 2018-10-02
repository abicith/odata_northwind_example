import { Description } from '@tsed/swagger';
import { JsonProperty } from 'json-object-mapper';

import { OrderDetails } from './OrderDetailsModel';

@Description('ProductSummary')
export class productSummary {
    @Description('product ID')
    @JsonProperty({ name: 'ProductID'})
    productID: number = undefined;

    @Description('product Name')
    @JsonProperty({ name: 'ProductName' })
    productName: string = undefined;
}

@Description('Products List')
export class productsListModel {
    @Description('Products')
    @JsonProperty({ name: 'results', type: productSummary })
    products: productSummary[] =[];
}

@Description('northwind Orders model')
export class northwindOrdersModel  {
    @Description('results')
    @JsonProperty({ name: 'results', type: OrderDetails})
    Orders: OrderDetails[] = [];

}