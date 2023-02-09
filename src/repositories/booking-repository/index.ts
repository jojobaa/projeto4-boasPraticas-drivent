import { prisma } from "@/config";
import { Booking } from "@prisma/client";

type CreateBookingParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;
type UpdateBookingParams = Omit<Booking, "createdAt" | "updatedAt">;

async function createBooking({ roomId, userId }: CreateBookingParams): Promise<Booking> {
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

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    }
  });
}

async function upsertBooking({ roomId, userId, id }: UpdateBookingParams) {
  return prisma.booking.upsert({
    where: {
      id
    },
    create: {
      userId,
      roomId
    },
    update:{
      roomId
    }
  })
}

const bookingRepository = {
  createBooking,
  findByUserId,
  findByRoomId,
  upsertBooking
};

export default bookingRepository;

