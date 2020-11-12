import { ObjectId } from "mongodb";
import { delBasePath } from "next/dist/next-server/lib/router/router";

export default {
  Query: {
    bookings: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("bookings")
        .find(_args)
        .toArray();

      return result;
    },

    booking: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("bookings")
        .findOne({_id: ObjectId(_args.id)})

      return result;
    },
  },
  Mutation: {
 
    createBooking: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("bookings")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateBooking: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("bookings")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteBooking: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("bookings")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Booking was deleted." };
    },
 },
};
