export type CollectionResponse = {
  id: number;
  name_ind?: string;
  name_eng?: string;
  items?: CollectionResponse[];
}