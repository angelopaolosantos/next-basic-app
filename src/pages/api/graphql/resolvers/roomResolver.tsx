import { ObjectId } from "mongodb";

export default { 
  Query: {
    rooms: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("rooms")
        .find(_args)
        .toArray();

      return result;
    },

    room: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("rooms")
        .findOne({_id: ObjectId(_args.id)})

      return result;
    },
  },
  Mutation: {
    
    createRoom: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("rooms")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateRoom: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("rooms")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteRoom: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("rooms")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Room was deleted." };
    },
  },
};