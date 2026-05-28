export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(clickHandler) {
        const btn = document.createElement('button');
        btn.className = 'back-button';
        btn.type = 'button';
        btn.innerHTML = '<span class="back-arrow">←</span> На главную';
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clickHandler();
        });
        this.parent.appendChild(btn);
    }
}
