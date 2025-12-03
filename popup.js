const VERA_URL = 'https://vera-g6.vercel.app/vera';

// Fonction pour récupérer le texte sélectionné dans la page active
async function getSelectedText() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab?.id) {
            console.error('Aucun onglet actif trouvé');
            return '';
        }

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => window.getSelection().toString()
        });

        return results[0]?.result || '';
    } catch (error) {
        console.error('Erreur lors de la récupération du texte sélectionné:', error);
        return '';
    }
}

// Initialisation au chargement de la popup
async function init() {
    let selectedText = '';

    // D'abord, vérifier si du texte a été stocké par le menu contextuel
    const stored = await chrome.storage.local.get(['selectedText']);

    if (stored.selectedText) {
        // Texte provenant du menu contextuel
        selectedText = stored.selectedText;
        // Nettoyer le storage
        chrome.storage.local.remove(['selectedText']);
        console.log('Texte récupéré du menu contextuel:', selectedText);
    } else {
        // Sinon, récupérer la sélection de la page active (clic sur l'icône)
        selectedText = await getSelectedText();
        console.log('Texte récupéré de la sélection:', selectedText);
    }

    const iframe = document.getElementById('veraFrame');
    const loading = document.getElementById('loading');

    // Construire l'URL avec le texte en query parameter
    const url = `${VERA_URL}?text=${encodeURIComponent(selectedText)}`;

    // Charger l'URL dans l'iframe
    iframe.src = url;

    // Attendre que l'iframe soit complètement chargée pour masquer le loading
    iframe.addEventListener('load', () => {
        console.log('iframe chargée avec le texte:', selectedText);
        iframe.style.display = 'block';
        loading.style.display = 'none';
    });
}

// Démarrer l'initialisation
init();
