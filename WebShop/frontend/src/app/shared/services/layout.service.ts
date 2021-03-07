import { Inject, Injectable } from "@angular/core";
import { WINDOW } from "../injection-tokens/window.token";

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    deviceType: 'desktop' | 'laptop' | 'tablet' | 'mobile';

    constructor(@Inject(WINDOW) private window: Window & Object) {
        this.determineDeviceType();
    }

    private determineDeviceType(): void {
        const deviceWidthInCssPx = this.window.innerWidth;
        const isMobile = 320 <= deviceWidthInCssPx && deviceWidthInCssPx <= 480 ? 'mobile' : false;
        const isTablet = 481 <= deviceWidthInCssPx && deviceWidthInCssPx <= 768 ? 'tablet' : false;
        const isLaptop = 769 <= deviceWidthInCssPx && deviceWidthInCssPx <= 1024 ? 'laptop' : false;

        this.deviceType = isMobile || isTablet || isLaptop || 'desktop';
    }
}
