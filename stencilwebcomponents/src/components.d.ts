/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface UcSideDrawer {
        "first": string;
        "onContentChange": (content: string) => Promise<void>;
        "oncloseDrawer": () => Promise<void>;
        "open": boolean;
        "openMainMenu": () => Promise<void>;
    }
    interface UcStockFinder {
    }
    interface UcStockPrice {
        "stockSymbol": string;
    }
    interface UcTooltip {
        "text": string;
    }
}
export interface UcStockFinderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLUcStockFinderElement;
}
declare global {
    interface HTMLUcSideDrawerElement extends Components.UcSideDrawer, HTMLStencilElement {
    }
    var HTMLUcSideDrawerElement: {
        prototype: HTMLUcSideDrawerElement;
        new (): HTMLUcSideDrawerElement;
    };
    interface HTMLUcStockFinderElement extends Components.UcStockFinder, HTMLStencilElement {
    }
    var HTMLUcStockFinderElement: {
        prototype: HTMLUcStockFinderElement;
        new (): HTMLUcStockFinderElement;
    };
    interface HTMLUcStockPriceElement extends Components.UcStockPrice, HTMLStencilElement {
    }
    var HTMLUcStockPriceElement: {
        prototype: HTMLUcStockPriceElement;
        new (): HTMLUcStockPriceElement;
    };
    interface HTMLUcTooltipElement extends Components.UcTooltip, HTMLStencilElement {
    }
    var HTMLUcTooltipElement: {
        prototype: HTMLUcTooltipElement;
        new (): HTMLUcTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "uc-side-drawer": HTMLUcSideDrawerElement;
        "uc-stock-finder": HTMLUcStockFinderElement;
        "uc-stock-price": HTMLUcStockPriceElement;
        "uc-tooltip": HTMLUcTooltipElement;
    }
}
declare namespace LocalJSX {
    interface UcSideDrawer {
        "first"?: string;
        "open"?: boolean;
    }
    interface UcStockFinder {
        "onUcSymbolSelect"?: (event: UcStockFinderCustomEvent<string>) => void;
    }
    interface UcStockPrice {
        "stockSymbol"?: string;
    }
    interface UcTooltip {
        "text"?: string;
    }
    interface IntrinsicElements {
        "uc-side-drawer": UcSideDrawer;
        "uc-stock-finder": UcStockFinder;
        "uc-stock-price": UcStockPrice;
        "uc-tooltip": UcTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "uc-side-drawer": LocalJSX.UcSideDrawer & JSXBase.HTMLAttributes<HTMLUcSideDrawerElement>;
            "uc-stock-finder": LocalJSX.UcStockFinder & JSXBase.HTMLAttributes<HTMLUcStockFinderElement>;
            "uc-stock-price": LocalJSX.UcStockPrice & JSXBase.HTMLAttributes<HTMLUcStockPriceElement>;
            "uc-tooltip": LocalJSX.UcTooltip & JSXBase.HTMLAttributes<HTMLUcTooltipElement>;
        }
    }
}
