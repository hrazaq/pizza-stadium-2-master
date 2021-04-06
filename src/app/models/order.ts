import { User } from './user';
import { OrderDetail } from './order_detail';
import { Address } from './address';

export class Order {

    id: number;
    OrderUniqueID: string;
    Date: string;
    Time: string;
    Comment: string;
    DeliveryTime: string;
    TotalPrice: string;
    PaymentType: string;
    DeliveryStatus: string;
    DeliveryDateTime: string;
    OrderType: string;
    review: string;
    AddressID: number;
    UserID: number;
    user: User;
    address: Address;
    order_details: OrderDetail[];

}
    