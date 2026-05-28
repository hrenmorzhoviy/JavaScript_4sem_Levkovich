import { ApplicantsListPage } from './pages/list.js';
import { ApplicantDetailPage } from './pages/detail.js';

class Router {
    constructor(appElement) {
        this.appElement = appElement;
        this.routes = {
            '/': () => new ApplicantsListPage(this.appElement, this).render(),
            '/applicant/:id': (params) => new ApplicantDetailPage(this.appElement, this, params.id).render(),
        };
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        if (hash.startsWith('/applicant/')) {
            const id = hash.split('/')[2];
            if (id) {
                this.routes['/applicant/:id']({ id });
                return;
            }
        }
        if (this.routes[hash]) {
            this.routes[hash]();
        } else {
            this.routes['/']();
        }
    }

    navigate(path) {
        window.location.hash = path;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const appDiv = document.getElementById('app');
    new Router(appDiv);
});
