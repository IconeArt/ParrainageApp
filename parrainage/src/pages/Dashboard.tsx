import React, { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { ParticipantList } from '../components/dashboard/ParticipantList';
import { PairingList } from '../components/dashboard/PairingList';
import { getParticipants } from '../services/participant.service';
import { getPairs } from '../services/parrainage.service';
import type { Participant, ParticipantPair } from '../types/participant';

export function Dashboard() {
  const [participants, setParticipants] = React.useState<Participant[]>([]);
  const [pairs, setPairs] = React.useState<ParticipantPair[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [participantsData, pairsData] = await Promise.all([
        getParticipants(),
        getPairs()
      ]);
      setParticipants(participantsData);
      setPairs(pairsData);
    } catch (error) {
      toast.error('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleRandomize = async () => {
    try {
      // TODO: Implement randomization logic
      toast.success('Randomization successful!');
      await loadData();
    } catch (error) {
      toast.error('Error during randomization');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Button onClick={handleRandomize} icon={RefreshCw}>
          Start Randomization
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ParticipantList participants={participants} />
        <PairingList pairs={pairs} />
      </div>
    </div>
  );
}