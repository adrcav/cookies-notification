# 🍪 CookiesNotification
![jsdelivr hits](https://data.jsdelivr.com/v1/package/gh/adrcav/cookies-notification/badge)
[![Build Status](https://travis-ci.org/adrcav/cookies-notification.svg?branch=master)](https://travis-ci.org/adrcav/cookies-notification)
![Dependencies](https://david-dm.org/adrcav/cookies-notification.svg)
![License: MIT](https://img.shields.io/github/license/adrcav/cookies-notification)

<blockquote>A simple and lightweight cookies consent notification.</blockquote>

## Preview
![Preview](https://i.imgur.com/WmPSTpk.gif)

## Installation

You can use CookiesNotification from [CDN](https://cdn.jsdelivr.net/gh/adrcav/cookies-notification@latest/dist/) or [manual download](https://github.com/adrcav/cookies-notification/archive/master.zip). There are no dependencies, so you can import and just start.

```html
<!-- head -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrcav/cookies-notification@latest/dist/css/cookies-notification.min.css">

<!-- body -->
<script src="https://cdn.jsdelivr.net/gh/adrcav/cookies-notification@latest/dist/js/cookies-notification.min.js"></script>
```

If you have imported CookiesNotification via one of the above methods, you are ready to get started.

## Usage

Here's an example of a basic implementation:

```javascript
const cookies = new CookiesNotification();
```

You can also customize the notification, here's a default options:

```javascript
const options = {
  container: document.body,
  message: 'We use cookies and others technologies to make interactions with our services easy and meaningful. By continuing to use this site you are giving us your consent to do this.',
  confirmButton: 'Got it',
  showCancelButton: false,
  cancelButton: 'Decline',
  position: 'left',
  borderColor: '#333333',
  remember: 365
};

const cookies = new CookiesNotification(options);
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
