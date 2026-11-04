import { create } from 'zustand';
import GymClassTime from '../../common/models/GymClassTime';
import mountStateOnDevTools from '../components/zustandDevTools';
import { compareLocalTime } from '../../common/dates';
import { getGymClassTimeForUI } from '../utils/memberUtils';

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
    const times = [...gct].sort((a, b) =>
      compareLocalTime(a.localTime, b.localTime)
    );
    set({
      gymClassTimes: times,
      gymClassUiLabels: buildUiLabels(times),
      reload: false,
    });
  },
  reload: false,
}));

mountStateOnDevTools('useCatalogsStore', useCatalogsStore);

export default useCatalogsStore;
