#! /usr/bin/env node
const path = require('path');
const Rx = require('rxjs/Rx');
require('rxjs-exec').patch(Rx.Observable);
const cp = require('child_process'),
  exec = cp.exec;
const fs = require('fs');
const jsonfile = require('jsonfile');
require('dotenv').config();
const getEmail = require('user-email');
let userEmail = '';
getEmail().then(email => {
  userEmail = email;
  console.log(userEmail);
});
const libName = process.env.npm_config_libname;

if(libName && libName.length > 0 && libName !== 'true') {
  if(fs.existsSync(libName)) {
    console.log(`${libName} already exists...`);
    process.exit();
  }
  console.log('generating files for ', libName);

  const pipeline = {
    init: () => {
      pipeline.copy();
    },
    copy: () => {
      console.log(__dirname);
      exec(`cp -r soconnect-module-template ${libName}`, (err, stdout, stderr) => {
        console.log(stdout);
        if(!err) {
          pipeline.renameFiles(libName)
          //pipeline.doTasks(libName);
        }
      });

    },
    doTasks: (name) => {
      const camelCase = pipeline.snakeToCamel(name, 'soconnect-');
      const dotCase = pipeline.snakeToDot(name, 'soconnect-');
      const classCase = pipeline.snakeToClass(name, 'soconnect-');

      pipeline.findAndReplace(name,
        [
          'ngx-library-template',
          'lib-demo',
          'LibDemoComponent',
          'LibModule',
          'demo.component',
          'demo.service',
          'DemoComponent',
          'libDemoService',
          'LibDemoService',
          'dist-lib',
          'dist-demo'
        ], [
          name,
          name,
          `${classCase}Component`,
          `${classCase}Module`,
          `${dotCase}.component`,
          `${dotCase}.service`,
          `${classCase}Component`,
          `${camelCase}Service`,
          `${classCase}Service`,
          'dist',
          'demo'
        ])
        .subscribe((fobj) => {
          //console.log('write', fobj)
        })
        //pipeline.findAndReplace(name, 'LibDemoComponent', pipeline.snakeToCamel(name.replace(/soconnect-/, ''))+'Component'),
        //pipeline.findAndReplace(name, 'lib-demo', name),
        //pipeline.renameFiles(name)
    },
    findAndReplace: (name, searchString, replaceString) => {
      const readFile$ = Rx.Observable.bindNodeCallback(fs.readFile);
      const writeFile$ = Rx.Observable.bindNodeCallback(fs.writeFile);
      let grepString = searchString.join('\\|');
      let grep = `grep -r "${grepString}" ${name}`;

      console.log(grepString);

      const grep$ = Rx.Observable.exec(grep)
        .map((output) => {
          let res = output.split('\n');
          let dedup = {};
          return res.map((r, idx) => {
              if(r.length > 0) {
                //console.log('index', r.split(':')[0])
                return r.split(':')[0];
              } else {
                return '';
              }
            })
            .filter((file) => {
              if(file.length > 0) {
                if(!dedup[file]) {
                  dedup[file] = file;
                  return true;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            })
        });
      const files$ = grep$
        .map((fobj) => {
          //console.log('fobj', fobj)
          return fobj.map((file) => {
            return {data: readFile$(file), name: file}
          })
        })

      return grep$
        .zip(files$, (files, fData) => {
          //console.log('fData', fData);
          return ({fData});
        })
        .map((file) => {
          let regex, result;
          //console.log('file', file)
          return file.fData.map((obj) => {
            obj.data.subscribe((data) => {
              result = data;
              searchString.map((s, idx) => {
                regex = new RegExp(`\\b${s}\\b`, 'g');
                //console.log('data', s, result)
                result = result.toString().replace(regex, replaceString[idx]);
                if(s.indexOf('package.json') > 0) {
                  result = result.replace(`"author": ""`, `"author": "${userEmail}"`);
                }
              });
              //console.log('name', obj.name)
              return writeFile$(obj.name, result)
                .subscribe({
                  next: () => console.log(`updated ${obj.name} successfully...`),
                  error: () => console.log(`update ${obj.name} failed...`)
                })
            })
          });
        })
    },
    snakeToCamel: (s, omit = '') => {
      return s.replace(omit, '').replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
    },
    snakeToDot: (s, omit = '') => {
      return s.replace(omit, '').replace(/(\-)/g, '.');
    },
    snakeToClass: (s, omit = '') => {
      let str = s.replace(omit, '').replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    renameFiles: (name) => {
      let file, task$ = [];
      const find$ = Rx.Observable.exec(`find '${name}' -name demo.*.*`);
      const rename$ = (file, newFile) => Rx.Observable.exec(`mv ${file} ${newFile}`);

      find$
        .subscribe((stdout) => {
          let res = stdout.split('\n'),
            newName = pipeline.snakeToDot(name, 'soconnect-');
          res.map((r) => {
            if(r && r.length > 0) {
              file = r.replace(/demo\./, `${newName}.`);
              console.log('name: ', r, file, newName);
              task$.push(Rx.Observable.of(rename$(r, file)
                .subscribe({
                  next: () => console.log(`updated ${newName} successfully...`),
                  error: () => console.log(`update ${newName} failed...`)
                }))
              )
            }
          });
          Rx.Observable.combineLatest(...task$)
            .subscribe(() => {
              console.log('success')
              pipeline.doTasks(name)
            })
        })
    }
  };
  pipeline.init();
} else {
  console.log('please specify name for the new lib/module...');
}
