import h from './h'

const NAME = 'image-crop-picker'

const cssText = `
    .${NAME} {
        margin: 0 auto;
        width: 300px;
    }
    .${NAME} > label {
        display: block;
        padding: 2em;
        margin: .5em 0;
        border: 2px dashed;
        border-radius: 7px;
        cursor: pointer;
        opacity: .8;
    }
    .${NAME} > label:hover {
        opacity: 1;
    }
    .${NAME} > canvas {
        display: block;
        margin: 0 auto;
    }
`
class ImageCropPicker extends HTMLElement {
    
    getAllAttributes = () => [].slice.call(this.attributes).reduce((m, attr) => {
        let { name, value } = attr
        if (value) {
            switch (attr.name) {
                case 'zoomRatio':
                case 'maxSize':
                case 'width':
                case 'height':
                    value = Number(value);
                    break;
            }
            m[name] = value
        }
        return m
    }, {})

    constructor() {
        super();
        const t = this
        const { className = '', title = '', innerText } = t
        const { accept = 'image/*', zoomRatio = .05, maxSize = 102400, name = NAME, width = 300, height = 200 } = t.getAllAttributes()

        const canvas: HTMLCanvasElement = <canvas tabIndex="-1" width={width} height={height}></canvas>
        const ctx = canvas.getContext('2d')

        const preventDefault = (e:Event) => {
            e.stopPropagation()
            e.preventDefault()
        }

        let img
        let zoom = 1
        let position = {
            x: 0,
            y: 0
        }
        const drawImage = () => {
            const { x, y } = position
            const { width, height } = img
            ctx.clearRect(0, 0, width, height)
            ctx.drawImage(img, 0, 0, width, height, x, y, width * zoom, height * zoom)
            canvas.toBlob(result => {
                t['files'] = [result]
                t.dispatchEvent(new CustomEvent('change'))
            })
        }
        const onPickFile = function (e) {
            const file = (e.target.files || e.dataTransfer.files)[0]
            if (file.type.indexOf(accept.replace('*','')) === -1) {
                alert("file type invalid!");
            }
            const src = URL.createObjectURL(file)
            img = new Image()
            img.addEventListener('load', e => {
                drawImage()
            })
            img.src = src
            canvas.focus()
            preventDefault(e)
        }
        
        canvas.addEventListener('mousewheel', e => {
            if (e.deltaY > 0) {
                zoom += zoomRatio
            } else {
                zoom -= zoomRatio
            }
            drawImage()
            preventDefault(e)
        })
        canvas.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 37: position.x--; break;
                case 38: position.y--; break;
                case 39: position.x++; break;
                case 40: position.y++; break;
                case 187: zoom += zoomRatio; break;
                case 189: zoom -= zoomRatio; break;
            }
            drawImage()
            preventDefault(e)
        }, false)

        let touchPosition = null
        const touchStart = (e) => {
            const ev = e.touches ? e.touches[0] : e
            const { clientX, clientY } = ev
            touchPosition = { clientX, clientY }
        }
        const touchMove = (e) => {
            if (touchPosition) {
                const ev = e.touches ? e.touches[0] : e
                const { clientX, clientY } = ev
                position.x += clientX - touchPosition.clientX
                position.y += clientY - touchPosition.clientY
                drawImage()
                touchPosition = { clientX, clientY }
            }
        }
        const touchEnd = (e) => {
            touchPosition = null
        }
        canvas.addEventListener('touchstart', touchStart)
        canvas.addEventListener('mousedown', touchStart)
        canvas.addEventListener('touchmove', touchMove)
        canvas.addEventListener('mousemove', touchMove)
        canvas.addEventListener('touchend', touchEnd)
        canvas.addEventListener('mouseup', touchEnd)

        const label = <label onDragEnter={preventDefault} onDragOver={preventDefault} onDragEnd={preventDefault} onDrop={onPickFile}>
            <input type="file" accept={accept} name={name} style={{ display: 'none' }} onChange={onPickFile}/>
            <span>{innerText.trim() || 'Click or Drop image file here'}</span>
        </label>
        
        const root = this.attachShadow({
            mode: 'open'
        })
        root.appendChild(<style>{cssText}</style>)
        root.appendChild(<div className={`${NAME} ${className}`} title={title}>
            {label}
            {canvas}
        </div>)
    }

}

customElements.define(NAME, ImageCropPicker);
