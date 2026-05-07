export default class House {
  name: string;
  desc: number;
  images: string[];
  icons: string[];
  features: string[];
  path: string;

  constructor({ name, desc, images, icons, features, path }: { name: string; desc: number; images: string[]; icons: string[]; features: string[]; path: string }) {
    this.name = name;
    this.desc = desc;
    this.images = images;
    this.icons = icons;
    this.features = features;
    this.path = path;
  }
}