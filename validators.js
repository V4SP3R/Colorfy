export function validatePayload(body) {
  if (!body) throw new Error("Payload vazio");

  if (!body.quizAnswers) {
    throw new Error("Respostas do quiz ausentes");
  }

  if (!body.image || !body.image.base64) {
    throw new Error("Imagem não enviada");
  }
}
