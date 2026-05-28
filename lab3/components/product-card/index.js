export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getBadgeHTML(badge) {
        const labels = {
            hot: '<span class="card-badge badge-hot">🔥 Горячее</span>',
            new: '<span class="card-badge badge-new">✨ Новое</span>',
            limited: '<span class="card-badge badge-limited">⏳ Ограничено</span>'
        };
        return labels[badge] || '';
    }

    render(data, onClickCallback, index = 0) {
        const card = document.createElement('div');
        card.className = 'product-card card-animate';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img class="card-img" src="${data.src}" alt="${data.title}" loading="lazy"
                     onerror="this.src='https://placehold.co/600x400/0c1324/4f8fff?text=BMSTU'">
                <div class="card-img-overlay"></div>
                ${this.getBadgeHTML(data.badge)}
            </div>
            <div class="card-body">
                <div class="card-category">${data.category || 'Общее'}</div>
                <div class="card-title">${data.title}</div>
                <div class="card-text">${data.text}</div>
                <div class="card-footer">
                    <div class="card-date">
                        <span>📅</span><span>${data.date || '—'}</span>
                    </div>
                    <button class="btn-detail" type="button">
                        Подробнее <span class="arrow">→</span>
                    </button>
                </div>
            </div>
        `;

        const btn = card.querySelector('.btn-detail');
        const itemId = data.id;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            onClickCallback(itemId);
        });

        this.parent.appendChild(card);
    }
}
