import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, PARRAINAGES_COLLECTION_ID, PARTICIPANTS_COLLECTION_ID } from '../lib/appwrite';
import type { ParticipantPair } from '../types/participant';
import { handleError } from '../utils/error-handling';

export async function getPairs(): Promise<ParticipantPair[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PARRAINAGES_COLLECTION_ID,
      [Query.orderDesc('$createdAt')]
    );

    const pairs = await Promise.all(response.documents.map(async (doc) => {
      const [parrain, filleul] = await Promise.all([
        databases.getDocument(DATABASE_ID, PARTICIPANTS_COLLECTION_ID, doc.parrainId),
        databases.getDocument(DATABASE_ID, PARTICIPANTS_COLLECTION_ID, doc.filleulId)
      ]);

      return {
        id: doc.$id,
        parrain: {
          id: parrain.$id,
          firstName: parrain.firstName,
          lastName: parrain.lastName,
          email: parrain.email,
          imageUrl: parrain.imageUrl,
          status: parrain.status,
          createdAt: parrain.$createdAt,
          updatedAt: parrain.$updatedAt
        },
        filleul: {
          id: filleul.$id,
          firstName: filleul.firstName,
          lastName: filleul.lastName,
          email: filleul.email,
          imageUrl: filleul.imageUrl,
          status: filleul.status,
          createdAt: filleul.$createdAt,
          updatedAt: filleul.$updatedAt
        },
        createdAt: doc.$createdAt
      };
    }));

    return pairs;
  } catch (error) {
    handleError(error, 'Error fetching pairs');
    throw error;
  }
}

export async function createPair(parrainId: string, filleulId: string): Promise<ParticipantPair> {
  try {
    const doc = await databases.createDocument(
      DATABASE_ID,
      PARRAINAGES_COLLECTION_ID,
      ID.unique(),
      {
        parrainId,
        filleulId
      }
    );

    const [parrain, filleul] = await Promise.all([
      databases.getDocument(DATABASE_ID, PARTICIPANTS_COLLECTION_ID, parrainId),
      databases.getDocument(DATABASE_ID, PARTICIPANTS_COLLECTION_ID, filleulId)
    ]);

    return {
      id: doc.$id,
      parrain: {
        id: parrain.$id,
        firstName: parrain.firstName,
        lastName: parrain.lastName,
        email: parrain.email,
        imageUrl: parrain.imageUrl,
        status: parrain.status,
        createdAt: parrain.$createdAt,
        updatedAt: parrain.$updatedAt
      },
      filleul: {
        id: filleul.$id,
        firstName: filleul.firstName,
        lastName: filleul.lastName,
        email: filleul.email,
        imageUrl: filleul.imageUrl,
        status: filleul.status,
        createdAt: filleul.$createdAt,
        updatedAt: filleul.$updatedAt
      },
      createdAt: doc.$createdAt
    };
  } catch (error) {
    handleError(error, 'Error creating pair');
    throw error;
  }
}