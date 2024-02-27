const getRandomCode = () => new Date().getTime().toString().slice(-5);

export { getRandomCode };
