import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Itinerary } from "../itinerary/itinerary.model";
import { PaymentMethodEnum } from "../types/enum/paymentmethod.enum";
import { PaymentStatusEnum } from "../types/enum/paymentstatus.enum";
import { User } from "../user/user.model";

@Table
export class Payment extends Model {
    @Column
    @ForeignKey(() => User)
    private user_id: number

    @BelongsTo(() => User)
    private user: User

    @Column
    @ForeignKey(() => Itinerary)
    private itinerary_id: number

    @BelongsTo(() => Itinerary)
    private itinerary: Itinerary

    @Column
    private amount: number

    @Column
    private payment_method: PaymentMethodEnum

    @Column
    private status: PaymentStatusEnum

    @Column
    private payment_date: Date
}