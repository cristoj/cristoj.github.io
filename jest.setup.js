import { TextEncoder, TextDecoder } from'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock básico para Web Components (sin jest.fn())
global.customElements = global.customElements || {
    define: () => {},
    get: () => undefined,
    upgrade: () => {},
    whenDefined: () => Promise.resolve(),
};

// Mock básico para Shadow DOM
if (!global.HTMLElement.prototype.attachShadow) {
    global.HTMLElement.prototype.attachShadow = function() {
        return {
            innerHTML: '',
            appendChild: () => {},
            insertBefore: () => {},
            removeChild: () => {},
        };
    };
}

// Mock para document.body si no existe
if (!global.document.body) {
    global.document.body = global.document.createElement('body');
}
