import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";


@Injectable({ providedIn: "root" })
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  // createHotObservable<T>(coldObservable: Observable<T>) {
  //   const subject$ = new Subject();
  //   const sourceSub = coldObservable.subscribe(subject$);
  //   let refCount = 0;

  //   return new Observable((observer) => {
  //     refCount++;
  //     const sub = subject$.subscribe(observer);

  //     return () => {
  //       refCount--;
  //       sub.unsubscribe();
  //       if (refCount === 0) {
  //         sourceSub.unsubscribe();
  //       }
  //     };
  //   });
  // }
}
