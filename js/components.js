class Header extends HTMLElement {
  connectedCallback() {
    fetch('/components/header.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;

        // Definir aria de la página actual
        const currentUrl = window.location.href.split('#')[0].split('?')[0]; 
        const navLinks = this.querySelectorAll('a'); 

        navLinks.forEach(link => {
            if (link.href.split('#')[0].split('?')[0] === currentUrl) {
                link.setAttribute('aria-current', 'page');
            }
        });
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