interface OwnerUser {
  username: string;
  role: string;
  isBlocked: boolean;
  lastPasswordChangeDate: Date;
  email: string;
  name: string;
}

export default OwnerUser;
