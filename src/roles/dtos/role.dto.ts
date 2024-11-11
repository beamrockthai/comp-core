import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsObject()
  permissions: {
    manageUsers: boolean;
    manageRoles: boolean;
    manageProjects: boolean;
    manageProducts: boolean;
    readAnalytics: boolean;
    manageFinance: boolean;
    manageSettings: boolean;
    manageOrganization: boolean;
    isOwner: boolean;
  };
}
