((self, OClassConfig) => {
  if (self.OClass) return;

  /**
   *
   * @param {CSSStyleSheet} sheet
   * @param {string} rule
   */
  const addRule = (sheet, cssText) =>
    sheet.insertRule(cssText, sheet.cssRules.length);

  /**
   *
   * @param {*} media
   * @param {*} sizes
   * @param {{selectorText:string,cssText:string}} rule
   */
  const addMedia = (media, sizes, { selectorText, cssText }) => {
    for (let size in sizes) {
      media[size] = media[size] || "";
      media[size] +=
        selectorText + `\\:` + size + cssText.replace(selectorText, "");
    }
  };

  /**
   *
   * @param {HTMLStyleElement} target
   * @param {Object<string,Object<string,string>>} theme
   */
  function OClass({ sheet }, options) {
    const { prefix = "", ...config } = {
      ...OClass.config,
      ...options,
    };

    const { cssRules } = sheet;

    const media = {};

    let cssProps = "";

    for (let i = 0; i < cssRules.length; i++) {
      const rule = cssRules[i];

      if (!(rule instanceof CSSStyleRule)) continue;

      const { selectorText, cssText } = rule;

      const test = selectorText.match(/\.(--([\w]+))$/);

      if (test) {
        const [, id, option] = test;
        if (!config[option]) continue;

        for (let prop in config[option]) {
          const cssProp = `--${prefix}${option}-${prop}`;
          cssProps += `${cssProp}: ${config[option][prop]};\n`;
          addRule(
            sheet,
            selectorText.replace(id, prop) +
              cssText
                .replace(selectorText, "")
                .replace(RegExp(id, "g"), cssProp)
          );
        }
      } else {
        addMedia(media, config.media, rule);
      }
    }
    for (let size in media) {
      addRule(sheet, `@media ${config.media[size]}{${media[size]}}`);
    }

    addRule(sheet, `:host,:root{${cssProps}}`);
  }

  OClass.config = OClassConfig;

  self.OClass = OClass;
})(self, self.OClassConfig);
