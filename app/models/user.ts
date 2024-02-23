export type User = {
  email: string;
  jwt_token: string;
  name: string;
  user_id: number;
  individual_id?: number;
  organization_id: number;
  is_manager?: boolean;
};
