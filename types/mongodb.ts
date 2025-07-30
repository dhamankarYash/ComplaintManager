import { ObjectId, type WithId, type Document } from "mongodb"

// Extend the global namespace to include proper MongoDB types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      JWT_SECRET: string
      NODE_ENV: "development" | "production" | "test"
    }
  }
}

// Helper type for MongoDB documents
export type MongoDocument<T> = WithId<T>

// Helper type for creating documents (without _id)
export type CreateDocument<T> = Omit<T, "_id">

// Helper type for updating documents
export type UpdateDocument<T> = Partial<Omit<T, "_id">>

export { ObjectId, type WithId, type Document }
