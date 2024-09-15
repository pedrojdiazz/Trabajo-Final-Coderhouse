import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    purchase_datetime: {
        type: Date,
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

ticketSchema.pre('save', function (next) {
    if (!this.code) {
        this.code = generateUniqueTicketCode();
    }
    next();
});

function generateUniqueTicketCode() {
    const timestamp = Date.now().toString();
    const randomValue = crypto.randomBytes(4).toString('hex');
    return `${timestamp}-${randomValue}`;
}

const TicketModel = new mongoose.model(ticketsCollection, ticketSchema);

export default TicketModel; 