import bcryptjs from "bcryptjs";

const HelpersCrypt = {};

HelpersCrypt.encryptPassword = async (password) => {
  //A medida que mas se ejecute mas seguro el cifrado pero mas recursos consume
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

HelpersCrypt.comparePassword = async (password, passwordDb) => {
  try {
    return await bcryptjs.compare(password, passwordDb);
  } catch (error) {
    console.log(error);
  }
};


HelpersCrypt.desencryptPassword = async (passwordDb) => {  
  const decode = await bcryptjs.decodeBase64(passwordDb, 10)  
  return decode;
};


export { HelpersCrypt };
