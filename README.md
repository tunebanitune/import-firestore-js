# Import to Firestore JS app

Import JSON data to Firestore. Supports subcollections.

## How to use
1. `npm install`
2. Edit `config.js` with **API_KEY**, **AUTH_DOMAIN**, and **PROJECT_ID** from your Firestore project.
3. Place your data inside of `data.json`
4. To create a subcollection from an array of objects, set the `_isSubCollection` property to true and place the array within a `data` property.
5. `npm run import`
