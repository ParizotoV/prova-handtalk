export const sendDataToApi = async (data: any) => {
  try {
    const token = localStorage.getItem("tkn");

    const response = await fetch("http://localhost:3001/collect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.error || "Erro desconhecido ao enviar dados"
      );
    }

    localStorage.setItem("theme_changes", "0");

    return { success: true, data: responseData };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};
