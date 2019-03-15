// @ts-ignore
import style from "./style.css";
// @ts-ignore
import template from "./template.html";

enum Constants {
  DebounceTimeout = 200
}

enum SlotId {
  Slot1 = 1,
  Slot2 = 2,
  Slot3 = 3
}

export interface ChangeEventDetail {
  newCurrent: 1 | 2 | 3;
}

// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const templateElement = document.createElement("template");
templateElement.innerHTML = `<style>${style}</style>${template}`;

export class InfiniteCarouselWc extends HTMLElement {
  _observer: IntersectionObserver;
  _slot1: Element;
  _slot2: Element;
  _slot3: Element;
  _scrollContainer: Element;
  _current: SlotId;

  // Explicitly let TS know any type can come from index signature
  [key: string]: any;

  constructor() {
    super();

    this.setSlotOrder.bind(this);
    this.upgradeProperty.bind(this);
    this.raiseNextEvent.bind(this);
    this.raisePreviousEvent.bind(this);
    this.goNext.bind(this);
    this.goPrevious.bind(this);

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(templateElement.content.cloneNode(true));

    this._scrollContainer = this.shadowRoot!.getElementById("s")!;
    this._slot1 = this.shadowRoot!.getElementById("1")!;
    this._slot2 = this.shadowRoot!.getElementById("2")!;
    this._slot3 = this.shadowRoot!.getElementById("3")!;

    // slot 2 starts in the middle, although our intersection observer will
    // immediately set slot 1 to current... but we want to init this to 2
    this._current = SlotId.Slot2;

    this._observer = new IntersectionObserver(
      (entries, _observer) => {
        for (let entry of entries) {
          if (entry.intersectionRatio === 1) {
            const oldCurrent = this._current;
            this._current = Number(entry.target.getAttribute("id"));
            this.setSlotOrder(oldCurrent, this._current);
            break;
          }
        }
      },
      { root: this._scrollContainer, threshold: 1.0 }
    );
  }

  connectedCallback() {
    this.setObserver(true);

    this.upgradeProperty("lock");
  }

  disconnectedCallback() {
    this.setObserver(false);
  }

  public goNext() {
    this._scrollContainer.scrollBy({
      left: this._scrollContainer.clientWidth,
      behavior: "smooth"
    });
  }

  public goPrevious() {
    this._scrollContainer.scrollBy({
      left: this._scrollContainer.clientWidth * -1,
      behavior: "smooth"
    });
  }

  private setObserver = (observe: boolean) => {
    if (observe) {
      this._observer.observe(this._slot1);
      this._observer.observe(this._slot2);
      this._observer.observe(this._slot3);
    } else {
      this._observer.disconnect();
    }
  };

  // from https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
  private upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  get lock() {
    return this.hasAttribute("open");
  }

  set lock(isLocked) {
    if (isLocked) {
      this.setAttribute("lock", "");
    } else {
      this.removeAttribute("lock");
    }
  }

  private raiseNextEvent(eventDetails: ChangeEventDetail) {
    this.dispatchEvent(
      new CustomEvent("next", {
        bubbles: true,
        detail: eventDetails
      })
    );
  }

  private raisePreviousEvent(eventDetails: ChangeEventDetail) {
    this.dispatchEvent(
      new CustomEvent("previous", {
        bubbles: true,
        detail: eventDetails
      })
    );
  }

  private setSlotOrder(oldCurrentSlot: SlotId, newCurrentSlot: SlotId) {
    if (oldCurrentSlot === newCurrentSlot) {
      return;
    }

    // safari seems to have a bug(?) where it won't programmatically
    // scroll within 158 milliseconds after a css scroll snap, so we use
    // a timeout... it's not ideal but even without that bug there kind of
    // needs to be a debounce timeout to prevent an eager user from
    // over-scrolling, which helps give the next->next view time
    // to update the slot content.

    const isPrevious =
      (oldCurrentSlot === SlotId.Slot2 && newCurrentSlot === SlotId.Slot1) ||
      (oldCurrentSlot === SlotId.Slot3 && newCurrentSlot === SlotId.Slot2) ||
      (oldCurrentSlot === SlotId.Slot1 && newCurrentSlot === SlotId.Slot3);

    // disable scrolling and observing while we re-arrange stuff
    this.setObserver(false);
    this._scrollContainer.classList.add("no-x-scroll");

    // emit event
    if (isPrevious) {
      this.raisePreviousEvent({ newCurrent: newCurrentSlot });
    } else {
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
          this._scrollContainer.scrollLeft = this._slot3.clientWidth;

          this.setObserver(true);
          this._scrollContainer.classList.remove("no-x-scroll");
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
          this._scrollContainer.scrollLeft = this._slot1.clientWidth;

          this.setObserver(true);
          this._scrollContainer.classList.remove("no-x-scroll");
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
          this._scrollContainer.scrollLeft = this._slot2.clientWidth;

          this.setObserver(true);
          this._scrollContainer.classList.remove("no-x-scroll");
        }, Constants.DebounceTimeout);
        break;
      default:
        throw `this._current has bad value: ${this._current}`;
    }
  }
}

customElements.define("infinite-carousel-wc", InfiniteCarouselWc);
