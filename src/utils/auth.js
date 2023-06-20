import { auth } from '../firebase';

export const isOwnByCurrentUser = (dogUserId) => {
  return auth?.currentUser?.uid === dogUserId;
}
