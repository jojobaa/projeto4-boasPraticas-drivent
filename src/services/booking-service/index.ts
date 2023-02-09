import { cannotBookingError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import roomRepository from "@/repositories/room-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId: number) {
    const booking = await bookingRepository.findByUserId(userId);
    if (!booking) {
        throw notFoundError
    }
    return booking;
}


async function postBookingRoom(userId: number, roomId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw cannotBookingError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotBookingError();
    }

    const room = await roomRepository.findRoomById(roomId)
    const bookings = await bookingRepository.findByRoomId(roomId);
    if (room.capacity <= bookings.length) {
        throw cannotBookingError();
    }
    return bookingRepository.createBooking({ roomId, userId });
}

async function putBookingRoom(userId: number, roomId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw cannotBookingError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotBookingError();
    }

    const room = await roomRepository.findRoomById(roomId)
    const bookings = await bookingRepository.findByRoomId(roomId);
    if (room.capacity <= bookings.length) {
        throw cannotBookingError();
    }

    const booking = await bookingRepository.findByUserId(userId)
    if (!booking) {
        throw cannotBookingError();
    }

    return bookingRepository.upsertBooking({ roomId, userId, id: booking.id});
}

const bookingService = {
    getBooking,
    postBookingRoom,
    putBookingRoom
};

export default bookingService;
