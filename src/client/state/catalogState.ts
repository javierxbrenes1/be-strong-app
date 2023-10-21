import { create } from 'zustand';
import GymClassTime from '../../common/models/GymClassTime';
import mountStateOnDevTools from '../components/zustandDevTools';
import { getGymClassTimeForUI, sortIsoTimes } from '../utils/memberUtils';

type CatalogsState = {
  gymClassTimes: GymClassTime[];
  gymClassUiLabels: { label: string; value: string }[];
  setGymClassTimes: (gct: GymClassTime[]) => void;
  reload: boolean;
  reloadCatalogs: () => void;
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
  reloadCatalogs: () => {
    set({ reload: true });
  },
  setGymClassTimes: (gct: GymClassTime[]) => {
    gct.sort((a, b) => sortIsoTimes(a.isoTime, b.isoTime));
    set({
      gymClassTimes: gct,
      gymClassUiLabels: buildUiLabels(gct),
      reload: false,
    });
  },
  reload: false,
}));

mountStateOnDevTools('useCatalogsStore', useCatalogsStore);

export default useCatalogsStore;
