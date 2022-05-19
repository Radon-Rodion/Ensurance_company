interface User {
  id: number;
  token: string | undefined;
  name: string | undefined;
  isAdmin: boolean;
}

export default User;
