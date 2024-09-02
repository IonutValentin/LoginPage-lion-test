import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import '@lion/ui/define/lion-input.js';
import '@lion/ui/define/lion-input-email.js';
import '@lion/ui/define/lion-form.js';
import { MinLength, MaxLength, IsEmail } from '@lion/ui/form-core.js';


export class LoginFoo extends LitElement {

  static styles = css`
    .container {
      max-width: 300px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .input-group {
      margin-bottom: 15px;
    }
    .input-group label {
      display: block;
      margin-bottom: 5px;
    }
    .input-group input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
    .error {
      color: red;
      display: none;
    }
    .error.isVisible {
      display: block;
    }
    .user-details {
      margin-top: 20px;
    }
    .logout-btn {
      background-color: #f44336;
    }
    .logout-btn:hover {
      background-color: #e53935;
    }
  `;


  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loggedIn = false;
  @property({ type: Object }) user = {name:'',email:''};

  _onClick() {
    this.active = !this.active;
  }

  login(event:any) {
    event.preventDefault();

    const form = event.target.parentElement;
    const usernameInput = form.querySelector('#username').value;
    const emailInput = form.querySelector('#email').value;
    const passwordInput = form.querySelector('#password').value;

    if(usernameInput.trim() == '' || passwordInput.trim() == '' || emailInput.trim() == '') return false;

    const formData = new FormData(form);
    this.user.name = formData.get('username') as string;
    this.user.email = formData.get('email') as string;
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
    this.user = { name: '', email: '' };
  }

  render() {
    return html`
      <div class="container">
        ${this.loggedIn ? this.renderUserDetails() : this.renderLoginForm()}
      </div>
    `;
  }

  renderLoginForm() {
    return html`
    <lion-form>
      <form id="ing-login">
        <div class="input-group">
          <lion-input .validators="${[new MaxLength(16, { getMessage: () => 'Maximum 10 chars please...' })]}" label="Username" id="username" name="username" required></lion-input>
        </div>
        <div class="input-group">
          <lion-input-email .validators="${[new IsEmail(5, { getMessage: () => 'Please enter a valid email address...' })]}" label="Email" id="email" name="email" required></lion-input-email>
        </div>
        <div class="input-group">
          <lion-input .validators="${[new MinLength(7, { getMessage: () => 'Minimum 7 chars please...' })]}" type="password" label="Password" id="password" name="password" required></lion-input>
        </div>

        <button class="login-btn" type="submit" @click=${this.login}>Login</button>
      </form>
    </lion-form>
    `;
  }

  renderUserDetails() {
    return html`
      <div class="user-details">
        <p><strong>Name:</strong> ${this.user.name}</p>
        <p><strong>Email:</strong> ${this.user.email}</p>
        <button class="logout-btn" @click=${this.logout}>Logout</button>
      </div>
    `;
  }
}


