export type Product = {
  id: string;
  title: string;
  images?: {
    edges: { node: { url: string } }[];
  };
};