
const h = function h(tagName: string, attributes, ...children: HTMLElement[]): HTMLElement {
    const el = document.createElement(tagName)
    attributes && Object.keys(attributes).map(k => {
        const v = attributes[k]
        if (v) {
            switch (k) {
                case 'htmlFor':
                    el.setAttribute('for', v);
                    break;
                case 'style':
                    Object.assign(el.style, v);
                    break;
                default:
                    if (/^on/.test(k)) {
                        el.addEventListener(k.substring(2).toLowerCase(), v)
                    } else {
                        el[k] = v
                    }
            }
        }
    })
    children.map(c => {
        if (c instanceof HTMLElement) {
            el.appendChild(c)
        } else {
            el.innerHTML = c
        }
    })
    return el
}

export default h