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

- `open`
  - Add this attribute to open the drawer.
    - Example: `<infinite-carousel-wc open></infinite-carousel-wc>`
  - Set the property in Javascript to imperatively toggle the drawer
    - Example: `drawer.open = true`

### Events

- `open`
  - Raised when the drawer is opened.
  - Example: `drawer.addEventListener("open", handleOpen())`
  - When subscribing in html listen for `onopen`
    - Ex: `<infinite-carousel-wc onopen="handleOpen()">`
- `close`
  -Raised when the drawer is closed.
  - Example: `drawer.addEventListener("close", handleClose())`
  - When subscribing in html listen for `onclose`
    - Ex: `<infinite-carousel-wc onclose="handleClose()">`

### Styling

You can style the infinite-carousel-wc element as you would any regular element, in CSS. A list of supported CSS properties are below, along with the default values.

```css
infinite-carousel-wc {
  background-color: #ffffff;
  color: inherit;
  width: 350px;
  max-width: 75vw;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
```

You can customize the overlay that appears to the right of the drawer (when it's open) by setting one of the following CSS variables.

- `--infinite-carousel-wc-overlay-transition`
  - Sets the transition
  - Default is `opacity 0.25s ease-in-out 0.25s`
- `--infinite-carousel-wc-overlay-opacity`
  - Sets the opacity of the overlay
  - Default is `0.7`

## Contribute

This project is built with standard HTML/CSS/TS, no frameworks or special web-component compilers here (for maximum simplicity and minimum size). If you want to learn more about writing custom elements see [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) or [this web fundamentals page](https://developers.google.com/web/fundamentals/web-components/).

```bash
npm install
npm start
```

This will start a live-server on port localhost:8080. Any changes you make to files in lib/ or any changes to example/index.html should get live reloaded.
