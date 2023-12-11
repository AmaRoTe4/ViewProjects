export const test = async (path, clave) => {
  const resultado = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      clave,
    },
  });
  return resultado.status;
};
