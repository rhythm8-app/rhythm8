import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

export const config = {
  pocketbaseUrl: process.env.POCKETBASE_URL || 'http://localhost:8090',
  adminEmail: process.env.POCKETBASE_ADMIN_EMAIL || 'admin@rhythm8.local',
  adminPassword: process.env.POCKETBASE_ADMIN_PASSWORD || 'adminpassword123'
}