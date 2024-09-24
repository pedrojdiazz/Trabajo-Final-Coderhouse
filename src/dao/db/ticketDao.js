import TicketModel from "../models/ticketModel.js";

class TicketDao {
    async createTicket(amount, purchaser) {
        const newTicket = new TicketModel({
            amount: amount,
            purchaser: purchaser
        });
        await newTicket.save();
        return newTicket;

    }
}

export default new TicketDao();