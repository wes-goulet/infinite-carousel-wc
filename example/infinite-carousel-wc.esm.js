var css = "#s {\n  height: inherit;\n  width: inherit;\n  display: flex;\n  -webkit-overflow-scrolling: touch;\n  -ms-overflow-style: none;\n  overflow: -moz-scrollbars-none;\n}\n\n#s::-webkit-scrollbar {\n  display: none;\n}\n\n:host(:not([vertical])) #s {\n  flex-direction: row;\n  -ms-scroll-snap-coordinate: 0 0;\n      scroll-snap-coordinate: 0 0;\n  -ms-scroll-snap-points-x: repeat(100%);\n      scroll-snap-points-x: repeat(100%);\n  -ms-scroll-snap-type: x mandatory;\n      scroll-snap-type: x mandatory;\n  overflow-x: auto;\n}\n\n:host([vertical]) #s {\n  flex-direction: column;\n  -ms-scroll-snap-coordinate: 0 0;\n      scroll-snap-coordinate: 0 0;\n  -ms-scroll-snap-points-y: repeat(100%);\n      scroll-snap-points-y: repeat(100%);\n  -ms-scroll-snap-type: y mandatory;\n      scroll-snap-type: y mandatory;\n  overflow-y: auto;\n}\n\n#s > div {\n  width: 100%;\n  height: 100%;\n  flex: none;\n  scroll-snap-align: start;\n  scroll-snap-stop: always;\n}\n\n:host([lock]:not([vertical])) #s {\n  overflow-x: hidden;\n}\n\n:host([lock][vertical]) #s {\n  overflow-y: hidden;\n}\n\n::slotted(*) {\n  width: 100%;\n  height: 100%;\n}\n\n.previous {\n  order: 1;\n}\n\n.current {\n  order: 2;\n}\n\n.next {\n  order: 3;\n}\n\n.no-scroll {\n  overflow-x: hidden !important;\n  overflow-y: hidden !important;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsY0FBYztFQUNkLGtDQUFrQztFQUNsQyx5QkFBeUI7RUFDekIsK0JBQStCO0NBQ2hDOztBQUVEO0VBQ0UsY0FBYztDQUNmOztBQUVEO0VBQ0Usb0JBQW9CO0VBQ3BCLGdDQUE0QjtNQUE1Qiw0QkFBNEI7RUFDNUIsdUNBQW1DO01BQW5DLG1DQUFtQztFQUNuQyxrQ0FBOEI7TUFBOUIsOEJBQThCO0VBQzlCLGlCQUFpQjtDQUNsQjs7QUFFRDtFQUNFLHVCQUF1QjtFQUN2QixnQ0FBNEI7TUFBNUIsNEJBQTRCO0VBQzVCLHVDQUFtQztNQUFuQyxtQ0FBbUM7RUFDbkMsa0NBQThCO01BQTlCLDhCQUE4QjtFQUM5QixpQkFBaUI7Q0FDbEI7O0FBRUQ7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIseUJBQXlCO0NBQzFCOztBQUVEO0VBQ0UsbUJBQW1CO0NBQ3BCOztBQUVEO0VBQ0UsbUJBQW1CO0NBQ3BCOztBQUVEO0VBQ0UsWUFBWTtFQUNaLGFBQWE7Q0FDZDs7QUFFRDtFQUNFLFNBQVM7Q0FDVjs7QUFFRDtFQUNFLFNBQVM7Q0FDVjs7QUFFRDtFQUNFLFNBQVM7Q0FDVjs7QUFFRDtFQUNFLDhCQUE4QjtFQUM5Qiw4QkFBOEI7Q0FDL0IiLCJmaWxlIjoic3R5bGUuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI3Mge1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIHdpZHRoOiBpbmhlcml0O1xuICBkaXNwbGF5OiBmbGV4O1xuICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcbiAgb3ZlcmZsb3c6IC1tb3otc2Nyb2xsYmFycy1ub25lO1xufVxuXG4jczo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG46aG9zdCg6bm90KFt2ZXJ0aWNhbF0pKSAjcyB7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIHNjcm9sbC1zbmFwLWNvb3JkaW5hdGU6IDAgMDtcbiAgc2Nyb2xsLXNuYXAtcG9pbnRzLXg6IHJlcGVhdCgxMDAlKTtcbiAgc2Nyb2xsLXNuYXAtdHlwZTogeCBtYW5kYXRvcnk7XG4gIG92ZXJmbG93LXg6IGF1dG87XG59XG5cbjpob3N0KFt2ZXJ0aWNhbF0pICNzIHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgc2Nyb2xsLXNuYXAtY29vcmRpbmF0ZTogMCAwO1xuICBzY3JvbGwtc25hcC1wb2ludHMteTogcmVwZWF0KDEwMCUpO1xuICBzY3JvbGwtc25hcC10eXBlOiB5IG1hbmRhdG9yeTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3MgPiBkaXYge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBmbGV4OiBub25lO1xuICBzY3JvbGwtc25hcC1hbGlnbjogc3RhcnQ7XG4gIHNjcm9sbC1zbmFwLXN0b3A6IGFsd2F5cztcbn1cblxuOmhvc3QoW2xvY2tdOm5vdChbdmVydGljYWxdKSkgI3Mge1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG59XG5cbjpob3N0KFtsb2NrXVt2ZXJ0aWNhbF0pICNzIHtcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xufVxuXG46OnNsb3R0ZWQoKikge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ucHJldmlvdXMge1xuICBvcmRlcjogMTtcbn1cblxuLmN1cnJlbnQge1xuICBvcmRlcjogMjtcbn1cblxuLm5leHQge1xuICBvcmRlcjogMztcbn1cblxuLm5vLXNjcm9sbCB7XG4gIG92ZXJmbG93LXg6IGhpZGRlbiAhaW1wb3J0YW50O1xuICBvdmVyZmxvdy15OiBoaWRkZW4gIWltcG9ydGFudDtcbn1cbiJdfQ== */";

var template = "<div id=\"s\">\n  <div id=\"1\"><slot name=\"1\"></slot></div>\n  <div id=\"2\"><slot name=\"2\"></slot></div>\n  <div id=\"3\"><slot name=\"3\"></slot></div>\n</div>\n";

// @ts-ignore
var Constants;
(function (Constants) {
    Constants[Constants["DebounceTimeout"] = 200] = "DebounceTimeout";
})(Constants || (Constants = {}));
var SlotId;
(function (SlotId) {
    SlotId[SlotId["Slot1"] = 1] = "Slot1";
    SlotId[SlotId["Slot2"] = 2] = "Slot2";
    SlotId[SlotId["Slot3"] = 3] = "Slot3";
})(SlotId || (SlotId = {}));
// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const templateElement = document.createElement("template");
templateElement.innerHTML = `<style>${css}</style>${template}`;
class InfiniteCarouselWc extends HTMLElement {
    constructor() {
        super();
        this._lockScroll = false;
        this.setSlotOrder.bind(this);
        this.upgradeProperty.bind(this);
        this.raiseNextEvent.bind(this);
        this.raisePreviousEvent.bind(this);
        this.goNext.bind(this);
        this.goPrevious.bind(this);
        this.reset.bind(this);
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateElement.content.cloneNode(true));
        this._scrollContainer = this.shadowRoot.getElementById("s");
        this._slot1 = this.shadowRoot.getElementById("1");
        this._slot2 = this.shadowRoot.getElementById("2");
        this._slot3 = this.shadowRoot.getElementById("3");
        // slot 2 starts in the middle, although our intersection observer will
        // immediately set slot 1 to current... but we want to init this to 2
        this._current = SlotId.Slot2;
        this._observer = new IntersectionObserver((entries, _observer) => {
            for (let entry of entries) {
                if (entry.intersectionRatio === 1) {
                    const oldCurrent = this._current;
                    this._current = Number(entry.target.getAttribute("id"));
                    this.setSlotOrder(oldCurrent, this._current);
                    break;
                }
            }
        }, { root: this._scrollContainer, threshold: 1.0 });
    }
    connectedCallback() {
        this._observer.observe(this._slot1);
        this._observer.observe(this._slot2);
        this._observer.observe(this._slot3);
        this.upgradeProperty("lock");
        this.upgradeProperty("vertical");
    }
    disconnectedCallback() {
        this._observer.disconnect();
    }
    /**
     * Goes to the next slot in the carousel.
     *
     * @memberof InfiniteCarouselWc
     */
    goNext() {
        if (!this._lockScroll && !this.lock) {
            this._scrollContainer.scrollBy({
                left: this.vertical ? undefined : this._scrollContainer.clientWidth,
                top: this.vertical ? this._scrollContainer.clientHeight : undefined,
                behavior: "smooth"
            });
        }
    }
    /**
     * Goes to the previous slot in the carousel.
     *
     * @memberof InfiniteCarouselWc
     */
    goPrevious() {
        if (!this._lockScroll && !this.lock) {
            this._scrollContainer.scrollBy({
                left: this.vertical
                    ? undefined
                    : this._scrollContainer.clientWidth * -1,
                top: this.vertical
                    ? this._scrollContainer.clientHeight * -1
                    : undefined,
                behavior: "smooth"
            });
        }
    }
    /**
     * Resets the slot order so that slot 1 is in the "current" position, slot 2
     * is in the "next" position, and slot 3 is in the "previous" position.
     *
     * @memberof InfiniteCarouselWc
     */
    reset() {
        this._current = SlotId.Slot1;
        this.setSlotOrder(SlotId.Slot2, SlotId.Slot1);
    }
    // from https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
    upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }
    get lock() {
        return this.hasAttribute("lock");
    }
    set lock(isLocked) {
        if (isLocked) {
            this.setAttribute("lock", "");
        }
        else {
            this.removeAttribute("lock");
        }
    }
    get vertical() {
        return this.hasAttribute("vertical");
    }
    set vertical(isVertical) {
        if (isVertical) {
            this.setAttribute("vertical", "");
        }
        else {
            this.removeAttribute("vertical");
        }
        // if the vertical attribute changes then reset the slot order to start
        // with slot 1
        this.reset();
    }
    raiseNextEvent(eventDetails) {
        this.dispatchEvent(new CustomEvent("next", {
            bubbles: true,
            detail: eventDetails
        }));
    }
    raisePreviousEvent(eventDetails) {
        this.dispatchEvent(new CustomEvent("previous", {
            bubbles: true,
            detail: eventDetails
        }));
    }
    setSlotOrder(oldCurrentSlot, newCurrentSlot) {
        if (oldCurrentSlot === newCurrentSlot || this._lockScroll) {
            return;
        }
        this._lockScroll = true;
        // safari seems to have a bug(?) where it won't programmatically
        // scroll within 158 milliseconds after a css scroll snap, so we use
        // a timeout... it's not ideal but even without that bug there kind of
        // needs to be a debounce timeout to prevent an eager user from
        // over-scrolling, which helps give the next->next view time
        // to update the slot content.
        const isPrevious = (oldCurrentSlot === SlotId.Slot2 && newCurrentSlot === SlotId.Slot1) ||
            (oldCurrentSlot === SlotId.Slot3 && newCurrentSlot === SlotId.Slot2) ||
            (oldCurrentSlot === SlotId.Slot1 && newCurrentSlot === SlotId.Slot3);
        // disable scrolling while we re-arrange stuff
        this._scrollContainer.classList.add("no-scroll");
        // emit event
        if (isPrevious) {
            this.raisePreviousEvent({ newCurrent: newCurrentSlot });
        }
        else {
            this.raiseNextEvent({ newCurrent: newCurrentSlot });
        }
        switch (newCurrentSlot) {
            case SlotId.Slot1:
                setTimeout(() => {
                    this._slot1.classList.remove("previous");
                    this._slot1.classList.remove("next");
                    this._slot1.classList.add("current");
                    this._slot3.classList.add("previous");
                    this._slot3.classList.remove("next");
                    this._slot3.classList.remove("current");
                    this._slot2.classList.remove("previous");
                    this._slot2.classList.add("next");
                    this._slot2.classList.remove("current");
                    if (this.vertical) {
                        this._scrollContainer.scrollTop = this._slot3.clientHeight;
                    }
                    else {
                        this._scrollContainer.scrollLeft = this._slot3.clientWidth;
                    }
                    this._lockScroll = false;
                    this._scrollContainer.classList.remove("no-scroll");
                }, Constants.DebounceTimeout);
                break;
            case SlotId.Slot2:
                setTimeout(() => {
                    this._slot1.classList.add("previous");
                    this._slot1.classList.remove("next");
                    this._slot1.classList.remove("current");
                    this._slot3.classList.remove("previous");
                    this._slot3.classList.add("next");
                    this._slot3.classList.remove("current");
                    this._slot2.classList.remove("previous");
                    this._slot2.classList.remove("next");
                    this._slot2.classList.add("current");
                    if (this.vertical) {
                        this._scrollContainer.scrollTop = this._slot1.clientHeight;
                    }
                    else {
                        this._scrollContainer.scrollLeft = this._slot1.clientWidth;
                    }
                    this._lockScroll = false;
                    this._scrollContainer.classList.remove("no-scroll");
                }, Constants.DebounceTimeout);
                break;
            case SlotId.Slot3:
                setTimeout(() => {
                    this._slot1.classList.remove("previous");
                    this._slot1.classList.add("next");
                    this._slot1.classList.remove("current");
                    this._slot3.classList.remove("previous");
                    this._slot3.classList.remove("next");
                    this._slot3.classList.add("current");
                    this._slot2.classList.add("previous");
                    this._slot2.classList.remove("next");
                    this._slot2.classList.remove("current");
                    if (this.vertical) {
                        this._scrollContainer.scrollTop = this._slot2.clientHeight;
                    }
                    else {
                        this._scrollContainer.scrollLeft = this._slot2.clientWidth;
                    }
                    this._lockScroll = false;
                    this._scrollContainer.classList.remove("no-scroll");
                }, Constants.DebounceTimeout);
                break;
            default:
                throw `newCurrentSlot has bad value: ${newCurrentSlot}`;
        }
    }
}
customElements.define("infinite-carousel-wc", InfiniteCarouselWc);

export { InfiniteCarouselWc };
