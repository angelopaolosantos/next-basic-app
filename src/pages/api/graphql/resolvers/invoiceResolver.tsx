import { ObjectId } from "mongodb";

export default {
  Query: {
    invoices: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("invoices")
        .find(_args)
        .toArray();

      return result;
    },

    invoice: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("invoices")
        .findOne({_id: ObjectId(_args.id)})

      return result;
    },
  },
  Mutation: {

    createInvoice: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("invoices")
        .insertOne(_args.input);

      return { ..._args.input, _id: ObjectId(response.insertedId) };
    },
    updateInvoice: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("invoices")
        .updateOne({ _id: ObjectId(_args.id) }, { $set: _args.input });

      return { ..._args.input, _id: ObjectId(_args.id) };
    },
    deleteInvoice: async (_parent, _args, _context, _info) => {
      const response = await _context.db
        .collection("invoices")
        .deleteOne({ _id: ObjectId(_args.id) });

      return { status: "success", message: "Invoice was deleted." };
    },
  },
};