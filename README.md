# vue-calendar

> A fully customizable versatile calendar with events support

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

This project is __still in development__ so api and features might change.


## Installation

Download the project using your favourite package manager:

```
npm i @codekraft-studio/vue-calendar
yarn add @codekraft-studio/vue-calendar
```

Import it in your project and install it in your application:

```js
import Vue from 'vue'

// component and styles
import '@codekraft-studio/vue-calendar/dist/VueCalendar.css'
import VueCalendar from '@codekraft-studio/vue-calendar'

Vue.use(VueCalendar, options)
```

It's all ready, you can use the `<VueCalendar />` component.

```html
<body id="app">
  <VueCalendar />
</body>
```

---

## Customization

The calendar is very flexible and allow for sections customization using named slots or full section replacements.

For example if you want to place a image above the calendar header you can do it like this:

```html
<VueCalendar>
  <div slot="header-top">
    <img src="path/to/img" />
  </div>
</VueCalendar>
```

If you use the section name as the slot name, it will fully replace the section letting you fully customize the output:

```html
<VueCalendar>
  <div slot="header" slot-scope="slotProps">
    <div class="my-header-top"></div>
    <div class="my-header-content">
      <!-- your custom toolbar -->
    </div>
    <div class="my-header-bottom"></div>
  </div>
</VueCalendar>
```

Right now you can only customize the calendar header and footer, below the list of the slot names:

#### header

The header is where the calendar toolbar is usually located, it exposes two child slots for upper and lower content placement.

* header-top
* header-bottom

#### footer

The footer is usually used to put arbitrary text, it exposes two child slots for upper and lower content placement.

* footer-top
* footer-bottom

---

## Methods

The calendar is built on top of momentjs so it's very easy to control the dates and the calendar itself exposes few methods to change the date view and move around the calendar:

#### __prev(unit, len=1)__

Change the date to the next __unit__ updating the calendar. By default it will add or remove only one unit, the second parameter is to choose how far to move previous.

```js
this.$refs.Calendar.prev('m')
this.$refs.Calendar.prev('month', 2)
```

#### __next(unit, len=1)__

Change the date to the next __unit__ updating the calendar. By default it will add or remove only one unit, the second parameter is to choose how far to move next.

```js
this.$refs.Calendar.next('y')
this.$refs.Calendar.next('year', 2)
```

#### __setDate(date)__

This method update the calendar current date, it will trigger a calendar view change if the date is not inside the current sliced view, it accepts what momentjs accepts as a valid date, so a string, object and more.. checkout [momentjs]() documentation to know more about it.

```js
this.$refs.Calendar.setDate() // default to now
this.$refs.Calendar.setDate(new Date())
this.$refs.Calendar.setDate('tomorrow')
this.$refs.Calendar.setDate('09-08-2018')
this.$refs.Calendar.setDate('09-08-2018', 'MM-DD-YYYY')
this.$refs.Calendar.setDate('09/08/2018', 'MM/DD/YYYY')
```

The arguments are forwarded to momentjs [parse](https://momentjs.com/docs/#/parsing/string-format/) function, checkout all the valid formats.

---

## Development

Clone the project repository and install all the dependencies than start the vuecli development server:

```
npm install
npm run serve
```

---

## License

This package is under the [MIT License](LICENSE).

[npm-image]: https://badge.fury.io/js/%40codekraft-studio%2Fvue-calendar.svg
[npm-url]: https://npmjs.org/package/@codekraft-studio/vue-calendar
[daviddm-image]: https://david-dm.org/codekraft-studio/vue-calendar.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/codekraft-studio/vue-calendar
