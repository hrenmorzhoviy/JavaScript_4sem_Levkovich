import { ThreeScene } from "../three-scene/index.js";

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        const wrapper = document.createElement('div');
        wrapper.className = 'product-detail-card';

        // 3D контейнер
        const sceneWrapper = document.createElement('div');
        sceneWrapper.className = 'three-scene-wrapper';
        sceneWrapper.id = 'three-container-' + (data.id || 0);

        const label = document.createElement('div');
        label.className = 'scene-label';
        label.textContent = '3D Model · ' + (data.category || 'BMSTU');
        sceneWrapper.appendChild(label);

        const hint = document.createElement('div');
        hint.className = 'scene-hint';
        hint.textContent = '🖱 Вращай мышью';
        sceneWrapper.appendChild(hint);

        wrapper.appendChild(sceneWrapper);

        // Контент
        const content = document.createElement('div');
        content.className = 'detail-content';
        content.innerHTML = `
            <span class="detail-category">${data.category || 'Общее'}</span>
            <h2 class="detail-title">${data.title}</h2>
            <p class="detail-description">${data.fullDesc || data.text}</p>
            <div class="meta-grid">
                <div class="meta-item">
                    <div class="meta-icon">📅</div>
                    <div>
                        <div class="meta-label">Срок действия</div>
                        <div class="meta-value">${data.deadline || '—'}</div>
                    </div>
                </div>
                <div class="meta-item">
                    <div class="meta-icon">📍</div>
                    <div>
                        <div class="meta-label">Где получить</div>
                        <div class="meta-value">${data.location || '—'}</div>
                    </div>
                </div>
                <div class="meta-item">
                    <div class="meta-icon">👥</div>
                    <div>
                        <div class="meta-label">Участников</div>
                        <div class="meta-value">${data.participants || '—'}</div>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(content);
        this.parent.appendChild(wrapper);

        // Запуск 3D после вставки в DOM
        const sceneType = data.sceneType || 'graduation';
        setTimeout(() => {
            try {
                const scene = new ThreeScene(sceneWrapper, sceneType);
                scene.init();
            } catch (err) {
                console.warn('Three.js scene error:', err);
                sceneWrapper.innerHTML = `
                    <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#64748b;font-size:0.9rem;">
                        3D сцена загружается...
                    </div>
                `;
            }
        }, 50);
    }
}
