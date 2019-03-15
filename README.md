[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://www.webcomponents.org/element/infinite-carousel-wc)

# infinite-carousel-wc

A small, infinite carousel Web Component built with modern CSS and just a little Javascript

![infinite-carousel-wc demo](demo.gif)

## [Demo](https://infinite-carousel-wc.netlify.com/)

## Installation

You can integrate infinite-carousel-wc via `<script>` tag or via ES Modules.

### Via `<script>` tag

In the `<head>` of your index.html put a script tag like this:

```html
<script src="https://unpkg.com/infinite-carousel-wc/dist/infinite-carousel-wc.min.js"></script>
```

Now you can use the `infinite-carousel-wc` element anywhere in your html, JSX, template, etc.

### Via ES Modules

```bash
npm install infinite-carousel-wc --save
```

You can see an example of a React app consuming a web component [here](https://github.com/wes566/wc-menu-button#react-example).

## Polyfills

This custom element uses [CSS Scroll Snap](https://caniuse.com/#feat=css-snappoints), [IntersectionObserver](https://caniuse.com/#feat=intersectionobserver) and [Smooth Scrolling](https://caniuse.com/#feat=css-scroll-behavior). Browser support for Scroll Snap is pretty good (this custom element supports both v0 and v1 of the spec). There is a polyfill for [IntersectionObserver](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) and [Smooth Scrolling](https://github.com/iamdustan/smoothscroll).

## API and Customization

### Attributes/Properties

- `lock`
  - Add this attribute to prevent scrolling.
    - Example: `<infinite-carousel-wc lock></infinite-carousel-wc>`
  - Set the property in Javascript to imperatively disable scrolling
    - Example: `carousel.lock = true`

### Events

- `slot-order-changing`
  - Raised after the user has scrolled to the next or previous slot
  - Raised about 200ms before the user is allowed to scroll again
  - `event.detail` contains an `ISlotChangeEventDetails` object of the following shape:
    ```ts
    export interface ISlotChangeEventDetails {
      newCurrent: 1 | 2 | 3;
      direction: Direction;
    }
    ```
  - `Direction` is an enum telling you if the user swiped the next or previous pane into view.
  - Both `Direction` and `ISlotChangeEventDetails` are exported types that you can consume if you are writing your code in Typescript.
  - Example: `carousel.addEventListener("slot-order-changing", handleCarouselOrderChange())`
  - When subscribing in html listen for `onslot-order-changing`
    - Ex: `<infinite-carousel-wc onslot-order-changing="handleCarouselOrderChange()">`

### Styling

You can style the infinite-carousel-wc element as you would any regular element, in CSS. You can see [an example in index.html](./example/index.html#30).

## Contribute

This project is built with standard HTML/CSS/TS, no frameworks or special web-component compilers here (for maximum simplicity and minimum size). If you want to learn more about writing custom elements see [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) or [this web fundamentals page](https://developers.google.com/web/fundamentals/web-components/).

```bash
npm install
npm start
```

This will start a live-server on port localhost:8080. Any changes you make to files in lib/ or any changes to example/index.html should get live reloaded.
