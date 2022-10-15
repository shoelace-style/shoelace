import './formdata-event-polyfill';
import type SlButton from '../components/button/button';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
export interface FormSubmitControllerOptions {
    form: (input: unknown) => HTMLFormElement | null;
    name: (input: unknown) => string;
    value: (input: unknown) => unknown | unknown[];
    defaultValue: (input: unknown) => unknown | unknown[];
    disabled: (input: unknown) => boolean;
    reportValidity: (input: unknown) => boolean;
    setValue: (input: unknown, value: unknown) => void;
}
export declare class FormSubmitController implements ReactiveController {
    host?: ReactiveControllerHost & Element;
    form?: HTMLFormElement | null;
    options: FormSubmitControllerOptions;
    constructor(host: ReactiveControllerHost & Element, options?: Partial<FormSubmitControllerOptions>);
    hostConnected(): void;
    hostDisconnected(): void;
    handleFormData(event: FormDataEvent): void;
    handleFormSubmit(event: Event): void;
    handleFormReset(): void;
    reportFormValidity(): boolean;
    doAction(type: 'submit' | 'reset', invoker?: HTMLInputElement | SlButton): void;
    reset(invoker?: HTMLInputElement | SlButton): void;
    submit(invoker?: HTMLInputElement | SlButton): void;
}
