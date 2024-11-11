import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Roles } from '../entities';
import { RoleDto } from '../dtos/role.dto';
// import { BranchService, OrganizationService } from 'src/organizations/services';

@Injectable()
export class RolesService extends TypeOrmCrudService<Roles> {
  constructor(
    @InjectRepository(Roles)
    repo: Repository<Roles>,
    private em: EntityManager,
  ) // private readonly branchService: BranchService,
  // private readonly organizationService: OrganizationService,
  {
    super(repo);
  }

  async createByBranch(dto: RoleDto, branchSlug: string) {
    // const branch = await this.branchService.findBySlug(branchSlug);
    // if (!branch) {
    //   throw new UnprocessableEntityException();
    // }
    const role = new Roles();
    role.name = dto.name;
    role.permissions = {
      manageUsers: dto.permissions.manageUsers,
      manageRoles: dto.permissions.manageRoles,
      manageProjects: dto.permissions.manageProjects,
      manageProducts: dto.permissions.manageProducts,
      readAnalytics: dto.permissions.readAnalytics,
      manageFinance: dto.permissions.manageFinance,
      manageSettings: dto.permissions.manageSettings,
      manageOrganization: dto.permissions.manageOrganization,
      isOwner: dto.permissions.isOwner,
    };
    // role.branch = branch;
    return await this.repo.save(role);
  }

  async createByOrganization(dto: RoleDto, organizationSlug: string) {
    // const organization = await this.organizationService.findBySlug(organizationSlug);
    // if (!organization) {
    //   throw new UnprocessableEntityException();
    // }
    const role = new Roles();
    role.name = dto.name;
    role.permissions = {
      manageUsers: dto.permissions.manageUsers,
      manageRoles: dto.permissions.manageRoles,
      manageProjects: dto.permissions.manageProjects,
      manageProducts: dto.permissions.manageProducts,
      readAnalytics: dto.permissions.readAnalytics,
      manageFinance: dto.permissions.manageFinance,
      manageSettings: dto.permissions.manageSettings,
      manageOrganization: dto.permissions.manageOrganization,
      isOwner: dto.permissions.isOwner,
    };
    // role.organization = organization;
    return await this.repo.save(role);
  }

  async update(roleSlug: string, dto: RoleDto) {
    const role = await this.findBySlug(roleSlug);
    if (!role) {
      throw new UnprocessableEntityException();
    }
    role.name = dto.name;
    role.permissions = {
      manageUsers: dto.permissions.manageUsers,
      manageRoles: dto.permissions.manageRoles,
      manageProjects: dto.permissions.manageProjects,
      manageProducts: dto.permissions.manageProducts,
      readAnalytics: dto.permissions.readAnalytics,
      manageFinance: dto.permissions.manageFinance,
      manageSettings: dto.permissions.manageSettings,
      manageOrganization: dto.permissions.manageOrganization,
      isOwner: dto.permissions.isOwner,
    };
    return await this.repo.save(role);
  }

  async findRoleByBranchSlug(branchSlug: string) {
    return await this.repo.find({
      // where: { branch: { slug: branchSlug } },
    });
  }

  async findRoleByOrganizationSlug(organizationSlug: string) {
    return await this.repo.find({
      // where: { organization: { slug: organizationSlug } },
    });
  }

  async findRoleByName(name: string) {
    return await this.repo.findOne({
      where: { name },
    });
  }

  async findBySlug(slug: string) {
    return await this.repo.findOne({
      where: { slug },
    });
  }

  async softDelete(role: Roles) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(role);
    });
  }

  async unDelete(role: Roles) {
    await this.em.transaction(async (tx) => {
      await tx.recover(role);
    });
  }
}
