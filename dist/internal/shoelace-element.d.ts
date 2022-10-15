import { LitElement } from 'lit';
export default class ShoelaceElement extends LitElement {
    dir: string;
    lang: string;
    emit(name: string, options?: CustomEventInit): CustomEvent<any>;
}
