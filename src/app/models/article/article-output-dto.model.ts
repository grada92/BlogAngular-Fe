import { CategoryOutputDto } from "../category/category-output-dto.model";
import { TagOutputDto } from "../tag/tag-output-dto.model";
import { VoteOutputDto } from "../vote/vote-output-dto.model";

export interface ArticleOutputDto {
  id: number;
  userId: number;
  title: string;
  content: string;
  image?: ArrayBuffer;
  categories: CategoryOutputDto[];
  tags: TagOutputDto[];
  vote: VoteOutputDto[];
  likeCount: number;
  dislikeCount:number;
}
