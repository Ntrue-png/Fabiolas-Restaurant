// Gestore del caricamento delle risorse
class ResourceLoader {
    constructor() {
        this.resources = new Map();
        this.loaded = new Set();
    }

    async loadResource(url, type) {
        if (this.loaded.has(url)) return;

        try {
            switch(type) {
                case 'script':
                    await this.loadScript(url);
                    break;
                case 'style':
                    await this.loadStyle(url);
                    break;
                case 'image':
                    await this.loadImage(url);
                    break;
            }
            this.loaded.add(url);
        } catch (error) {
            console.error(`Failed to load ${url}:`, error);
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

// Utilizzo
const loader = new ResourceLoader();

// Carica risorse in base alla priorità
document.addEventListener('DOMContentLoaded', async () => {
    // Risorse critiche
    await Promise.all([
        loader.loadResource('assets/js/main.js', 'script'),
        loader.loadResource('assets/css/critical/main.css', 'style')
    ]);

    // Risorse non critiche
    requestIdleCallback(() => {
        loader.loadResource('assets/css/non-critical/styles.css', 'style');
        
    });
}); 