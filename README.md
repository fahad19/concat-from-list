#  [![Build Status](https://secure.travis-ci.org/fahad19/concat-from-list.png?branch=master)](http://travis-ci.org/fahad19/concat-from-list)

> Concatenate files listed in JSON/CSON file.


## Install

```sh
$ npm install -g concat-from-list
```

## Usage

You can first store a list of all files you want to be concatenated in `app.json` for example:

```json
[
  "a.js",
  "dir/b.js",
  "./dir/c.js",
  "../bower_components/jquery/jquery.js"
]
```

Paths are relative to the directory the JSON file is stored in.

Now you can run this command to concatenate all the files listed in your JSON file:

```
$ concat-from-list app.json dist/app.js
```

If you wish not to install the module globally, you can do this:

```
$ npm install --save-dev concat-from-list
$ ./node_modules/.bin/concat-from-list path/to/app.json dist/app.js
```

## License

MIT © [Fahad Ibnay Heylaal](http://fahad19.com)
