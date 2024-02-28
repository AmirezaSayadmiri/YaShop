import Ticket from "../models/Ticket.mjs";

const getTickets = async (req, res) => {
    const tickets = await Ticket.findAll();

    return res.json({ tickets });
};

const getTicket = async (req, res) => {
    const id = req.params.id;

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
        return res.status(404).json({ message: "ticket notfound" });
    }

    return res.json({ ticket });
};

const postTicket = async (req, res) => {
    const { title, body } = req.body;

    const ticket = await Ticket.create({
        title,
        body,
        userId: req.user.id,
    });

    res.status(201).json({ message: "ticket sent" });
};

const postTicketAnswer = async (req, res) => {
    const { answer } = req.body;
    const id = req.params.id;

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
        return res.status(404).json({ message: "ticket notfound" });
    }

    ticket.answer = answer;
    ticket.adminId = req.user.id;
    await ticket.save();

    return res.json({ message: "ticket answered" });
};

export { getTicket, postTicket, postTicketAnswer, getTickets };
