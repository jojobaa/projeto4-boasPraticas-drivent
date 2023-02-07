import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
    try {
        const {userId} = req;
        const booking = await bookingService.getBooking(userId);
        return res.status(httpStatus.OK).send({
           ...booking
          });
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}