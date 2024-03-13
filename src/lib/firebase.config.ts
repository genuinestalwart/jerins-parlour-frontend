const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_apiKey,
	appId: process.env.NEXT_PUBLIC_appId,
	authDomain: process.env.NEXT_PUBLIC_authDomain,
	messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
	projectId: process.env.NEXT_PUBLIC_projectId,
	storageBucket: process.env.NEXT_PUBLIC_storageBucket,
};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
export const auth = getAuth(initializeApp(firebaseConfig));
