/**
 * @file db.ts
 * @description This file initializes and exports an instance of PrismaClient.
 *
 * The PrismaClient is used to interact with the database in a type-safe manner.
 * By creating and exporting a single instance of PrismaClient, we ensure that
 * the database connection is reused throughout the application, which helps
 * in managing resources efficiently.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
