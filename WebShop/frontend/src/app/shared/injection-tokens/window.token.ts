import { isPlatformBrowser } from "@angular/common";
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID, Injectable } from "@angular/core";

export const WINDOW = new InjectionToken('WindowToken');

export abstract class WindowRef {
    get nativeWindow(): Window | Object {
        throw new Error('Not implemented');
    }
}

@Injectable()
export class BrowserWindow extends WindowRef {
    constructor() {
        super();
    }

    get nativeWindow(): Window | Object {
        return window;
    }
}

export function windowFactory (browserWindow: BrowserWindow, platformId: Object): Window | Object {
    if (isPlatformBrowser(platformId)) {
        return browserWindow.nativeWindow;
    }

    return new Object();
}

export const browserWindowProvider: ClassProvider = {
    provide: BrowserWindow,
    useClass: BrowserWindow
};

const windowProvider: FactoryProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [ BrowserWindow, PLATFORM_ID ]
};

export const WINDOW_PROVIDERS = [
    browserWindowProvider,
    windowProvider
];
