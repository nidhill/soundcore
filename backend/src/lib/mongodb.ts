import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
if (!uri) throw new Error('MONGODB_URI is not defined.')

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // Reuse connection across nodemon restarts
  const g = global as typeof global & { _mongoClientPromise?: Promise<MongoClient> }
  if (!g._mongoClientPromise) {
    client = new MongoClient(uri)
    g._mongoClientPromise = client.connect()
  }
  clientPromise = g._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise

export const DB_NAME            = 'soundcore'
export const CAMPAIGN_COLLECTION = 'campaign'
