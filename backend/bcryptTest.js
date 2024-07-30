const bcrypt = require('bcrypt');

const testPasswordHash = async () => {
  const plainTextPassword = '1234';
  
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

  console.log('Plain text password:', plainTextPassword);
  console.log('Hashed password:', hashedPassword);

  // Compare the plain text password with the hashed password
  const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
  console.log('Password match:', isMatch);
};

testPasswordHash();
