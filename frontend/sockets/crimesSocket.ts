import { NetSocket, SocketHandler } from './socketHandler';
import { useCrimesStore } from '@/store/crimeStore';
import type { ICrimesData } from '@/../shared/interfaces';

const crimesSocket = new NetSocket('crimesSocket');

if (SocketHandler.addSocket(crimesSocket)) {
    const crimesStore = useCrimesStore();

    crimesSocket.connect();

    crimesSocket.on("initiliazeCrimes", (crimes: ICrimesData[]) => {
        crimesStore.initializeCrimes(crimes);
    });
}
