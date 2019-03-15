// @ts-ignore
import style from "./style.css";
// @ts-ignore
import template from "./template.html";

enum Constants {
  DebounceTimeout = 200
}

enum PaneId {
  Pane1 = "p1",
  Pane2 = "p2",
  Pane3 = "p3"
}

export enum SlotPosition {
  CURRENT = "current",
  NEXT = "next",
  PREVIOUS = "previous"
}

export enum Direction {
  NEXT = "next",
  PREVIOUS = "previous"
}

export interface ISlotChangeEventDetails {
  newCurrent: 1 | 2 | 3;
  direction: Direction;
}

// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const templateElement = document.createElement("template");
templateElement.innerHTML = `<style>${style}</style>${template}`;

export class InfiniteCarouselWc extends HTMLElement {
  _observer: IntersectionObserver;
  _pane1: Element;
  _pane2: Element;
  _pane3: Element;
  _scrollContainer: Element;
  _current: PaneId;

  // Explicitly let TS know any type can come from index signature
  [key: string]: any;

  constructor() {
    super();

    this.setPaneOrder.bind(this);
    this.upgradeProperty.bind(this);
    this.raisePositionChangingEvent.bind(this);
    this.raisePositionChangedEvent.bind(this);
    this.goNext.bind(this);
    this.goPrevious.bind(this);

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(templateElement.content.cloneNode(true));

    this._scrollContainer = this.shadowRoot!.querySelector("#s")!;
    this._pane1 = this.shadowRoot!.querySelector("#p1")!;
    this._pane2 = this.shadowRoot!.querySelector("#p2")!;
    this._pane3 = this.shadowRoot!.querySelector("#p3")!;
    this._current = PaneId.Pane2; // pane 2 starts in the middle

    this._observer = new IntersectionObserver(
      (entries, _observer) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            const oldCurrent = this._current;
            this._current = entry.target.getAttribute("id") as PaneId;
            this.setPaneOrder(oldCurrent, this._current);
            break;
          }
        }
      },
      { root: this._scrollContainer, threshold: 1.0 }
    );
  }

  connectedCallback() {
    this._observer.observe(this._pane1);
    this._observer.observe(this._pane2);
    this._observer.observe(this._pane3);

    this.upgradeProperty("lock");
  }

  disconnectedCallback() {
    this._observer && this._observer.disconnect();
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

  // from https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
  private upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  // - scroll bar is still visible on ios, potential fix https://stackoverflow.com/a/45590143

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

  private raisePositionChangingEvent(eventDetails: ISlotChangeEventDetails) {
    this.dispatchEvent(
      new CustomEvent("slot-order-changing", {
        bubbles: true,
        detail: eventDetails
      })
    );
  }

  private setPaneOrder(oldCurrentPane: PaneId, newCurrentPane: PaneId) {
    if (oldCurrentPane === newCurrentPane) {
      return;
    }

    // safari seems to have a bug(?) where it won't programmatically
    // scroll within 158 milliseconds after a css scroll snap, so we use
    // a timeout... it's not ideal but even without that bug there kind of
    // needs to be a debounce timeout to prevent an eager user from
    // over-scrolling, which helps give the next->next view time
    // to update the slot content.

    const direction =
      (oldCurrentPane === PaneId.Pane2 && newCurrentPane === PaneId.Pane1) ||
      (oldCurrentPane === PaneId.Pane3 && newCurrentPane === PaneId.Pane2) ||
      (oldCurrentPane === PaneId.Pane1 && newCurrentPane === PaneId.Pane3)
        ? Direction.PREVIOUS
        : Direction.NEXT;

    switch (newCurrentPane) {
      case PaneId.Pane1:
        this._scrollContainer.classList.add("no-x-scroll");
        this.raisePositionChangingEvent({
          direction,
          newCurrent: 1
        });

        setTimeout(() => {
          this._pane1.classList.remove("previous");
          this._pane1.classList.remove("next");
          this._pane1.classList.add("current");
          this._pane3.classList.add("previous");
          this._pane3.classList.remove("next");
          this._pane3.classList.remove("current");
          this._pane2.classList.remove("previous");
          this._pane2.classList.add("next");
          this._pane2.classList.remove("current");
          this._scrollContainer.scrollLeft = this._pane3.clientWidth;
          this._scrollContainer.classList.remove("no-x-scroll");
          this.raisePositionChangedEvent({
            direction,
            newCurrent: 1
          });
        }, Constants.DebounceTimeout);
        break;
      case PaneId.Pane2:
        this._scrollContainer.classList.add("no-x-scroll");
        this.raisePositionChangingEvent({
          direction,
          newCurrent: 2
        });

        setTimeout(() => {
          this._pane1.classList.add("previous");
          this._pane1.classList.remove("next");
          this._pane1.classList.remove("current");
          this._pane3.classList.remove("previous");
          this._pane3.classList.add("next");
          this._pane3.classList.remove("current");
          this._pane2.classList.remove("previous");
          this._pane2.classList.remove("next");
          this._pane2.classList.add("current");
          this._scrollContainer.scrollLeft = this._pane1.clientWidth;
          this._scrollContainer.classList.remove("no-x-scroll");
          this.raisePositionChangedEvent({
            direction,
            newCurrent: 2
          });
        }, Constants.DebounceTimeout);
        break;
      case PaneId.Pane3:
        this._scrollContainer.classList.add("no-x-scroll");
        this.raisePositionChangingEvent({
          direction,
          newCurrent: 3
        });

        setTimeout(() => {
          this._pane1.classList.remove("previous");
          this._pane1.classList.add("next");
          this._pane1.classList.remove("current");
          this._pane3.classList.remove("previous");
          this._pane3.classList.remove("next");
          this._pane3.classList.add("current");
          this._pane2.classList.add("previous");
          this._pane2.classList.remove("next");
          this._pane2.classList.remove("current");
          this._scrollContainer.scrollLeft = this._pane2.clientWidth;
          this._scrollContainer.classList.remove("no-x-scroll");
          this.raisePositionChangedEvent({
            direction,
            newCurrent: 3
          });
        }, Constants.DebounceTimeout);
        break;
      default:
        console.error(`this._current has bad value: ${this._current}`);
        break;
    }
  }
}

customElements.define("infinite-carousel-wc", InfiniteCarouselWc);
