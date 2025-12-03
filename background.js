const VERA_URL = 'https://vera-g6.vercel.app/vera';

// Créer les menus contextuels lors de l'installation de l'extension
chrome.runtime.onInstalled.addListener(() => {
    // Menu parent
    chrome.contextMenus.create({
        id: 'veraParent',
        title: 'Vérifier avec Vera',
        contexts: ['selection']
    });

    // Option 1 : Ouvrir dans la popup
    chrome.contextMenus.create({
        id: 'veraPopup',
        parentId: 'veraParent',
        title: 'Ouvrir dans la popup',
        contexts: ['selection']
    });

    // Option 2 : Ouvrir dans un nouvel onglet
    chrome.contextMenus.create({
        id: 'veraNewTab',
        parentId: 'veraParent',
        title: 'Ouvrir dans un nouvel onglet',
        contexts: ['selection']
    });

    console.log('Menus contextuels Vera créés');
});

// Gérer le clic sur les menus contextuels
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (!info.selectionText) return;

    const selectedText = info.selectionText;
    const url = `${VERA_URL}?text=${encodeURIComponent(selectedText)}`;

    if (info.menuItemId === 'veraPopup') {
        // Stocker le texte pour que la popup puisse le récupérer
        chrome.storage.local.set({ selectedText: selectedText }, () => {
            // Ouvrir la popup
            chrome.action.openPopup();
        });
    } else if (info.menuItemId === 'veraNewTab') {
        // Ouvrir dans un nouvel onglet
        chrome.tabs.create({ url: url });
    }
});
