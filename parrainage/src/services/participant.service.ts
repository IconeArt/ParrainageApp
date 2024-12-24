import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, PARTICIPANTS_COLLECTION_ID } from '../lib/appwrite';
import type { Participant } from '../types/participant';
import { handleError } from '../utils/error-handling';

export async function createParticipant(participant: Omit<Participant, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      PARTICIPANTS_COLLECTION_ID,
      ID.unique(),
      {
        firstName: participant.firstName,
        lastName: participant.lastName,
        email: participant.email,
        imageUrl: participant.imageUrl,
        status: participant.status
      }
    );

    return {
      id: response.$id,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      imageUrl: response.imageUrl,
      status: response.status,
      createdAt: response.$createdAt,
      updatedAt: response.$updatedAt
    };
  } catch (error) {
    handleError(error, 'Error creating participant');
    throw error;
  }
}

export async function getParticipants() {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PARTICIPANTS_COLLECTION_ID,
      [Query.orderDesc('$createdAt')]
    );

    return response.documents.map(doc => ({
      id: doc.$id,
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      imageUrl: doc.imageUrl,
      status: doc.status,
      createdAt: doc.$createdAt,
      updatedAt: doc.$updatedAt
    }));
  } catch (error) {
    handleError(error, 'Error fetching participants');
    throw error;
  }
}