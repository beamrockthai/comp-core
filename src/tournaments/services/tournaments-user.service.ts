// import {
//   Inject,
//   Injectable,
//   UnprocessableEntityException,
//   forwardRef,
// } from '@nestjs/common';
// import { User } from 'src/users/entities';
// import { Tournaments } from 'src/tournaments/entities';
// import { InjectRepository } from '@nestjs/typeorm';
// import { EntityManager, Repository } from 'typeorm';
// // import { CreateUserWithTournamentDto } from 'node:fs/promises';

// @Injectable()
// export class UserWithTournament {
//   constructor(
//     @InjectRepository(User) private readonly userRepository: Repository<User>,
//     @Inject(forwardRef(() => TournamentsService)) // <-- ใช้ forwardRef ในการ import มาใช้งาน relate กับ TournamentsService
//     private readonly TournamentsService: TournamentsService,
//     private em: EntityManager,
//   ) {
//     userRepository;
//   }
//   async createUserWithTournament(
//     dto: CreateUserWithTournamentDto,
//   ): Promise<User> {
//     const tournament = await this.tournamentsService.findTournamentById(
//       dto.tournamentId,
//     );
//     if (!tournament)
//       throw new UnprocessableEntityException('Tournament not found');

//     const newUser = this.userRepository.create({
//       ...dto,
//       tournaments: [tournament],
//     });
//     return await this.userRepository.save(newUser);
//   }
// }
