import { Description } from '@tsed/swagger';
import { JsonProperty } from 'json-object-mapper';

@Description('Employee')
export class EmployeeInfo {
    @Description('FirstName')
    @JsonProperty({ name: 'FirstName' })
    FirstName: String = undefined;

    @Description('LastName')
    @JsonProperty({ name: 'LastName' })
    LastName: String = undefined;

    @Description('Notes')
    @JsonProperty({ name: 'Notes' })
    Notes: String = undefined;

    @Description('PhotoPath')
    @JsonProperty({ name: 'PhotoPath' })
    PhotoPath: String = undefined;

    @Description('PostalCode')
    @JsonProperty({ name: 'PostalCode' })
    PostalCode: String = undefined;

    @Description('ReportsTo')
    @JsonProperty({ name: 'ReportsTo' })
    ReportsTo: Number = undefined;

    @Description('Title')
    @JsonProperty({ name: 'Title' })
    Title: String = undefined;

    @Description('TtitleOfCourtesy')
    @JsonProperty({ name: 'TitleOfCourtesy' })
    TitleOfCourtesy: String = undefined;

    @Description('HireDate')
    @JsonProperty({ name: 'HireDate' })
    HireDate: String = undefined;

    @Description('HomePhone')
    @JsonProperty({ name: 'HomePhone' })
    HomePhone: String = undefined;
   
    @Description('Address')
    @JsonProperty({ name: 'Address' })
    Address: String = undefined;
    
    @Description('BirthDate')
    @JsonProperty({ name: 'BirthDate' })
    BirthDate: String = undefined;
    
    @Description('City')
    @JsonProperty({ name: 'City' })
    City: String = undefined;

    @Description('Country')
    @JsonProperty({ name: 'Country' })
    Country: String = undefined;

    @Description('EmployeeID')
    @JsonProperty({ name: 'EmployeeID' })
    EmployeeID: Number = undefined;

    @Description('Extension')
    @JsonProperty({ name: 'Extension' })
    Extension: String = undefined;

}

@Description('Order info')
export class OrderInfo {
    @Description('Employee Info')
    @JsonProperty({ name: 'Employee', type: EmployeeInfo })
    Employee: EmployeeInfo = undefined;

    @Description('Employee ID')
    @JsonProperty({ name: 'EmployeeID' })
    EmployeeID: number = undefined;

    @Description('Customer ID')
    @JsonProperty({ name: 'CustomerID' })
    CustomerID: String = undefined;

    @Description('Freight')
    @JsonProperty({ name: 'Freight' })
    Freight: String = undefined;

    @Description('OrderDate')
    @JsonProperty({ name: 'OrderDate' })
    OrderDate: String = undefined;

    @Description('OrderID')
    @JsonProperty({ name: 'OrderID' })
    OrderID: String = undefined;

    @Description('RequiredDate')
    @JsonProperty({ name: 'RequiredDate' })
    RequiredDate: String = undefined;

    @Description('ShipAddress')
    @JsonProperty({ name: 'ShipAddress' })
    ShipAddress: String = undefined;

    @Description('ShipCity')
    @JsonProperty({ name: 'ShipCity' })
    ShipCity: String = undefined;

    @Description('ShipCountry')
    @JsonProperty({ name: 'ShipCountry' })
    ShipCountry: String = undefined;

    @Description('ShipName')
    @JsonProperty({ name: 'ShipName' })
    ShipName: String = undefined;

    @Description('ShippedDate')
    @JsonProperty({ name: 'ShippedDate' })
    ShippedDate: String = undefined;

    @Description('ShipPostalCode')
    @JsonProperty({ name: 'ShipPostalCode' })
    ShipPostalCode: String = undefined;

    @Description('ShipRegion')
    @JsonProperty({ name: 'ShipRegion' })
    ShipRegion: String = undefined;

    @Description('ShipVia')
    @JsonProperty({ name: 'ShipVia' })
    ShipVia: Number = undefined;
}

@Description('Order Details Model')
export class OrderDetails {
    @Description('')
    @JsonProperty({name: 'Order', type: OrderInfo })
    Order: OrderInfo = undefined;

    @Description('')
    @JsonProperty({ name: 'OrderID' })
    OrderID: number = undefined;

    @Description('')
    @JsonProperty({ name: 'ProductID' })
    ProductID: number = undefined;

    @Description('')
    @JsonProperty({ name: 'UnitPrice' })
    UnitPrice: string = undefined;

    @Description('')
    @JsonProperty({ name: 'Quantity' })
    Quantity: number = undefined;

    @Description('')
    @JsonProperty({ name: 'Discount' })
    Discount: number = undefined;
    
}
