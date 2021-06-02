import { RideHistory } from "../models/rides.rideHistory.model";
import { EntityManager, EntityRepository, getConnection } from "typeorm";
import { Ride } from "../models/rides.ride.model";

export interface AddRemoveParticipant {
  parkVisitId: string;
  rideHistoryId: string;
}

export interface IRidesRepository {
  createRideEvent(rideId: string): Promise<RideHistory>;
  addRiderToRideEvent(
    addRemoveParticipant: AddRemoveParticipant
  ): Promise<void>;
  removeRiderToRideEvent(
    addRemoveParticipant: AddRemoveParticipant
  ): Promise<void>;
  changeOperator(operatorId: string, rideId: string): Promise<void>;
  changePassType(passTypeId: string, rideId: string): Promise<void>;
}

@EntityRepository()
export class RidesRepository implements IRidesRepository {
  constructor(private manager: EntityManager) {}

  async createRideEvent(rideId: string): Promise<RideHistory> {
    const conn = await getConnection();
    const qr = await conn.createQueryRunner();
    let _rideHistory: RideHistory;
    try {
      await qr.startTransaction();

      const insertResult = await qr.manager
        .createQueryBuilder()
        .insert()
        .into(RideHistory)
        .values({ rideId: rideId })
        .execute();

      const id = insertResult.identifiers[0].id;

      _rideHistory = await qr.manager
        .createQueryBuilder(RideHistory, "rideHistory")
        .where("rideHistory.id = :id", { id: id })
        .getOne();

      qr.commitTransaction();
    } catch (error) {
      await qr.rollbackTransaction();
      throw error;
    } finally {
      await qr.release();
    }

    return _rideHistory;
  }
  async addRiderToRideEvent(
    addRemoveParticipant: AddRemoveParticipant
  ): Promise<void> {
    return this.manager
      .createQueryBuilder()
      .relation(RideHistory, "participants")
      .of(addRemoveParticipant.rideHistoryId)
      .add(addRemoveParticipant.parkVisitId);
  }
  async removeRiderToRideEvent(
    addRemoveParticipant: AddRemoveParticipant
  ): Promise<void> {
    return this.manager
      .createQueryBuilder()
      .relation(RideHistory, "participants")
      .of(addRemoveParticipant.rideHistoryId)
      .remove(addRemoveParticipant.parkVisitId);
  }
  async changeOperator(operatorId: string, rideId: string): Promise<void> {
    await this.manager
      .createQueryBuilder()
      .update(Ride)
      .set({ operatorId: operatorId })
      .where("id = :id", { id: rideId })
      .execute();
  }
  async changePassType(passTypeId: string, rideId: string): Promise<void> {
    await this.manager
      .createQueryBuilder()
      .update(Ride)
      .set({ passTypeId: passTypeId })
      .where("id = :id", { id: rideId })
      .execute();
  }
}
