// Cambio lingua IT / EN.
// I testi sono già nell'HTML in entrambe le lingue (data-lang="it" / data-lang="en"):
// styles.css nasconde la lingua non attiva in base a <html lang>.
// Caricato nel <head> (non defer) per impostare la lingua prima del rendering.
(function () {
    var STORAGE_KEY = 'lang';
    var SUPPORTED = ['it', 'en'];

    function readStored() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function store(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
    }

    var initial = readStored();
    if (SUPPORTED.indexOf(initial) === -1) {
        initial = 'it';
    }
    document.documentElement.lang = initial;

    function apply(lang) {
        document.documentElement.lang = lang;

        // Titolo della pagina: <title data-en="...">
        var title = document.querySelector('title');
        if (title) {
            if (!title.dataset.it) {
                title.dataset.it = title.textContent;
            }
            document.title = (lang === 'en' && title.dataset.en) ? title.dataset.en : title.dataset.it;
        }

        // Testo alternativo delle immagini: <img alt="..." data-alt-en="...">
        document.querySelectorAll('[data-alt-en]').forEach(function (img) {
            if (!img.dataset.altIt) {
                img.dataset.altIt = img.alt;
            }
            img.alt = lang === 'en' ? img.dataset.altEn : img.dataset.altIt;
        });

        document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
            var active = btn.dataset.setLang === lang;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        apply(document.documentElement.lang);
        document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                apply(btn.dataset.setLang);
                store(btn.dataset.setLang);
            });
        });
    });
})();
