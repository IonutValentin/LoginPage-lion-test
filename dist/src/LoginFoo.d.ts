import { LitElement } from 'lit';
import '@lion/ui/define/lion-input.js';
import '@lion/ui/define/lion-input-email.js';
import '@lion/ui/define/lion-form.js';
export declare class LoginFoo extends LitElement {
    static styles: import("lit").CSSResult;
    active: boolean;
    disabled: boolean;
    loggedIn: boolean;
    user: {
        name: string;
        email: string;
    };
    _onClick(): void;
    login(event: any): false | undefined;
    logout(): void;
    render(): import("lit-html").TemplateResult<1>;
    renderLoginForm(): import("lit-html").TemplateResult<1>;
    renderUserDetails(): import("lit-html").TemplateResult<1>;
}
