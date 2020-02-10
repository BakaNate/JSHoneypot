export default class BakaLog {
  constructor(name) {
    console.log(`Instantiating BakaLogger on ${name}`);
    this._name = name;
  }

  static write(type, message) {
    console.log(`[${type}] | ${new Date().toISOString()} : ${message}`);
  }

  log(message) {
    BakaLog.write('LOG', `[${this._name}] | ${message}`);
  }

  debug(message) {
    BakaLog.write('DEBUG', `[${this._name}] | ${message}`);
  }

  info(message) {
    BakaLog.write('INFO', `[${this._name}] | ${message}`);
  }

  boot(message) {
    BakaLog.write('BOOT', `[${this._name}] | ${message}`);
  }

  warning(message) {
    BakaLog.write('WAR', `[${this._name}] | ${message}`);
  }

  error(message) {
    BakaLog.write('ERR', `[${this._name}] | ${message}`);
  }
}
