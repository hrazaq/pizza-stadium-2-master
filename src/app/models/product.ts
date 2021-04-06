export class Product {

    id: number;
    name: string;
    alias: string;
    family: string;
    family_id: number;
    picture: string;
    price: string;
    vat: number;
    composition: string;
    supplements: string;
    options: string;
    personalizable: string;
    availability: string;
    order_time: string;
    order_mode: string;
    priceArr: string;
    // ngPrice: string;
    priceArr2: [{name, price}];

    constructor(public ngPrice: number = 10) {}

}
    