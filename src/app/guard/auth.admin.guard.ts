import {filter, map, Observable} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import { UserService } from "../shared/services/user.service";

export function authAdminGuard() {
  const userService = inject(UserService);
  const router = inject(Router);
  const userId: number = (Number)(localStorage.getItem("USER_ID"));
  console.log(userId);
  if (userId) {
    return userService.findRolesByUserId(userId).pipe(
      filter(roles => roles.length > 0),
      map(roles => {
        const userRoles = roles.map(roleOutputDto => roleOutputDto.authority);
        if (userRoles.includes("ROLE_ADMIN")) {
          return true;
        } else {
          router.navigateByUrl("/");
          return false;
        }
      })
    );
  } else {
    router.navigateByUrl("/login");
    return new Observable<boolean>();
  }
}
