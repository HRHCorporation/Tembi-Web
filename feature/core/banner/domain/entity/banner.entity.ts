export default class Banner {
  id: number;
  image: string;
  title_ind: string;
  title_eng: string;
  subtitle_ind?: string;
  subtitle_eng?: string;
  description_ind: string;
  description_eng: string;

  constructor({
    id,
    image,
    title_ind,
    title_eng,
    subtitle_ind,
    subtitle_eng,
    description_ind,
    description_eng
  }: Banner) {
    this.id = id;
    this.image = image;
    this.title_ind = title_ind;
    this.title_eng = title_eng;
    this.subtitle_ind = subtitle_ind;
    this.subtitle_eng = subtitle_eng;
    this.description_ind = description_ind;
    this.description_eng = description_eng;
  }
}