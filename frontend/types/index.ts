export type User = {
  id: number;
  email: string;
  name?: string;
};

export type Episode = {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
};
