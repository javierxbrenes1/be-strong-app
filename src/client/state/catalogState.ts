import { create } from 'zustand';
import GymClassTime from '../../common/models/GymClassTime';
import mountStateOnDevTools from '../components/zustandDevTools';
import { getGymClassTimeForUI } from '../utils/memberUtils';

type CatalogsState = {
  gymClassTimes: GymClassTime[];
  gymClassUiLabels: { label: string; value: string }[];
  setGymClassTimes: (gct: GymClassTime[]) => void;
};

const buildUiLabels = (
  gct: GymClassTime[]
): { label: string; value: string }[] => {
  const uiLabels = gct.map((gc) => ({
    label: getGymClassTimeForUI(gc),
    value: String(gc.id),
  }));

  return uiLabels;
};

const useCatalogsStore = create<CatalogsState>((set) => ({
  gymClassTimes: [],
  gymClassUiLabels: [],
  setGymClassTimes: (gct: GymClassTime[]) => {
    set({
      gymClassTimes: gct,
      gymClassUiLabels: buildUiLabels(gct),
    });
  },
}));

mountStateOnDevTools('useCatalogsStore', useCatalogsStore);

export default useCatalogsStore;
