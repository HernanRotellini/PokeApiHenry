export const validate = (pokemon) => {
    let errors = {};
    const regex = /\.(jpg|jpeg)$/;
    // Validar que el nombre esté completo
    if (!pokemon.name) {
      errors.name = 'El nombre es requerido';
    }
    //Validar que la imagen sea .jpg o .jpeg
    if(regex.test(pokemon.image)){
      errors.image = "La imagen debe estar en formato .jpg o .jpeg"
    }
    // Validar que hp, attack y defense sean menores a 500
    if (pokemon.hp>500) {
      errors.hp = 'HP debe ser menor a 500';
    }
    if (pokemon.attack>500) {
      errors.attack = 'Ataque debe ser menor a 500';
    }
    if (pokemon.defense>500) {
      errors.defense = 'Defensa debe ser menor a 500';
    }
    if(pokemon.types.length===0){
    errors.types = 'Debe seleccionar 1 o mas tipos';
    }
    
    return errors;
  };
  