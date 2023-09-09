import GymClassTime from './GymClassTime';

interface GymClass {
  id: number;
  classDate?: string;
  classDurationInMinutes?: number;
  classType?: string;
  classDescription?: string;
  gymClassOnTimes?: {
    gymClassTime: GymClassTime;
  }[];
}

export default GymClass;
