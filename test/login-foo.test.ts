import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { LoginFoo } from '../src/LoginFoo.js';
import '../src/login-foo.js';

describe('LoginFoo', () => {
    let element:any;
  
    beforeEach(async () => {
      element = await fixture(html`<login-foo></login-foo>`);
    });
  
    it('should render the login form initially', () => {
      const form = element.shadowRoot.querySelector('form');
      expect(form).to.exist;
  
      const usernameInput = form.querySelector('#username');
      const emailInput = form.querySelector('#email');
      expect(usernameInput).to.exist;
      expect(emailInput).to.exist;
  
      const button = form.querySelector('button');
      expect(button.textContent).to.equal('Login');
    });
  
    it('should log in the user and show user details on form submit', async () => {
      const form = element.shadowRoot.querySelector('form');
      const usernameInput = form.querySelector('#username');
      const emailInput = form.querySelector('#email');
      const passwordInput = form.querySelector('#password');
      const loginButton = element.shadowRoot.querySelector('.login-btn');
  
      usernameInput.value = 'JohnDoe';
      emailInput.value = 'john.doe@example.com';
      passwordInput.value = 'admin123';
  
      loginButton.click();
      form.dispatchEvent(new Event('submit'));
  
      await element.updateComplete;
  
      const userDetails = element.shadowRoot.querySelector('.user-details');
      expect(userDetails).to.exist;
      expect(userDetails.querySelector('p').textContent).to.include('JohnDoe');
      expect(userDetails.querySelector('p + p').textContent).to.include('john.doe@example.com');
    });
  
    it('should log out the user and show the login form again', async () => {
      // Simulate logging in first
      element.user = { name: 'John Doe', email: 'john.doe@example.com' };
      element.loggedIn = true;
      await element.updateComplete;
  
      const logoutButton = element.shadowRoot.querySelector('.logout-btn');
      expect(logoutButton).to.exist;
      logoutButton.click();
  
      await element.updateComplete;
  
      const form = element.shadowRoot.querySelector('form');
      expect(form).to.exist;
    });
  });