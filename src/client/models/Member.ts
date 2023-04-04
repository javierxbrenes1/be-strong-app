interface Member {
  code: string;
  name: string;
  phone?: string;
  preferredClassTime?: string;
  avatar?: string;
  birthDate?: Date;
  email?: string;
  genre: string;
  height: number;
  isActive: boolean;
}

export default Member;
