# 🦆 DuckMaps

This project i'm present for one of company on Malaysia that assign me a technical interview
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/50355424/190923428-db6f47f6-ec42-4b94-8d64-3dcf1d07ef26.png">

## 🚀&nbsp; Installation

1. Clone repository

```shell
$ git clone https://github.com/aangindra/duck-maps
```

2. Install packages

```shell
$ npm install
```

or

```shell
$ yarn
```

3. Add Environment Variables

```shell
REACT_APP_GOOGLE_MAPS_API_KEY=<YOUR GOOGLE MAPS API KEY>
REACT_APP_PLACE_API_URL="https://maps.googleapis.com/maps/api/place"
```

4. Run Application

```shell
$ npm start
```

or

```shell
$ yarn start
```

4. Deployment

```shell
$ npm run build
```

or

```shell
$ yarn build
```

Cheers!

## FAQ

**Question:** How to fix the CORS error like this?
![CORS_ERROR](https://user-images.githubusercontent.com/50355424/190922862-407431f9-a543-4cb4-8799-038429a3c8d5.jpeg)

**Answer:** This issue coming from Google API, because the Google API doesn't accept HTTP Request from localhost. Follow instructions below
and choose based on the operating system your'e using.

#### Windows

Copy and paste this on Command Prompt

```shell
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```

#### Mac OS

Copy and paste this on Terminal

```shell
open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security
```

### Linux

Copy and paste this on Terminal

```shell
google-chrome --disable-web-security
```
