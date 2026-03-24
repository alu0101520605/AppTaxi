class Header extends HTMLElement {
  connectedCallback() {
    fetch('/components/header.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;
      });
  }
}

class Footer extends HTMLElement {
  connectedCallback() {
    fetch('/components/footer.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;
      });
  }
}

customElements.define('header-taxi', Header);
customElements.define('footer-taxi', Footer);