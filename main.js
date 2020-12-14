const createElement = (tagName, { attrs = {}, children = [] } = {}) => {
  const vElem = Object.create(null);

  Object.assign(vElem, {
    tagName,
    attrs,
    children,
  });

  return vElem;
};

const renderElem = ({ tagName, attrs, children }) => {
  // create the element
  //   e.g. <div></div>
  const $el = document.createElement(tagName);

  // add all attributs as specified in vNode.attrs
  //   e.g. <div id="app"></div>
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v);
  }

  // append all children as specified in vNode.children
  //   e.g. <div id="app"><img></div>
  for (const child of children) {
    $el.appendChild(render(child));
  }

  return $el;
};

const render = (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  // we assume everything else to be a virtual element
  return renderElem(vNode);
};

const mount = ($node, $target) => {
  $target.replaceWith($node);
  return $node;
};

/************************** APP **************************/
const vApp = createElement("div", {
  attrs: {
    id: "app",
  },
  children: [
    "Hello world",
    createElement("img", {
      attrs: {
        src:
          "https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png",
        width: 500,
      },
    }),
  ],
});

const $app = render(vApp);
mount($app, document.getElementById("app"));
