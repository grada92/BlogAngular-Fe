import { UserOutputDto } from "../user/user-output-dto.model";

export interface CommentOutputDto {

  id:number,
  content:string,
  user: UserOutputDto,
  articleId:number,
  parentCommentId?: number,
  replies?: CommentOutputDto[];
}
