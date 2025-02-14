import jwt from "jsonwebtoken";

const generarJWT = (id) => {

  const payload = {
    id: id
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: 86400,
      },
      (err, token) => {
        if (err) {
            reject('No se pudo generar el JWT');
        } else {
            resolve(token);
        }
      }
    );
  });
};

const comprobarJWT = (token = '')=>{
  try{
    const {uid} = jwt.verify(token,process.env.JWT_KEY);
    return [true,uid];
  }catch(error){
    return [false,null];
  }
}

export default { generarJWT, comprobarJWT};
