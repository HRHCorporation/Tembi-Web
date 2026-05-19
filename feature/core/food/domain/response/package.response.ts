import { PackageIncludeResponse } from "./package-include.response";

export type PackageResponse = {
  id: number;
  icon: string;
  color: string;
  includes: PackageIncludeResponse[];
  name_eng: string;
  name_ind: string;
  is_popular: number;
  minimum_guest: number;
  description_eng: string;
  description_ind: string;
};