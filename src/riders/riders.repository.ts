import { Rider } from "../models/riders.rider.model";
import {
  EntityRepository,
  EntityManager,
  getConnection,
  UpdateResult,
  createQueryBuilder,
} from "typeorm";
import { ParkVisit } from "../models/rider.parkVisit.model";

export interface IRiderRepository {
  createRider(): Promise<Rider>;
  firstTimeParkVisit(): Promise<ParkVisit>;
  revisitingRider(
    riderId: string,
    entranceId: string,
    passTypeId: string
  ): Promise<ParkVisit>;

  findRiderById(id: string): Promise<Rider>;
  updateRider(rider: CreateUpdateRiderPayload): Promise<Rider>;
}

interface CreateUpdateRiderPayload {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
}

@EntityRepository()
export class RiderRepository implements IRiderRepository {
  constructor(private manager: EntityManager) {}

  async revisitingRider(
    riderId: string,
    entranceId: string,
    passTypeId: string
  ): Promise<ParkVisit> {
    let parkVisit = new ParkVisit();

    parkVisit.riderId = riderId;
    parkVisit.entranceId = entranceId;
    parkVisit.passTypeId = passTypeId;

    try {
      parkVisit = await this.manager.save(parkVisit);
      return parkVisit;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //create a rider in the riders table
  async createRider(): Promise<Rider> {
    const rider = new Rider();
    rider.firstName = "Darren";
    rider.lastName = "Horwitz";

    return this.manager.save(rider);
  }

  async firstTimeParkVisit(): Promise<ParkVisit> {
    let parkVisit = null;
    let rider = null;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      rider = new Rider();
      rider.firstName = "Joe";
      rider.lastName = "Shlong";

      //saving the rider first
      rider = await queryRunner.manager.save(rider);

      //saving the associated parkvisit
      parkVisit = new ParkVisit();
      parkVisit.rider = rider;
      parkVisit = await queryRunner.manager.save(parkVisit);

      // commit the transaction
      await queryRunner.commitTransaction();

      return parkVisit;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      //throw the exception
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findRiderById(id: string): Promise<Rider> {
    return this.manager
      .createQueryBuilder(Rider, "rider")
      .leftJoinAndSelect("rider.parkVisits", "parkVisit")
      .leftJoinAndSelect("parkVisit.entrance", "entrance")
      .leftJoinAndSelect("parkVisit.passType", "passType")
      .where("rider.id = :id", { id: id })
      .getOne();

    // return this.manager.findOne(Rider, id);
  }

  async updateRider(rider: CreateUpdateRiderPayload): Promise<Rider> {
    //id will be included
    let _rider: Rider;
    const id = rider.id!;
    const conn = getConnection();
    const qr = conn.createQueryRunner();

    await qr.connect();
    await qr.startTransaction();
    try {
      qr.manager
        .createQueryBuilder()
        .update(Rider)
        .set({
          firstName: rider.firstName,
          lastName: rider.lastName,
          dateOfBirth: rider.dateOfBirth,
        })
        .where("id = :id", { id: id })
        .execute();

      _rider = await qr.manager
        .createQueryBuilder(Rider, "rider")
        .where("rider.id = :id", { id: id })
        .getOne();

      await qr.commitTransaction();
    } catch (error) {
      await qr.rollbackTransaction();
      throw error;
    } finally {
      await qr.release();
    }

    return _rider;
  }
}
