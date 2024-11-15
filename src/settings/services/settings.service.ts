import {
  Inject,
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { SettingDto } from '../dtos/setting.dto';
import { Settings } from '../entities';
import { ThemeService } from './theme.service';

@Injectable()
export class SettingsService extends TypeOrmCrudService<Settings> {
  constructor(
    @InjectRepository(Settings)
    repo: Repository<Settings>,
    private em: EntityManager,
    // private readonly addressService: AddressService,
    // @Inject(forwardRef(() => BranchService))
    // private readonly branchService: BranchService,
    // @Inject(forwardRef(() => OrganizationService))
    // private readonly organizationService: OrganizationService,
    private readonly themeService: ThemeService,
  ) {
    super(repo);
  }
  async create(
    dto: SettingDto,
    options: { branchSlug?: string; organizationSlug?: string },
  ) {
    const setting = new Settings();
    setting.organizationType = dto.organizationType;
    setting.taxId = dto.taxId;
    // setting.companyName = dto.companyName;
    // setting.description = dto.description;
    // setting.isVatRegistered = dto.isVatRegistered;
    setting.imageUrl = dto.imageUrl;
    setting.tel = dto.tel;
    // setting.email = dto.email;
    setting.website = dto.website;
    setting.bankName = dto.bankName;
    setting.bankAccountName = dto.bankAccountName;
    setting.bankAccountNo = dto.bankAccountNo;
    setting.bankBranch = dto.bankBranch;
    // setting.address = [];

    //   if (options.branchSlug) {
    //     const branch = await this.branchService.findBySlug(options.branchSlug);
    //     if (!branch) {
    //       throw new UnprocessableEntityException();
    //     }
    //     setting.branch = branch;
    //   } else if (options.organizationSlug) {
    //     const organization = await this.organizationService.findBySlug(
    //       options.organizationSlug,
    //     );
    //     if (!organization) {
    //       throw new UnprocessableEntityException();
    //     }
    //     setting.organization = organization;
    //   }

    //   for (const addr of dto.address) {
    //     setting.address.push(await this.addressService.create(addr));
    //   }

    //   const theme = await this.themeService.create(setting.slug);
    //   setting.theme = theme;

    //   return await this.repo.save(setting);
    // }

    // async update(dto: SettingDto, settingSlug: string) {
    //   const setting = await this.repo.findOne({
    //     where: { slug: settingSlug },
    //   });
    //   if (!setting) {
    //     throw new UnprocessableEntityException();
    //   }
    //   setting.organizationType = dto.organizationType;
    //   setting.taxId = dto.taxId;
    //   setting.companyName = dto.companyName;
    //   setting.description = dto.description;
    //   setting.isVatRegistered = dto.isVatRegistered;
    //   setting.imageUrl = dto.imageUrl;
    //   setting.tel = dto.tel;
    //   setting.email = dto.email;
    //   setting.website = dto.website;
    //   setting.bankName = dto.bankName;
    //   setting.bankAccountName = dto.bankAccountName;
    //   setting.bankAccountNo = dto.bankAccountNo;
    //   setting.bankBranch = dto.bankBranch;
    //   setting.address = [];

    //   for (const addr of dto.address) {
    //     if (addr.id) {
    //       const address = await this.addressService.findBySlug(addr.id);
    //       if (!address) {
    //         throw new UnprocessableEntityException();
    //       }
    //       address.address = addr.address;
    //       address.country = addr.country;
    //       address.subDistrict = addr.subDistrict;
    //       address.district = addr.district;
    //       address.province = addr.province;
    //       address.postalCode = addr.postalCode;
    //       address.type = addr.type;
    //       setting.address.push(await this.addressService.update(address));
    //     } else {
    //       setting.address.push(await this.addressService.create(addr));
    //     }
    //   }

    //   return await this.repo.save(setting);
    // }

    // async save(setting: Settings) {
    //   return await this.repo.save(setting);
    // }

    // async findSettings() {
    //   return await this.repo.find();
    // }

    // async findById(id: number) {
    //   return await this.repo.findOne({
    //     where: { id: id },
    //   });
    // }

    // async findBySlug(slug: string) {
    //   return await this.repo.findOne({
    //     where: { slug: slug },
    //   });
    // }

    // async softDelete(setting: Settings) {
    //   await this.em.transaction(async (tx) => {
    //     await tx.softRemove(setting);
    //   });
    // }

    // async unDelete(setting: Settings) {
    //   await this.em.transaction(async (tx) => {
    //     await tx.recover(setting);
    //   });
  }
}
