class Wrapper {
  constructor(element, text, display = true) {
    this.element = document.createElement(element);
    this.element.innerHTML = text;
    this.display = !display;
    this.toggleDisplay();
  }
  click(val) {
    this.element.addEventListener("click", () => val());
    return this;
  }
  showSelectable() {
    this.element.style.cursor = "pointer";
    return this;
  }
  addClass(className) {
    this.element.classList.add(className);
    return this;
  }
  toggleDisplay() {
    this.display = !this.display;
    this.element.style.display = this.display ? "" : "none";
    return this;
  }
  appendChild(child) {
    this.element.appendChild(child.element);
    return this;
  }
  createChild(element, text, display = true) {
    var wrapper = new Wrapper(element, text, display);
    this.appendChild(wrapper);
    return this;
  }
  static generate(element, text, display = true) {
    return new Wrapper(element, text, display);
  }
}

class AnchorWrapper extends Wrapper {
  constructor(href, text, target = "_blank") {
    super("a", text);
    this.element.href = href;
    this.element.target = target;
  }
  static generate(href, text, target = "_blank") {
    return new AnchorWrapper(href, text, target);
  }
}

const renderPost = (post, user) => {
    const bodyDiv = Wrapper.generate("div", "", false)
        .createChild("div", post.body).addClass("post-body")
            .appendChild(Wrapper.generate("span", user.username).addClass("tooltip")
            .appendChild(Wrapper.generate("span", `${user.name} `)
            .appendChild(AnchorWrapper.generate(`mailto:${user.email}`, user.email))
            .addClass("tooltiptext")));
    const footerDiv = Wrapper.generate("div", `Posted on ${new Date(post.date).toDateString()}`)
  return Wrapper.generate("div", "")
    .addClass("post")
    .appendChild(Wrapper.generate("h1", `${user.username} &mdash; ${post.title}`)
      .showSelectable()
      .click(() => bodyDiv.toggleDisplay()))
    .appendChild(bodyDiv)
    .appendChild(footerDiv)
    .element;
};

const get = (model, domain, done) => {
  fetch(`https://jsonplaceholder.typicode.com/${domain}`)
    .then(response => response.json())
    .then(json => {
      model[domain] = json;
      done();
    });
};

const app = document.getElementById("app");

const renderHeader = () => {
    return Wrapper.generate("div", "").addClass("header")
            .appendChild(Wrapper.generate("span", "< Ale Zapiola >"))
            .appendChild(Wrapper.generate("span", "").addClass("menu")
            .appendChild(AnchorWrapper.generate("/", 'Home', "_self"))
            .appendChild(AnchorWrapper.generate("/", 'About', "_self")))
            .element
}

const run = (model) => get(model, "users", () => {
    const title = Wrapper.generate("h1", "Articulos", true).element;
    return get(model, "posts",
        () => {
            model.users.forEach(user => model.userIdx[user.id] = user);
            app.innerText = '';
            app.appendChild(renderHeader());
            app.appendChild(title);
            model.posts.forEach(post =>
                app.appendChild(renderPost(post, model.userIdx[post.userId]))
            );
        }
    )
});

export function setupBlog(element) {
    element.innerHTML = "Articulos";
    element.addEventListener('click', () => run({
        userIdx: {}
    }));
}
