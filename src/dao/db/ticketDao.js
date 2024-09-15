import TicketModel from "../models/ticketModel";

class TicketDao {
    async createTicket(ticket) {
        const ticket = new TicketModel({
            amount: ticket.amount,
            purchaser: ticket.purchaser
        });

    }
}

export default new TicketDao();