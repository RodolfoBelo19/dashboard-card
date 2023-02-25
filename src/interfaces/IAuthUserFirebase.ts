export interface IAuthUserFirebase {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
  phoneNumber: string;
  photoURL: string;
  providerData: {
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
  }[];
  uid: string;
}