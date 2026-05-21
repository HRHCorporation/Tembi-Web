import { PackageIncludeResponse } from "../response/package-include.response";

export type PackageIncludeProps = {
  id: number;
  name_ind: string;
  name_eng: string;
};

export default class PackageInclude {
  id: number;
  name_ind: string;
  name_eng: string;

  constructor(data: Omit<PackageInclude, "getName">) {
    this.id = data.id;
    this.name_ind = data.name_ind;
    this.name_eng = data.name_eng;
  }

  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  static fromResponse(response: PackageIncludeResponse): PackageInclude {
    return new PackageInclude({
      id: response.id,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
    });
  }
}