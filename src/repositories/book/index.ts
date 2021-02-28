export type Book = {
  id: string;
  title: string;
  author: string;
};

export const bookPath = (): string => `books`;
