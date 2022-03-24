interface Media {
  [media: string]: string;
}

class OClass {
  static config = {
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
  };

  sheet: CSSStyleSheet;
  media: Media;

  constructor(target: HTMLStyleElement) {
    this.sheet = target.sheet;
    Object.assign(
      this,
      // @ts-ignore
      this.constructor.config,
      JSON.parse(target.dataset.config || "{}")
    );
    this.generate();
  }
  generate() {
    const { cssRules } = this.sheet;
    const media = {};
    let cssProps = "";

    for (let i = 0; i < cssRules.length; i++) {
      const rule = cssRules[i];

      if (!(rule instanceof CSSStyleRule)) continue;

      const { selectorText, cssText } = rule;

      const test = selectorText.match(/\.(--([\w]+))$/);

      if (test) {
        const [, prefix, option] = test;
        if (!this[option]) continue;
        for (let prop in this[option]) {
          const cssProp = `--${option}-${prop}`;
          cssProps += `${cssProp}: ${this[option][prop]};\n`;
          this.addRule(
            selectorText.replace(prefix, prop) +
              cssText
                .replace(selectorText, "")
                .replace(RegExp(prefix, "g"), cssProp)
          );
        }
      } else {
        this.addMedia(media, rule);
      }
    }
    for (let size in media) {
      this.addRule(`@media ${this.media[size]}{${media[size]}}`);
    }

    this.addRule(`:host,:root{${cssProps}}`);
  }
  addRule(cssText: string) {
    this.sheet.insertRule(cssText, this.sheet.cssRules.length);
  }
  /**
   * @param {{selectorText:string,cssText:string}} rule
   */
  addMedia(
    media: Media,
    { selectorText, cssText }: { selectorText: string; cssText: string }
  ) {
    for (let size in this.media) {
      media[size] = media[size] || "";
      media[size] +=
        selectorText + `\\:` + size + cssText.replace(selectorText, "");
    }
  }
}
