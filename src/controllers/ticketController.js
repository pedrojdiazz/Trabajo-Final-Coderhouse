import TicketService from "../services/ticketService.js";

class TicketController {
    async createTicket(req, res) {
        const cart_id = req.params.cid;
        const purchaser = req.user.fullname
        
        const newTicket = await TicketService.createTicket(purchaser, cart_id)
        if (newTicket) {
            res.status(201).json({status: "success", ticketResume: newTicket});
        }
    }
}

export default new TicketController();