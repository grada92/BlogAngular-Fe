export interface ArticleInputDto {
  title: string;
  content: string;
  image?: File;
  categories: number[];
  tags: number[];
  userId: number;
}
