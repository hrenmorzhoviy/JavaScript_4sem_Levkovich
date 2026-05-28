export class ButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(text, onClick) {
        const btn = document.createElement('button');
        btn.className = 'btn-detail';
        btn.type = 'button';
        btn.innerHTML = `${text} <span class="arrow">→</span>`;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            onClick();
        });
        this.parent.appendChild(btn);
        return btn;
    }
}
