((self, oClassConfig) => {
  if (self.oClass) return;

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
   */
  function oClass({ sheet, dataset }) {
    const config = {
      ...oClass.config,
      ...JSON.parse(dataset.config || "{}"),
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
        const [, prefix, option] = test;
        if (!config[option]) continue;

        for (let prop in config[option]) {
          const cssProp = `--${option}-${prop}`;
          cssProps += `${cssProp}: ${config[option][prop]};\n`;
          addRule(
            sheet,
            selectorText.replace(prefix, prop) +
              cssText
                .replace(selectorText, "")
                .replace(RegExp(prefix, "g"), cssProp)
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

  oClass.config = oClassConfig;

  self.oClass = oClass;
})(
  self,
  self.oClassConfig || {
    cols: {
      2: 2,
      4: 4,
      6: 6,
      8: 8,
    },
    span: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
    },
    sizes: {
      1: "8px",
      2: "16px",
      3: "20px",
      4: "28px",
      5: "32px",
      6: "44px",
      7: "60px",
    },
    media: {
      xl: "(min-width: 1280px)",
      l: "(min-width: 1024px)",
      m: "(min-width: 768px)",
      s: "(min-width: 640px)",
    },
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
    content: {
      start: "start",
      end: "end",
      stretch: "stretch",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
      center: "center",
    },
    fit: {
      cover: "cover",
      contain: "contain",
    },
    dir: {
      col: "columns",
      row: "row",
    },
    textAlign: {
      left: "left",
      right: "right",
      center: "center",
    },
  }
);
