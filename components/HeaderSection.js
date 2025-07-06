import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

class HeaderSection extends LitElement {
  static styles = css`
    .flex-center {
      display: flex;
      justify-content: center;
    }

    .matnshoro {
      background-color: #02b4f491;
      width: 500px;
      border-radius: 0px 0px 10px 10px;
      color: white;
      font-size: 18px;
    }
  `;

  static properties = {
    title: { type: String },
  };

  constructor() {
    super();
    this.title = "Somebody";
  }

  render() {
    return html`
      <div class="flex-center">
        <div class="matnshoro flex-center">${this.title}</div>
      </div>
    `;
  }
}

customElements.define("header-section", HeaderSection);
