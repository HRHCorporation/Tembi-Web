import { OurMenuResponse } from './our-menu.response';
export type FoodHighlightResponse = {
  id: number;
  name_ind?: string;
  name_eng?: string;
  description_menu_highlight_ind?: string;
  description_menu_highlight_eng?: string;
  menu_foods: OurMenuResponse[];
}