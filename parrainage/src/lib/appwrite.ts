import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('sponsorship-system');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const BUCKET_ID = 'profile-images';
export const DATABASE_ID = 'sponsorship';
export const PARTICIPANTS_COLLECTION_ID = 'participants';
export const PARRAINAGES_COLLECTION_ID = 'parrainages';