import { Description } from '@tsed/swagger';
import { JsonProperty } from 'json-object-mapper';


@Description('Carrier')
export class CarrierModel {
    @Description('carrier ID')
    @JsonProperty({ name: 'Carrid'} )
    carrid: string = undefined;

    @Description('carrier name')
    @JsonProperty({ name: 'Carrname'} )
    carrname: string = undefined;

    @Description('carrier code')
    @JsonProperty({ name: 'Currcode'} )
    currcode: string = undefined;

    @Description('carrier website')
    @JsonProperty({ name: 'Url'} )
    url: string = undefined;
}

@Description('Carriers')
export class CarrierListModel {
    @Description('carriers')
    @JsonProperty({ name: 'results', type: CarrierModel} )
    carriers: CarrierModel[] = [];
}

@Description('Flight')
export class FlightModel {
    @Description('carrier ID')
    @JsonProperty({ name: 'Carrid'} )
    Carrid: string = undefined;

    @Description('connection ID')
    @JsonProperty({ name: 'Connid'} )
    Connid: string = undefined;

    @Description('flight date')
    @JsonProperty({ name: 'Fldate'} )
    Fldate: Date = undefined;

    @Description('price')
    @JsonProperty({ name: 'Price'} )
    Carrname: string = undefined;

    @Description('Currency')
    @JsonProperty({ name: 'Currency'} )
    Currency: string = undefined;

    @Description('plane type')
    @JsonProperty({ name: 'Planetype'} )
    Planetype: string = undefined;

    @Description('max seating')
    @JsonProperty({ name: 'Seatsmax'} )
    Seatsmax: number = undefined;

    @Description('occupied seats')
    @JsonProperty({ name: 'Seatsocc'} )
    Seatsocc: number = undefined;

    @Description('Sum payments')
    @JsonProperty({ name: 'Paymentsum'} )
    Paymentsum: string = undefined;

    @Description('maximum boring seats')
    @JsonProperty({ name: 'SeatsmaxB'} )
    SeatsmaxB: number = undefined;

    @Description('occupied boring seats')
    @JsonProperty({ name: 'SeatsoccB'} )
    SeatsoccB: number = undefined;

    @Description('maximum fun seats')
    @JsonProperty({ name: 'SeatsmaxF'} )
    SeatsmaxF: number = undefined;

    @Description('occupied fun seats')
    @JsonProperty({ name: 'SeatsoccF'} )
    SeatsoccF: number = undefined;

    @Description('Why a pilot?')
    @JsonProperty({ name: 'Yypilot'} )
    Yypilot: string = undefined;

    @Description('Y meal')
    @JsonProperty({ name: 'Yymeal'} )
    Yymeal: string = undefined;
}

@Description('Flights')
export class FlightListModel {
    @Description('flights')
    @JsonProperty({ name: 'results', type: FlightModel} )
    flights: FlightModel[] = [];
}
