import { PackageResponse } from "../response/package.response";
import PackageInclude from "./package-include.entity";

export default class Package {
  id: number;
  icon: string;
  theme: "standard" | "premium" | "exclusive";
  color: string;
  includes: PackageInclude[];
  name_eng: string;
  name_ind: string;
  is_popular: boolean;
  minimum_guest: number;
  description_eng: string;
  description_ind: string;

  constructor(
    data: Omit<Package, "getName" | "getDescription" | "getPackageIncludes" | "getMinimumGuest">
  ) {
    this.id = data.id;
    this.icon = data.icon;
    this.theme = data.theme;
    this.color = data.color;
    this.includes = data.includes;
    this.name_eng = data.name_eng;
    this.name_ind = data.name_ind;
    this.is_popular = data.is_popular;
    this.minimum_guest = data.minimum_guest;
    this.description_eng = data.description_eng;
    this.description_ind = data.description_ind;
  }


  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getDescription(language: "id" | "en"): string {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  getPackageIncludes(): PackageInclude[] {
    return this.includes || [];
  }

  getMinimumGuest(language: "id" | "en"): string {
    return language === "id" ? `Minimum ${this.minimum_guest} tamu` : `Minimum guests ${this.minimum_guest} Pax`;
  }


  static fromResponse(response: PackageResponse): Package {
    return new Package({
      id: response.id,
      icon: response.icon,
      theme: response.is_popular === 1 ? "premium" : "standard",
      color: response.color,
      includes: response.includes.map((inc) => PackageInclude.fromResponse(inc)),
      name_eng: response.name_eng,
      name_ind: response.name_ind,
      is_popular: response.is_popular === 1,
      minimum_guest: response.minimum_guest,
      description_eng: response.description_eng,
      description_ind: response.description_ind,
    });
  }
}