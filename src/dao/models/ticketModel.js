import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now

    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }

});

mongoose.plugin(AutoIncrement, { inc_field: 'code' });

const TicketModel = new mongoose.model(ticketsCollection, ticketSchema);
