import { create } from 'zustand';
import GymClassTime from '../../common/models/GymClassTime';
import mountStateOnDevTools from '../components/zustandDevTools';

type CatalogsState = {
  gymClassTimes: GymClassTime[];
  setGymClassTimes: (gct: GymClassTime[]) => void;
};

const useCatalogsStore = create<CatalogsState>((set) => ({
  gymClassTimes: [],
  setGymClassTimes: (gct: GymClassTime[]) => {
    set({
      gymClassTimes: gct,
    });
  },
}));

mountStateOnDevTools('useCatalogsStore', useCatalogsStore);

export default useCatalogsStore;
