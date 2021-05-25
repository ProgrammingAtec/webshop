import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LayoutService } from "../shared/services/layout.service";

@Injectable()
export class CanActivateGrid implements CanActivate {
	public constructor(
		private readonly layout: LayoutService,
		private readonly router: Router
	) {}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.layout.deviceType !== 'mobile') {
			return true;
		}

		return this.router.createUrlTree(['/home']);
	}
}
