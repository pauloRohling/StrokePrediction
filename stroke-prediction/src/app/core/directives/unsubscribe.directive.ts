import { Directive, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Directive()
export class UnsubscribeDirective implements OnDestroy {

  private subscriptions: Subscription;

  constructor() {
    this.subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addSubscription(subscription: Subscription): void {
    this.subscriptions.add(subscription);
  }

}
