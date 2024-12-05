import { css, html, shadow } from "@calpoly/mustang";

export class LoginForm extends HTMLElement {
  static template = html`<template>
    <form onsubmit="false;">
      <slot name="title">
        <h3>Sign in with Username and Password</h3>
      </slot>
      <label>
        <span>
          <slot name="username">Username</slot>
        </span>
        <input name="username" autocomplete="off" />
      </label>
      <label>
        <span>
          <slot name="password">Password</slot>
        </span>
        <input type="password" name="password" />
      </label>
      <slot name="submit">
        <button type="submit">Sign In</button>
      </slot>
    </form>
  </template>`;

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }

    body {
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .login-container {
      text-align: center;
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      width: 100%;
    }

    h3 {
      font-size: 1.8rem;
      color: #333333;
      margin-bottom: 1.5rem;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    label {
      margin-bottom: 1rem;
      width: 100%;
      text-align: left;
      color: #666666;
      font-size: 1rem;
    }

    label span {
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      display: inline-block;
      padding: 0.8rem 2rem;
      font-size: 1.1rem;
      color: #ffffff;
      background-color: #1b2f4f;
      border: none;
      border-radius: 4px;
      text-decoration: none;
      transition: background-color 0.3s;
      cursor: pointer;
    }

    button:hover {
      background-color: #163a6b;
    }

    p.register {
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: #333333;
    }

    p.register a {
      color: #1b2f4f;
      text-decoration: none;
      font-weight: bold;
    }

    p.register a:hover {
      text-decoration: underline;
    }
  `;

  get form() {
    return this.shadowRoot.querySelector("form");
  }

  constructor() {
    super();

    shadow(this).template(LoginForm.template).styles(LoginForm.styles);

    this.form.addEventListener("submit", (event) =>
      submitLoginForm(
        event,
        this.getAttribute("api"),
        this.getAttribute("redirect") || "/"
      )
    );
  }
}

function submitLoginForm(event, endpoint, redirect) {
  event.preventDefault();
  const form = event.target.closest("form");
  const data = new FormData(form);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify(Object.fromEntries(data));

  console.log("POST login request:", body);

  fetch(endpoint, { method, headers, body })
    .then((res) => {
      if (res.status !== 200)
        throw `Form submission failed: Status ${res.status}`;
      return res.json();
    })
    .then((payload) => {
      const { token } = payload;

      form.dispatchEvent(
        new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect }],
        })
      );
    })
    .catch((err) => console.log("Error submitting form:", err));
}
