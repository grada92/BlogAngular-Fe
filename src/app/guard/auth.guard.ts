import {inject} from "@angular/core";
import {Router} from "@angular/router";
import { UserService } from "../shared/services/user.service";

export function authGuard(): boolean {
  const userService = inject(UserService);
  const router = inject(Router);
  const userId: number = (Number)(localStorage.getItem("USER_ID"));
  if (userId) {
    return true;
  } else {
    router.navigateByUrl("/login");
    return false;
  }
}
