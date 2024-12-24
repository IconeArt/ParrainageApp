export type ParticipantStatus = 'parrain' | 'filleul';

export interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  status: ParticipantStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ParticipantPair {
  id: number;
  parrain: Participant;
  filleul: Participant;
  createdAt: string;
}