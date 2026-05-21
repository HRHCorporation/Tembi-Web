import { KeysResponse } from "../response/keys.response";

export default class Keys {
  id: number;
  icon?: string
  label_eng: string;
  label_ind: string
  value_eng: string;
  value_ind: string;

  constructor({ id, icon, label_eng, label_ind, value_eng, value_ind }: { id: number; icon?: string; label_eng: string; label_ind: string; value_eng: string; value_ind: string }) {
    this.id = id;
    this.icon = icon;
    this.label_eng = label_eng;
    this.label_ind = label_ind;
    this.value_eng = value_eng;
    this.value_ind = value_ind;
  }

  getLabel(language: "id" | "en"): string {
    return language === "id" ? this.label_ind : this.label_eng;
  }

  getValue(language: "id" | "en"): string {
    return language === "id" ? this.value_ind : this.value_eng;
  }

  getIcon(): string | undefined {
    return this.icon && this.icon.trim() !== "" ? this.icon : undefined;
  }

  static fromResponse(response: KeysResponse): Keys {
    return new Keys({
      id: response.id,
      icon: response.icon,
      label_eng: response.label_eng ?? "",
      label_ind: response.label_ind ?? "",
      value_eng: response.value_eng ?? "",
      value_ind: response.value_ind ?? ""
    });
  }
}