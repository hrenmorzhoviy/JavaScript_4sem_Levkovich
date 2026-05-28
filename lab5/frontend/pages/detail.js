import { ajax } from '../modules/ajax.js';
import { applicantUrls } from '../modules/applicantUrls.js';
import { ProductCardComponent } from '../components/productCard.js';
import { BackButtonComponent } from '../components/backButton.js';
import { FormComponent } from '../components/form.js';

export class ApplicantDetailPage {
    constructor(parent, router, id) {
        this.parent = parent;
        this.router = router;
        this.id = id;
        this.currentData = null;
    }

    render() {
        this.parent.innerHTML = '';
        const backButton = new BackButtonComponent(this.parent);
        backButton.render(() => this.router.navigate('/'));

        const detailContainer = document.createElement('div');
        detailContainer.id = 'detailContainer';
        this.parent.appendChild(detailContainer);

        this.loadData(detailContainer);
    }

    loadData(container) {
        ajax.get(applicantUrls.getApplicantById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.currentData = data;
                const card = new ProductCardComponent(container);
                // передаём дополнительно коллбэк для редактирования
                card.renderDetail(data, (id) => this.deleteApplicant(id), () => this.showEditForm(container));
            } else {
                container.innerHTML = '<p>Абитуриент не найден</p>';
            }
        });
    }

    deleteApplicant(id) {
        if (confirm('Вы уверены, что хотите удалить абитуриента?')) {
            ajax.delete(applicantUrls.deleteApplicant(id), (data, status) => {
                if (status === 204) {
                    alert('Абитуриент удалён');
                    this.router.navigate('/');
                } else {
                    alert('Ошибка при удалении');
                }
            });
        }
    }

    showEditForm(container) {
        const fields = [
            { name: 'fullName', label: 'ФИО', type: 'text', required: false },
            { name: 'specialty', label: 'Специальность', type: 'text', required: false },
            { name: 'math', label: 'Математика', type: 'number', required: false },
            { name: 'physics', label: 'Физика', type: 'number', required: false },
            { name: 'russian', label: 'Русский язык', type: 'number', required: false },
            { name: 'status', label: 'Статус', type: 'text', required: false }
        ];
        const initial = {
            fullName: this.currentData.fullName,
            specialty: this.currentData.specialty,
            math: this.currentData.examScores.math,
            physics: this.currentData.examScores.physics,
            russian: this.currentData.examScores.russian,
            status: this.currentData.status
        };
        const form = new FormComponent(container, 'Редактирование абитуриента', fields, (formData) => {
            const patchPayload = {};
            if (formData.fullName) patchPayload.fullName = formData.fullName;
            if (formData.specialty) patchPayload.specialty = formData.specialty;
            if (formData.status) patchPayload.status = formData.status;
            if (formData.math || formData.physics || formData.russian) {
                patchPayload.examScores = {};
                if (formData.math) patchPayload.examScores.math = parseInt(formData.math);
                if (formData.physics) patchPayload.examScores.physics = parseInt(formData.physics);
                if (formData.russian) patchPayload.examScores.russian = parseInt(formData.russian);
            }
            ajax.patch(applicantUrls.updateApplicant(this.id), patchPayload, (response, status) => {
                if (status === 200) {
                    alert('Данные обновлены!');
                    document.querySelector('.modal-card')?.remove();
                    this.render();  // перерисовываем страницу с новыми данными
                } else {
                    alert('Ошибка обновления: ' + JSON.stringify(response));
                }
            });
        });
        form.render(initial);
    }
}
