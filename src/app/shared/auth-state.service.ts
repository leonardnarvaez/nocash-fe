import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, BaseStorageService } from "ngx-webstorage-service";
import { User } from "../models/user";

@Injectable()
export class AuthStateService {
  constructor(@Inject(LOCAL_STORAGE) private storage: BaseStorageService<User>) {}

  public setCurrentUser(user: User): void {
    this.storage.set("CURRENT_USER", JSON.stringify(user));
  }

  public getCurrentUser(): User {
    return JSON.parse(this.storage.get("CURRENT_USER"));
  }

  public hasCurrentUser() {
    if (this.storage.get("CURRENT_USER")) {
      return true;
    }
    return false;
  }

  public removeCurrentUser() {
    this.storage.remove("CURRENT_USER");
  }
}
