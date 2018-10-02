import { json } from 'body-parser';
import { Request, Response } from 'express';
import { ServerLoader, ServerSettings } from '@tsed/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import '@tsed/multipartfiles';

const Path = require('path');
const rootDir = Path.resolve(__dirname);

const packageJson = require(`${process.cwd()}/package.json`);

@ServerSettings({
  rootDir,
  version: packageJson.version,
  httpPort: 5858,
  httpsPort: 5858,
  debug: false,
  mount: { '/northwind_api': `${rootDir}/controllers/**/*.ts` },
  swagger: {
    path: '/api-docs'
  },
})
export class ExpressServerLoader extends ServerLoader {

  $onMountingMiddlewares = (): void => {
    this.use(json())
      .use(cookieParser())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(function(req: Request, res: Response, next: any) {
        //  res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('cache-control', 'no-store, no-cache');
        next();
      });
    this.expressApp.disable('x-powered-by');
  };

  $onInit = (): void => {};

  $onReady = (): void => {};

}

const server = new ExpressServerLoader();
server.start();
