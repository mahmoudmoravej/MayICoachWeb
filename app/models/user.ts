export type User = {
  email: string;
  jwt_token: string;
  name: string;
  individual_id: number;
  organization_id: number;
  is_manager?: boolean;
  isPersonalOrganization: boolean;
};
