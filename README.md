# soconnect-module-template
This scaffolding tool is a combination of [ngx-library-template](https://github.com/edriang/ngx-library-template), [generator-angular2-library](https://github.com/jvandemo/generator-angular2-library) and plus customization that is relevant to soConnect property to generate scoped(@physicalweb) shared modules(components, services & etc.) to be published to our private npm registry.  This will enable code reuseability and avoid code duplication and at the same time streamline development cycle.

## Steps to use this template project to build libraries

1.  Run the following command to scaffold your new module.

    ```bash
    $ npm run lib-gen --libname=soconnect-search
    ```

2.  What step one did was to **Replace** all module related text references in files with `your-own-package-name` aka as `@physicalweb/soconnect-search` in this case and at the same time rename the boilerplate component and service files with new module name.  Here are a subset of the files it touches:  For more detail please see `bin/lib-generator.js`
    - README.md
    - package.json
    - .angular-cli.json
    - src/app/app.module.ts
    - src/lib/package.json
    - src/lib/tsconfig.es5.json
    - src/tsconfig.app.json
    
3.  cd into your new module directory and **Run** npm install

    ```bash
    $ npm install
    ```

4.  **Update** the README with details describing the new library about to create

5.  **Read** development notes and build/run notes below


### References:

This project was built using [angular-cli](https://cli.angular.io/) scaffolding and [generator-angular2-library](https://github.com/jvandemo/generator-angular2-library) rollup-build system


********************************************************************************
**NOTE:** REMOVE ABOVE DOC BEFORE PUBLISHING YOUR OWN LIBRARY...
********************************************************************************



## Description

A scaffolding utility to help streamline @physicalweb share module construction and development


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