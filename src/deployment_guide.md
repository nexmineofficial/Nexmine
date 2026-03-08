# NexMine Deployment & Integration Guide

## 1. Deployment to GitHub Pages
1.  **Create a GitHub Repository**: Name it `nexmine`.
2.  **Upload Files**: Upload the contents of the `nexmine/` folder (index.html, css/, js/, etc.).
3.  **Enable Pages**: 
    - Go to **Settings > Pages**.
    - Select the `main` branch and `/ (root)` folder.
    - Click **Save**. Your site will be live at `https://<username>.github.io/nexmine/`.

## 2. Connecting Website to Firebase
1.  **Create Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com/).
2.  **Add Web App**: Register your app and copy the `firebaseConfig` object.
3.  **Update Config**: Paste the config into `nexmine/firebase/config.js`.
4.  **Enable Authentication**: 
    - Go to **Authentication > Sign-in method**.
    - Enable **Email/Password**.
5.  **Enable Firestore**: 
    - Go to **Firestore Database > Create database**.
    - Set rules to "Test mode" initially, then update with rules from `firebase_docs.md`.

## 3. Flutter App Deployment
1.  **Install Flutter**: Follow [flutter.dev](https://flutter.dev/docs/get-started/install).
2.  **Add Firebase**: Use `flutterfire configure` to link your project.
3.  **Build APK**: Run `flutter build apk --release`.
4.  **Distribute**: Upload to Play Store or share the APK.

## 4. Mining Logic Implementation
The mining logic is handled in `js/mining.js`. It uses `localStorage` to persist the timer across page refreshes and syncs with Firestore when the 24-hour period ends.
