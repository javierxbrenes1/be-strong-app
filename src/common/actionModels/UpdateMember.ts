type UpdateMemberArgs = {
  code: string;
  name?: string;
  genre?: string;
  birthDate?: Date;
  height?: number;
  isActive?: boolean;
  phone?: string;
  email?: string;
  avatar?: string;
  observations?: string;
};

export default UpdateMemberArgs;
