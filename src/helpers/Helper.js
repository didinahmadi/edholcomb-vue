export default class Helper {
    /**
     * @param {*} o
     * @param {*} p
     * @param {*} defaultVal
     */
    static optional = (o, p, defaultVal) => {
      let _def = typeof defaultVal !== "undefined" ? defaultVal : "-";
      return p.split(".").reduce((xs, x) => {
        return xs && xs[x] ? xs[x] : _def;
      }, o);
    };
  }