import * as ticketController from "../controllers/ticketControler.mjs";

import express from "express";
import authOnlyMiddleware from "../middlewares/authOnlyMiddleware.mjs";
import { postTicketAnswerValidation, postTicketValidation } from "../validations/ticketValidations.mjs";
import adminOnlyMiddleware from "../middlewares/adminOnlyMiddleware.mjs";

const ticketRouter = express.Router();

ticketRouter.get("/tickets", authOnlyMiddleware, ticketController.getTickets);
ticketRouter.get("/tickets/:id", authOnlyMiddleware, ticketController.getTicket);
ticketRouter.post("/tickets", authOnlyMiddleware, postTicketValidation, ticketController.postTicket);
ticketRouter.post(
    "/tickets/:id/answer",
    authOnlyMiddleware,
    adminOnlyMiddleware,
    postTicketAnswerValidation,
    ticketController.postTicketAnswer
);

export default ticketRouter;
