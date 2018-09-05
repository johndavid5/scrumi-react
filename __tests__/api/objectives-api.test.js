import { config } from '../../src/config'
import { logajohn } from '../../src/lib/logajohn'

import { Express } from '../../jest-express/lib/express';
import { server } from '../../src/server/app.js';
import { get } from '../../src/server/app.js';

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`dbmodels.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)


let app;

describe('Server', () => {
  beforeEach(() => {
    app = new Express();
  });

  afterEach(() => {
    app.resetMocked();
  });

  test('should setup server', () => {
    const options = {
      port: 3000,
    };

    server(app, options);

    expect(app.set).toBeCalledWith('port', options.port);
  });

});
