// pages/api/graphql.js
import { ApolloServer } from "apollo-server-micro";
import schema from "./schemas";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { promisify } from 'util'

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key: any) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const jwtVerifyPromise = promisify(jwt.verify)

let db;

const dbClient = new MongoClient(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    let token, jwtPayload
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7, authHeader.length);
    }

    try {
        const decoded = await jwtVerifyPromise(token, getKey)
        jwtPayload = decoded
    } catch (e) {
        console.log(e.message)
    }

    if (!db) {
      try {
        if (!dbClient.isConnected()) await dbClient.connect();
        db = dbClient.db(process.env.MONGO_DB_NAME); // database name
        console.log("connected to mongo database");
      } catch (e) {
        console.log("--->error while connecting to mongo db)", e.message);
      }
    } else {
      console.log("using cache db");
    }
    return { db, jwtPayload };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export default handler;
