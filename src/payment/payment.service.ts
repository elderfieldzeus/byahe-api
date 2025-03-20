import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Payment } from './payment.model';

@Injectable()
export class PaymentService {
    constructor(
        private sequelize: Sequelize,
        @InjectModel(Payment) private paymentModel: typeof Payment
    ) {}

    
}
