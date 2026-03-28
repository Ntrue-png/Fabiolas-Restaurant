// Gestore del caricamento delle risorse
class ResourceLoader {
    constructor() {
        this.loaded = new Set();
        // Se l'URL della pagina contiene "/pages/", dobbiamo uscire di un livello (../)
        this.basePath = window.location.pathname.includes('/pages/') ? '../' : '';
    }

    async loadResource(url, type) {
        // Costruisce il percorso corretto (es. ../assets/js/main.js)
        const finalUrl = this.basePath + url;

        if (this.loaded.has(finalUrl)) return;

        try {
            switch(type) {
                case 'script':
                    await this.loadScript(finalUrl);
                    break;
                case 'style':
                    await this.loadStyle(finalUrl);
                    break;
                case 'image':
                    await this.loadImage(finalUrl);
                    break;
            }
            this.loaded.add(finalUrl);
        } catch (error) {
            console.error(`Failed to load ${finalUrl}:`, error);
        }
    }

    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    loadStyle(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
        });
    }
}

const loader = new ResourceLoader();

document.addEventListener('DOMContentLoaded', async () => {
    // Ora i percorsi sono scritti partendo dalla cartella principale (root)
    // Il loader aggiungerà ../ automaticamente se sei in contact.html
    await Promise.all([
        loader.loadResource('assets/js/main.js', 'script'),
        loader.loadResource('assets/css/critical/main.css', 'style')
    ]);

    if (window.requestIdleCallback) {
        requestIdleCallback(() => {
            loader.loadResource('assets/css/non-critical/styles.css', 'style');
        });
    } else {
        setTimeout(() => {
            loader.loadResource('assets/css/non-critical/styles.css', 'style');
        }, 200);
    }
});