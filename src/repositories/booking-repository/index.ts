import { prisma } from "@/config";
import { Booking } from "@prisma/client";

type CreateParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;
type UpdateParams = Omit<Booking, "createdAt" | "updatedAt">;

async function createBooking({ roomId, userId }: CreateParams): Promise<Booking> {
    return prisma.booking.create({
      data: {
        roomId,
        userId,
      }
    });
  }

  async function findByUserId(userId: number) {
    return prisma.booking.findFirst({
      where: {
        userId,
      },
      include: {
        Room: true,
      }
    });
  }
  

  const bookingRepository = {
    createBooking,
    findByUserId
  };
  
  export default bookingRepository;

