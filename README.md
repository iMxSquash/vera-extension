# Vera Extension Chrome

Extension Chrome simple (Manifest V3) pour envoyer du texte sélectionné vers l'application Vera.

## Installation

1. Ouvrez Chrome et allez dans `chrome://extensions/`
2. Activez le "Mode développeur" en haut à droite
3. Cliquez sur "Charger l'extension non empaquetée"
4. Sélectionnez le dossier de cette extension

## Configuration

Dans `popup.js`, modifiez la variable `isDev` :

- `true` pour pointer vers `http://localhost:4200`
- `false` pour pointer vers `https://mon-site.com`

```javascript
const isDev = true; // Changez en false pour la production
```

## Utilisation

1. Sur n'importe quel site web, sélectionnez du texte
2. Cliquez sur l'icône de l'extension Vera dans la barre d'outils
3. Une popup s'ouvre avec votre application chargée dans un iframe
4. Le texte sélectionné est automatiquement envoyé à votre application

## Intégration dans votre application Angular

Ajoutez le code suivant dans votre composant (voir `angular-receiver-example.ts`) :

```typescript
ngOnInit() {
  window.addEventListener('message', this.handleMessage);
}

handleMessage = (event: MessageEvent) => {
  if (event.data && event.data.type === 'VERA_SELECTED_TEXT') {
    const selectedText = event.data.text;
    // Utilisez le texte comme vous le souhaitez
  }
}
```

## Notes sur les icônes

L'extension nécessite des icônes aux formats suivants :

- `icon16.png` (16x16)
- `icon48.png` (48x48)
- `icon128.png` (128x128)

Créez ces icônes ou utilisez des placeholders temporaires pour tester l'extension.

## Fichiers

- `manifest.json` : Configuration de l'extension (Manifest V3)
- `popup.html` : Interface de la popup avec iframe
- `popup.js` : Logique pour récupérer le texte et l'envoyer
- `angular-receiver-example.ts` : Exemple d'intégration Angular
