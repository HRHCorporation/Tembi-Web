import House from "../entity/house.entity";

export default interface IHomeRepo{
  fetchHouses(): Promise<House[]>;
}

export const iHomeRepoKey = "iHomeRepoKey";