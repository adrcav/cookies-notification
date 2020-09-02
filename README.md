# 🍪 CookiesNotification

<blockquote>A simple and small cookies consent notification.</blockquote>

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

Here's an example of a basic implementation with default options:

```javascript
const cookies = new CookiesNotification({
  container: document.body,
  message: 'We use cookies and others technologies to make interactions with our services easy and meaningful. By continuing to use this site you are giving us your consent to do this.',
  confirmButton: 'Got it',
  showCancelButton: false,
  cancelButton: 'Decline',
  position: 'left',
  borderColor: '#333333',
  remember: 365
});
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
