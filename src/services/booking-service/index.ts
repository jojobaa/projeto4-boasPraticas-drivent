import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getBooking(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw notFoundError
    }

    const booking = await bookingRepository.findByUserId(userId);
    if (!booking) {
        throw notFoundError
    }
    return booking;
}

const bookingService = {
    getBooking,
  };
  
export default bookingService;
  