// @ts-check

/**
 * @typedef {1 | 2 | 3} SlotId
 * @typedef {{ newCurrent: SlotId }} ChangeEventDetail
 */

const style = `
#s {
  height: inherit;
  width: inherit;
  display: flex;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

#s::-webkit-scrollbar {
  display: none;
}

:host(:not([vertical])) #s {
  flex-direction: row;
  scroll-snap-coordinate: 0 0;
  scroll-snap-points-x: repeat(100%);
  scroll-snap-type: x mandatory;
  overflow-x: auto;
}

:host([vertical]) #s {
  flex-direction: column;
  scroll-snap-coordinate: 0 0;
  scroll-snap-points-y: repeat(100%);
  scroll-snap-type: y mandatory;
  overflow-y: auto;
}

#s > div {
  width: 100%;
  height: 100%;
  flex: none;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

:host([lock]:not([vertical])) #s {
  overflow-x: hidden;
}

:host([lock][vertical]) #s {
  overflow-y: hidden;
}

::slotted(*) {
  width: 100%;
  height: 100%;
}

.previous {
  order: 1;
}

.current {
  order: 2;
}

.next {
  order: 3;
}

.no-scroll {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
`;

const template = `
<div id="s">
  <div id="1"><slot name="1"></slot></div>
  <div id="2"><slot name="2"></slot></div>
  <div id="3"><slot name="3"></slot></div>
</div>
`;

const DEBOUNCE_TIMEOUT = 200;

// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const templateElement = document.createElement("template");
templateElement.innerHTML = `<style>${style}</style>${template}`;

export class InfiniteCarouselWc extends HTMLElement {
  constructor() {
    super();

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
    /** @type {1 | 2 | 3 | undefined}} */
    this._current = undefined;

    /** @type {IntersectionObserver} */
    this._observer = new IntersectionObserver(
      (entries, _observer) => {
        for (let i = 0, len = entries.length; i < len; i++) {
          const entry = entries[i];
          if (entry.intersectionRatio === 1) {
            const newCurrent = /** @type {1 | 2 | 3} */ (Number(
              entry.target.getAttribute("id")
            ));
            if (newCurrent !== this._current) {
              const oldCurrent = this._current;
              this._current = newCurrent;
              this.setSlotOrder(oldCurrent, this._current);
              break;
            }
          }
        }
      },
      { root: this._scrollContainer, threshold: 1.0 }
    );
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
        behavior: "smooth",
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
        behavior: "smooth",
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
    this._current = 1;
    this.setSlotOrder(2, 1);
  }

  // from https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
  /**
   * @param {string} prop
   *
   * @memberOf InfiniteCarouselWc
   */
  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  get currentSlot() {
    if (this._current === undefined) {
      return 1;
    }

    return this._current;
  }

  get lock() {
    return this.hasAttribute("lock");
  }

  set lock(isLocked) {
    if (isLocked) {
      this.setAttribute("lock", "");
    } else {
      this.removeAttribute("lock");
    }
  }

  get vertical() {
    return this.hasAttribute("vertical");
  }

  set vertical(isVertical) {
    if (isVertical) {
      this.setAttribute("vertical", "");
    } else {
      this.removeAttribute("vertical");
    }

    // if the vertical attribute changes then reset the slot order to start
    // with slot 1
    this.reset();
  }

  /**
   * @param {ChangeEventDetail} eventDetails
   *
   * @memberOf InfiniteCarouselWc
   */
  raiseNextEvent(eventDetails) {
    this.dispatchEvent(
      new CustomEvent("next", {
        bubbles: true,
        detail: eventDetails,
      })
    );
  }

  /**
   * @param {ChangeEventDetail} eventDetails
   *
   * @memberOf InfiniteCarouselWc
   */
  raisePreviousEvent(eventDetails) {
    this.dispatchEvent(
      new CustomEvent("previous", {
        bubbles: true,
        detail: eventDetails,
      })
    );
  }

  /**
   * @param {SlotId} oldCurrentSlot
   * @param {SlotId} newCurrentSlot
   * @returns
   *
   * @memberOf InfiniteCarouselWc
   */
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

    const isPrevious =
      (oldCurrentSlot === 2 && newCurrentSlot === 1) ||
      (oldCurrentSlot === 3 && newCurrentSlot === 2) ||
      (oldCurrentSlot === 1 && newCurrentSlot === 3);

    // disable scrolling while we re-arrange stuff
    this._scrollContainer.classList.add("no-scroll");

    this._observer.unobserve(this._slot1);
    this._observer.unobserve(this._slot2);
    this._observer.unobserve(this._slot3);

    // emit event
    // if (isPrevious) {
    //   this.raisePreviousEvent({ newCurrent: newCurrentSlot });
    // } else {
    //   this.raiseNextEvent({ newCurrent: newCurrentSlot });
    // }

    switch (newCurrentSlot) {
      case 1:
        setTimeout(() => {
          // emit event
          if (isPrevious) {
            this.raisePreviousEvent({ newCurrent: newCurrentSlot });
          } else {
            this.raiseNextEvent({ newCurrent: newCurrentSlot });
          }

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
          } else {
            this._scrollContainer.scrollLeft = this._slot3.clientWidth;
          }

          // this._observer.observe(this._slot1);
          this._observer.observe(this._slot2);
          this._observer.observe(this._slot3);

          this._lockScroll = false;
          this._scrollContainer.classList.remove("no-scroll");
        }, DEBOUNCE_TIMEOUT);
        break;
      case 2:
        setTimeout(() => {
          // emit event
          if (isPrevious) {
            this.raisePreviousEvent({ newCurrent: newCurrentSlot });
          } else {
            this.raiseNextEvent({ newCurrent: newCurrentSlot });
          }

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
          } else {
            this._scrollContainer.scrollLeft = this._slot1.clientWidth;
          }

          this._observer.observe(this._slot1);
          // this._observer.observe(this._slot2);
          this._observer.observe(this._slot3);

          this._lockScroll = false;
          this._scrollContainer.classList.remove("no-scroll");
        }, DEBOUNCE_TIMEOUT);
        break;
      case 3:
        setTimeout(() => {
          // emit event
          if (isPrevious) {
            this.raisePreviousEvent({ newCurrent: newCurrentSlot });
          } else {
            this.raiseNextEvent({ newCurrent: newCurrentSlot });
          }

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
          } else {
            this._scrollContainer.scrollLeft = this._slot2.clientWidth;
          }

          this._observer.observe(this._slot1);
          this._observer.observe(this._slot2);
          // this._observer.observe(this._slot3);

          this._lockScroll = false;
          this._scrollContainer.classList.remove("no-scroll");
        }, DEBOUNCE_TIMEOUT);
        break;
      default:
        throw `newCurrentSlot has bad value: ${newCurrentSlot}`;
    }
  }
}

customElements.define("infinite-carousel-wc", InfiniteCarouselWc);
