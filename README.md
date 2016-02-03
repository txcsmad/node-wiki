# node-wiki

Simple editable Markdown wiki built with node using `fs`

![](http://i.imgur.com/vQXtP6O.png)

## Usage

- Click on a link to view the page
- Hit the `Edit` button to update or delete pages
- Create new pages by visiting `/view/YOUR NEW PAGE TITLE`

## Setup

Clone this repo and `cd` into the cloned directory

```
$ git clone git@github.com:utcsmad/node-wiki.git
$ cd node-wiki
```

Install dependencies

```
$ npm i
```

Start the local server

```
$ gulp start
```

That's it! Visit `http://localhost:8080` in your browser. The gulp task will automatically restart your app when you edit files.

## Tech

- Node.js
- Handlebars
- Markdown
- BassCSS

## Improvements

- [ ] Add alternate ways to create new pages
- [ ] Use a database instead of the raw filesytem to store page data
- [ ] Improve security
- [ ] Add last edited timestamps for pages

## License

[MIT](https://github.com/utcsmad/node-wiki/blob/complete/LICENSE)
