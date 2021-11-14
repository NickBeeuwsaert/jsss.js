const S = Symbol();
const has = () => true;
const style = document.createElement("style");
document.head.appendChild(style);

const selector = (target, selectorName) => {
  const proxy = new Proxy(target, {
    has,
    set: (target, prop, value) => {
      if (typeof prop === "symbol") return false;
      console.log(selectorName);
      target.insertRule(
        `${selectorName} { ${prop
          .replace(/[A-Z]+/g, "-$&")
          .toLowerCase()}: ${value} }`
      );
      return true;
    },
    get: (target, v) => {
      if (v === S) return selectorName;
      return null;
    },
  });
  return proxy;
};
const tagSelector = selector;
const classSelector = (target, className) =>
  new Proxy(target, {
    has,
    get: (target, tagName) => {
      if (typeof tagName === "symbol") return;
      if (tagName === "all") tagName = "*";
      return selector(target, `${tagName}.${className}`);
    },
  });
const idSelector = (target, idName) => selector(target, `#${idName}`);
export const tags = new Proxy(style.sheet, {
  has,
  get: tagSelector,
});
export const ids = new Proxy(style.sheet, {
  has,
  get: idSelector,
});
export const classes = new Proxy(style.sheet, {
  has,
  get: classSelector,
});
export const contextual = (...selectors) =>
  selector(style.sheet, selectors.map((selector) => selector[S]).join(" "));
