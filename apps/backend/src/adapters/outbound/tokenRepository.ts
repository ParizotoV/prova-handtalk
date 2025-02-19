import * as firebaseDatabase from "firebase/database";
import { db } from "../../config/firebase";

const { get, ref } = firebaseDatabase;

/**
 * Obtém os tokens autorizados armazenados no Firebase.
 */
export const getAuthorizedTokens = async (): Promise<{
  [key: string]: string;
}> => {
  try {
    const tokensRef = ref(db, "authorized_tokens");
    const snapshot = await get(tokensRef);
    return snapshot.exists()
      ? (snapshot.val() as { [key: string]: string })
      : {};
  } catch (error) {
    console.error("Erro ao carregar tokens autorizados:", error);
    return {};
  }
};
