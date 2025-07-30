import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"
import { getDatabase } from "@/lib/mongodb"

export interface User {
  _id?: ObjectId
  email: string
  password: string
  role: "user" | "admin"
  createdAt: Date
}

export interface UserResponse {
  id: string
  email: string
  role: "user" | "admin"
}

export class UserModel {
  static async create(userData: Omit<User, "_id" | "createdAt">): Promise<UserResponse> {
    const db = await getDatabase()
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    const result = await db.collection<User>("users").insertOne({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return {
      id: result.insertedId.toString(),
      email: userData.email,
      role: userData.role,
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    const db = await getDatabase()
    const result = await db.collection<User>("users").findOne({ email })
    return result
  }

  static async findById(id: string): Promise<User | null> {
    const db = await getDatabase()
    const result = await db.collection<User>("users").findOne({ _id: new ObjectId(id) })
    return result
  }

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}
