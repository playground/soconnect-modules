# soconnect-search

## Steps to use this template project to build your libraries

1.  cd into your new module directory and **Run** npm install

    ```bash
    $ npm install
    ```

2.  **Update** the README with details describing the new library about to create

3.  **Read** development notes and build/run notes below


## Description

A scaffolding utility to help streamline @twc share module construction and development


## Usage

The generated new module is already a functional working module with one component and one service.  You will be able to run a local demo app consuming your new module, unit test, build & etc.


## Run demo locally

```bash
$ npm run start
```

## Development notes

- Lib sources are under `src/lib`
- Demo sources are under `src/app`

**Important:** The sources to be packaged and compiled are the ones listed in `src/lib/index.ts` or any of its dependencies


To create `dist` bundle (dist of the lib app, to be published to npm registry) run:

```bash
$ npm run build-lib
```

To create `demo` bundle (dist of the demo app for demonstrating the compiled version of the demo app that is self contained and can run as a standalone app on any platform) run:

```bash
$ npm run build
```


To publish `cd dist` and `npm publish`


**Important:** this project uses two `package.json` files. One, in the root folder, is for defining dependencies to run and build the code and else dependencies used by the demo project. Dependencies of the lib must be configured under `src/lib/package.json` as well as info of the lib itself (name, version, etc)


## Documentation

The module is self documented.  Here are the available commands:

```
npm run docs:build
npm run docs:serve
npm run docs:watch
```