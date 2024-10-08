const { v4: uuidv4 } = require('uuid');

function generateToken() {
  const token = uuidv4();
  console.log('Generated Token:', token);
  return token;
}

generateToken();
