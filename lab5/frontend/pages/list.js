import { ajax } from '../modules/ajax.js';
import { applicantUrls } from '../modules/applicantUrls.js';
import { ProductCardComponent } from '../components/productCard.js';
import { FormComponent } from '../components/form.js';

export class ApplicantsListPage {
    constructor(parent, router) {
        this.parent = parent;
        this.router = router;
    }

    render() {
        this.parent.innerHTML = '';
        const html = `
            <h1>📋 Приемная комиссия МГТУ им. Баумана</h1>
            <button id="createBtn" style="background: #28a745; margin-bottom: 12px;">➕ Создать абитуриента</button>
            <div class="filter-bar">
                <input type="text" id="filterInput" placeholder="Фильтр по ФИО..." value="">
                <button id="filterBtn">🔍 Найти</button>
            </div>
            <div id="cardsContainer" class="cards-grid"></div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        this.cardsContainer = this.parent.querySelector('#cardsContainer');
        const filterInput = this.parent.querySelector('#filterInput');
        const filterBtn = this.parent.querySelector('#filterBtn');
        const createBtn = this.parent.querySelector('#createBtn');

        const loadData = (fullName = '') => {
            let url = applicantUrls.getApplicants();
            if (fullName.trim() !== '') {
                url += `?fullName=${encodeURIComponent(fullName.trim())}`;
            }
            ajax.get(url, (data, status) => {
                if (status === 200 && Array.isArray(data)) {
                    this.renderCards(data);
                } else {
                    this.cardsContainer.innerHTML = '<p>Ошибка загрузки данных</p>';
                }
            });
        };

        filterBtn.addEventListener('click', () => loadData(filterInput.value));

        createBtn.addEventListener('click', () => {
            this.showCreateForm();
        });

        loadData();
    }

    renderCards(items) {
        this.cardsContainer.innerHTML = '';
        if (items.length === 0) {
            this.cardsContainer.innerHTML = '<p>Абитуриентов не найдено</p>';
            return;
        }
        items.forEach(item => {
            const card = new ProductCardComponent(this.cardsContainer);
            card.render(item, (id) => {
                this.router.navigate(`/applicant/${id}`);
            });
        });
    }

    showCreateForm() {
        const fields = [
            { name: 'fullName', label: 'ФИО', type: 'text', required: true },
            { name: 'specialty', label: 'Специальность', type: 'text', required: true },
            { name: 'math', label: 'Математика (балл)', type: 'number', required: true },
            { name: 'physics', label: 'Физика (балл)', type: 'number', required: true },
            { name: 'russian', label: 'Русский язык (балл)', type: 'number', required: true },
            { name: 'status', label: 'Статус', type: 'text', required: false }
        ];
        const form = new FormComponent(this.parent, 'Создание нового абитуриента', fields, (data) => {
            const payload = {
                fullName: data.fullName,
                specialty: data.specialty,
                examScores: {
                    math: parseInt(data.math),
                    physics: parseInt(data.physics),
                    russian: parseInt(data.russian)
                },
                status: data.status || 'на рассмотрении'
            };
            ajax.post(applicantUrls.createApplicant(), payload, (response, status) => {
                if (status === 201) {
                    alert('Абитуриент создан!');
                    // удаляем форму и перезагружаем список
                    document.querySelector('.modal-card')?.remove();
                    // перезагружаем главную страницу
                    this.render();
                } else {
                    alert('Ошибка создания: ' + JSON.stringify(response));
                }
            });
        });
        form.render();
    }
}
