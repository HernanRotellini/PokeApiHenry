export const searchValidate = (name) => {
    let errors = {};
   
    const nameRegex = /^[a-zA-Z\s]+$/;
    //Validador de string
    if(name){
    if (!nameRegex.test(name)) {
      errors.name = "El nombre solo puede contener letras y espacios en blanco";
    }
    //Validador de numeros
    if (/\d/.test(name)) {
      errors.name = "El nombre no puede contener números";
    }
}
    return errors;
  }