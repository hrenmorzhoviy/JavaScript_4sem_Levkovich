import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    getData() {
        const dataset = {
            1: {
                id: 1,
                title: "Студенческая стипендия+",
                category: "Образование",
                text: "Повышенная стипендия для отличников",
                fullDesc: "Программа поддержки студентов с высокой академической успеваемостью. Студенты с рейтингом выше 4.5 баллов получают надбавку 50% к базовой стипендии. Подайте заявку через личный кабинет.",
                deadline: "31.05.2025",
                location: "Личный кабинет",
                participants: "340+",
                sceneType: "graduation"
            },
            2: {
                id: 2,
                title: "Tech Conference 2025",
                category: "Мероприятия",
                text: "Научно-техническая конференция",
                fullDesc: "Ежегодная конференция объединяет 500+ докладчиков из 15 стран. Для студентов Бауманки участие бесплатное — все секции, воркшопы и нетворкинг.",
                deadline: "20.03.2025",
                location: "ГЗ, Актовый зал",
                participants: "500+",
                sceneType: "conference"
            },
            3: {
                id: 3,
                title: "Спорткомплекс −30%",
                category: "Спорт",
                text: "Скидка на абонемент",
                fullDesc: "Годовой абонемент со скидкой 30%. Бассейн 25м, тренажёрный зал, зал единоборств и беговые дорожки.",
                deadline: "31.12.2025",
                location: "Спорткомплекс МГТУ",
                participants: "1.2k",
                sceneType: "sport"
            },
            4: {
                id: 4,
                title: "Цифровая библиотека",
                category: "Ресурсы",
                text: "Доступ к научным базам",
                fullDesc: "Бесплатный доступ к 50+ научным базам: IEEE Xplore, Springer, JSTOR, ScienceDirect, Web of Science.",
                deadline: "Бессрочно",
                location: "library.bmstu.ru",
                participants: "12k+",
                sceneType: "library"
            },
            5: {
                id: 5,
                title: "Коворкинг 24/7",
                category: "Кампус",
                text: "Студенческое пространство",
                fullDesc: "Коворкинг на 120 мест. Зоны: тихая работа, командные обсуждения, переговорные. Бесплатный кофе, скоростной Wi-Fi.",
                deadline: "Бессрочно",
                location: "УЛК, 3 этаж",
                participants: "800+",
                sceneType: "coworking"
            },
            6: {
                id: 6,
                title: "Стажировка в IT",
                category: "Карьера",
                text: "Партнёрские стажировки",
                fullDesc: "Программа стажировок для студентов 3–6 курсов. Партнёры: Яндекс, VK, Сбер, Тинькофф. Оплачиваемая стажировка 3 месяца.",
                deadline: "01.04.2025",
                location: "career.bmstu.ru",
                participants: "200+",
                sceneType: "career"
            }
        };
        return dataset[this.id] || {
            id: 0, title: "Не найдено", category: "—",
            text: "", fullDesc: "Акция не найдена.",
            deadline: "—", location: "—", participants: "—",
            sceneType: "graduation"
        };
    }

    clickBack() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        }, 100);
    }

    render() {
        this.parent.innerHTML = '';

        const page = document.createElement('div');
        page.className = 'product-detail-page';
        page.id = 'product-page';
        this.parent.appendChild(page);

        const backBtn = new BackButtonComponent(page);
        backBtn.render(this.clickBack.bind(this));

        const data = this.getData();
        const productComp = new ProductComponent(page);
        productComp.render(data);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
