export const validate = (pokemon) => {
    let errors = {};
    const regex = /\.(jpg|jpeg|png)$/;
    const nameRegex = /^[a-zA-Z]+$/;
    // Validar que el nombre esté completo
    if (!pokemon.name) {
      errors.name = 'El nombre es requerido';
    }else if (!nameRegex.test(pokemon.name)) {
      errors.name = 'El nombre no puede contener numeros ni caracteres especiales';
    }
    //Validar que la imagen sea .jpg, .jpeg o .png
    if (!pokemon.image) {
      errors.image = 'La URL de la imagen es requerida';
    }else if(!regex.test(pokemon.image)){
      errors.image = "La url debe estar en formato .jpg, .jpeg o .png"
    }
  
    // Validar que hp, attack y defense sean menores a 500
    if (!pokemon.hp || pokemon.hp < 0 || pokemon.hp > 500) {
      errors.hp = 'La vida debe ser mayor o igual a 0 y menor o igual a 500';
    }
    if (!pokemon.attack || pokemon.attack < 0 || pokemon.attack > 500) {
      errors.attack = 'El ataque debe ser mayor o igual a 0 y menor o igual a 500';
    }
    if (!pokemon.defense || pokemon.defense < 0 || pokemon.defense > 500) {
      errors.defense = 'La defensa debe ser mayor o igual a 0 y menor o igual a 500';
    }
    if(pokemon.types.length===0){
    errors.types = 'Debe seleccionar 1 o mas tipos';
    }
    
    return errors;
  };
  