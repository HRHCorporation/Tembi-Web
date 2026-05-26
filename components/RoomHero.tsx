import PageHero from '@/components/PageHero';

interface RoomHeroProps {
  imageUrl: string;
  name: string;
  tagline: string;
  backText: string;
}

export default function RoomHero({ imageUrl, name, tagline, backText }: RoomHeroProps) {
  return (
    <PageHero
      backgroundImage={imageUrl}
      title={name}
      description={tagline}
      badge="Recommendation"
      height="md"
      overlay="gradient-dark"
      backButton={{
        show: true,
        href: '/rooms',
        text: backText,
      }}
    />
  );
}
