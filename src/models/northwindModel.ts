import { Description } from '@tsed/swagger';
import { JsonProperty } from 'json-object-mapper';

import { OrderDetails } from './OrderDetailsModel';

@Description('ProductSummary')
export class ProductSummary {
    @Description('product ID')
    @JsonProperty({ name: 'ProductID'})
    productID: number = undefined;

    @Description('product Name')
    @JsonProperty({ name: 'ProductName' })
    productName: string = undefined;
}

@Description('Products List')
export class ProductsListModel {
    @Description('Products')
    @JsonProperty({ name: 'results', type: ProductSummary })
    products: ProductSummary[] = [];
}

@Description('northwind Orders model')
export class NorthwindOrdersModel  {
    @Description('results')
    @JsonProperty({ name: 'results', type: OrderDetails})
    Orders: OrderDetails[] = [];

}
