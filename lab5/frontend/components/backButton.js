export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(onClick) {
        const btn = document.createElement('button');
        btn.className = 'back-btn';
        btn.textContent = '← Назад к списку';
        btn.addEventListener('click', onClick);
        this.parent.appendChild(btn);
    }
}
