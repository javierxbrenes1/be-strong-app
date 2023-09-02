import GymClassTime from './GymClassTime';

interface GymClass {
  id: number;
  classDate?: Date;
  classDurationInMinutes?: number;
  classType?: string;
  classDescription?: string;
  gymClassOnTimes?: {
    gymClassTime: GymClassTime[];
  };
}

export default GymClass;
