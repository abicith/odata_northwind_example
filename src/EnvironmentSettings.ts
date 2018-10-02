const os = require('os');

export class EnvironmentSettings {
  private static instance: EnvironmentSettings;
  private settings: any;

  private constructor() {
    this.settings = this.loadSettings();
  }

  static getInstance = (): EnvironmentSettings => {
    if (!EnvironmentSettings.instance) {
      EnvironmentSettings.instance = new EnvironmentSettings();
    }
    return EnvironmentSettings.instance;
  };

  private loadSettings = (): void => {
    
    switch (process.env.NODE_ENV) {
      case 'local':
        return require('./settings_local.json');

      case 'dev':
        return require('./settings_dev.json');

      case 'prod':
        return require('./settings_prod.json');

      default:
        return require('./settings.json');
    }
  };

  public getSettings = (): any => {
    return this.settings;
  };
}
