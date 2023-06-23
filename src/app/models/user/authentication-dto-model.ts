import { UserOutputDto } from "./user-output-dto.model";

export interface AuthenticationDto{

  jwt : string,
  user : UserOutputDto

}
