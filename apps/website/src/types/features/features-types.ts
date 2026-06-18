export interface Feature {
  id: string;
  name: string;
  title: string;
  description: string | React.ReactNode;
  features: string[];
  imagePath: string;
}
