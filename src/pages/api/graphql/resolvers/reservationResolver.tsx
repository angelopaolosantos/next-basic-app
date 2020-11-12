import { ObjectId } from "mongodb";

export default {
  Query: {
    reservations: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("reservations")
        .find(_args)
        .toArray();

      return result;
    },

    reservation: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("reservations")
        .findOne({_id: ObjectId(_args.id)})

      return result;
    },

  },
  Mutation: {
    createReservation: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("reservations")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateReservation: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("reservations")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteReservation: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("reservations")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Reservation was deleted." };
    },
  },
};