# Import to Firestore JS app

Import JSON data to Firestore. Supports subcollections.

## How to use
1. `npm install`
2. Edit `config.js` with **API_KEY**, **AUTH_DOMAIN**, and **PROJECT_ID** from your Firestore project.
3. Place your data inside of `data.json`
4. An array of objects will be treated as a subcollection. A map should not contain an array of objects.
5. `npm run import`
