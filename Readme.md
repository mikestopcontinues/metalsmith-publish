# metalsmith-publish

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin that adds support for draft, private, and future-dated posts. Enables you to do multiple builds for production and development. Gives you a callback so you can automate rebuilding metalsmith with a cron job or node script when future-dated posts become published.

## Features

  - works via `publish` metadata
  - building draft, private, and future-dated posts enabled independently
  - callback serving future-dated posts so you can automate rebuild

## Installation

    $ npm install metalsmith-publish

## Usage

### Draft

Set post publish state via metadata:

```markdown
---
title: My Article
publish: draft
---
```

Include in build via config:

```js
var publish = require('metalsmith-publish');

metalsmith.use(publish({
  draft: true
}));
```

### Private

Set post publish state via metadata:

```markdown
---
title: My Article
publish: private
---
```

Include in build via config:

```js
var publish = require('metalsmith-publish');

metalsmith.use(publish({
  private: true
}));
```

### Unlisted

Removes the `collection` metadata, useful for publishing internally wihtout adding it to your posts lists or RSS feeds.

```markdown
---
title: My Article
publish: unlisted
collection: blog
---
```

Include in build via config:

```js
var publish = require('metalsmith-publish');

metalsmith.use(publish({
  unlisted: true
}));
```

### Future-dated

Set post publish state via metadata:

```markdown
---
title: My Article
publish: 2021-12-21
---
```

Include in build via config:

```js
var publish = require('metalsmith-publish');

metalsmith.use(publish({
  future: true
}));
```

Specify field to use for date when `publish` unspecified (default: 'date'):

```js
var publish = require('metalsmith-publish');

metalsmith.use(publish({
  futureMeta: 'date'
}));
```

Or pass callback to automate rebuild:

```js
metalsmith.use(publish({
  futureFn: function (futureFiles, metalsmith, done) {
    Object.keys(futureFiles).forEach(function (file) {
      console.log('rebuild ' + file + ' @ ' new Date(futureFiles[file].publish).toTime());
    });
    done();
  }
}));
```

## CLI Usage

All of the same options apply, just add them to the `"plugins"` key in your `metalsmith.json` configuration:

```json
{
  "plugins": {
    "metalsmith-publish": {
      "articles": {
        "draft": false,
        "private": false,
        "future": false,
        "futureFn": "console.log('Callback script passed (futureFiles, metalsmith, done). E.g. futureFiles = ' + Object.keys(futureFiles).join(', ')); done();"
      }
    }
  }
}
```

## License

  MIT
