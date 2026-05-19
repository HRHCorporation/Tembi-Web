import { OurMenuResponse } from './our-menu.response';
export type FoodHighlightResponse = {
  id: number;
  name_ind: string;
  name_eng: string;
  menu_foods: OurMenuResponse[];
}