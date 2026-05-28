import { ProductCardComponent } from "../../components/product-card/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "images/src1.png",
                title: "Студенческая стипендия+",
                text: "Повышенная стипендия для студентов с рейтингом выше 4.5 баллов.",
                category: "Образование",
                date: "до 31.05.2025",
                badge: "hot"
            },
            {
                id: 2,
                src: "images/src2.jpeg",
                title: "Tech Conference 2025",
                text: "Бесплатное участие в научно-технической конференции МГТУ.",
                category: "Мероприятия",
                date: "15–20 марта",
                badge: "new"
            },
            {
                id: 3,
                src: "images/src3.jpg",
                title: "Спорткомплекс −30%",
                text: "Скидка на годовой абонемент в бассейн и тренажёрный зал.",
                category: "Спорт",
                date: "весь 2025 год",
                badge: "limited"
            },
            {
                id: 4,
                src: "images/src4.jpg",
                title: "Цифровая библиотека",
                text: "Бесплатный доступ к IEEE, Springer, JSTOR и 50+ базам.",
                category: "Ресурсы",
                date: "постоянно",
                badge: "new"
            },
            {
                id: 5,
                src: "images/src5.png",
                title: "Коворкинг 24/7",
                text: "Студенческий коворкинг с бесплатным кофе и Wi-Fi.",
                category: "Кампус",
                date: "уже открыт",
                badge: "hot"
            },
            {
                id: 6,
                src: "images/src6png.png",
                title: "Стажировка в IT",
                text: "Партнёрские стажировки в Яндекс, VK, Сбер.",
                category: "Карьера",
                date: "приём до 01.04",
                badge: "limited"
            }
        ];
    }

    getHTML() {
        return `
            <div id="main-page">
                <div class="page-header">
                    <h1 class="page-title">Акции и возможности</h1>
                    <p class="page-subtitle">
                        Лучшие предложения для студентов
                        <span class="highlight">МГТУ им. Баумана</span>
                    </p>
                </div>
                <div class="stats-bar">
                    <div class="stat-item">
                        <span>🔥</span>
                        <span>Активных: <span class="stat-number">6</span></span>
                    </div>
                    <div class="stat-item">
                        <span>👥</span>
                        <span>Участников: <span class="stat-number">2.4k</span></span>
                    </div>
                    <div class="stat-item">
                        <span>⭐</span>
                        <span>Рейтинг: <span class="stat-number">4.9</span></span>
                    </div>
                </div>
                <div class="cards-grid" id="cards-container"></div>
            </div>
        `;
    }

    openProduct(id) {
        import("../product/index.js").then(module => {
            const productPage = new module.ProductPage(this.parent, id);
            productPage.render();
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const container = document.getElementById('cards-container');
        const data = this.getData();
        data.forEach((item, index) => {
            const card = new ProductCardComponent(container);
            card.render(item, (id) => this.openProduct(id), index);
        });
    }
}
