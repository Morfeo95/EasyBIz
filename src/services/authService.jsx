export const loginService = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com' && password === '123456') {
        resolve({ email });
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 1000);
  });
};

export const registerService = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({ email });
      } else {
        reject(new Error('Error en el registro'));
      }
    }, 1000);
  });
};
