export type RegisterResponse = {
  status: number;
  data: {
    jwt: string;
    user: any;
  };
};

export type UserSelfResponse = {
  status: number;
  data: { id: number; username: string; email: string };
};
