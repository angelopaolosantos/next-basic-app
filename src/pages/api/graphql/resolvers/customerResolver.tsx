import { ObjectId } from "mongodb";

export default {
  Query: {
    customers: async (_parent, _args, _context, _info) => {
      console.log("from resolver:", _context.jwtPayload)
      const result = await _context.db
        .collection("customers")
        .find(_args)
        .toArray();

      return result;
    },

    customer: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("customers")
        .findOne({ _id: ObjectId(_args.id) });
      return result;
    },
  },
  Mutation: {
    createCustomer: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("customers")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateCustomer: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("customers")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteCustomer: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("customers")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Customer was deleted." };
    },
  },
};