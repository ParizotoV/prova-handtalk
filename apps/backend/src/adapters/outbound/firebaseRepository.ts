import * as firebaseDatabase from "firebase/database";
import { db } from "../../config/firebase";
const { equalTo, get, orderByChild, push, query, ref, set } = firebaseDatabase;

/**
 * @function saveExtraction
 * @description Salva uma nova extração de dados no Firebase Realtime Database.
 *
 * @param {object} data - Objeto contendo os dados da extração.
 *
 * @returns {Promise<{ status: number, body: object }>}
 * Retorna um objeto com status HTTP e mensagem de sucesso ou erro.
 *
 * @example
 * const extractionData = {
 *   timestamp: Date.now(),
 *   token: "abc123",
 *   domain: "example.com",
 *   device: "mobile",
 *   os: "iOS",
 *   themeChanges: 2
 * };
 *
 * const response = await saveExtraction(extractionData);
 * console.log(response);
 * // { status: 201, body: { message: "Dados coletados com sucesso!" } }
 */
export const saveExtraction = async (data: object) => {
  try {
    const extractionsRef = ref(db, "extractions");
    const newEntryRef = push(extractionsRef);
    await set(newEntryRef, data);
    return { status: 201, body: { message: "Dados coletados com sucesso!" } };
  } catch (error) {
    console.error("Erro ao salvar extração:", error);
    return { status: 500, body: { error: "Erro ao salvar dados no Firebase" } };
  }
};

/**
 * Obtém as últimas 20 extrações do Firebase filtradas por token e ordenadas por timestamp.
 * @param token Token de autorização do usuário
 * @returns Lista das últimas 20 extrações associadas ao token, ordenadas do mais recente para o mais antigo.
 */
export const getExtractions = async (token: string) => {
  try {
    const extractionsRef = ref(db, "extractions");

    // Filtra pelo token primeiro
    const tokenQuery = query(
      extractionsRef,
      orderByChild("token"),
      equalTo(token) // Filtra registros do token fornecido
    );

    const snapshot = await get(tokenQuery);

    if (!snapshot.exists()) return [];

    // Obtém os dados e transforma em array
    const extractions = Object.values(snapshot.val()) as any[];

    // Ordena manualmente por timestamp (Firebase não permite múltiplos orderByChild)
    const sortedExtractions = extractions
      .sort((a, b) => b.timestamp - a.timestamp) // Ordena do mais recente para o mais antigo
      .slice(0, 20); // Obtém os últimos 20 registros

    return sortedExtractions;
  } catch (error) {
    console.error("Erro ao listar extrações:", error);
    return [];
  }
};
