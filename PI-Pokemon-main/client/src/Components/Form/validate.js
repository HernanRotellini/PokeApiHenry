export const validate = (pokemon) => {
    let errors = {};
    const regex = /(https?:\/\/.*\.(?:png|jpeg|jpg))/i;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const oneWordRegex = /^[^\s]+$/;
   
    if (!pokemon.name && pokemon.name.trim().length===0) {
      errors.name = 'El nombre es requerido';
    } else if (!nameRegex.test(pokemon.name)) {
      errors.name = 'El nombre no puede contener numeros ni caracteres especiales';
    } else if(!oneWordRegex.test(pokemon.name)){
      errors.name = 'El nombre debe ser una sola palabra';
    }
    
    if (!pokemon.image && pokemon.name.trim().length===0) {
      errors.image = 'La URL de la imagen es requerida';
    }else if(!regex.test(pokemon.image)){
      errors.image = "La url debe tener un formato https// y extensión .jpg, .jpeg o .png"
    }
  
    // Validar que hp, attack y defense sean menores a 500
    if (!pokemon.hp || pokemon.hp < 0 || pokemon.hp > 500) {
      errors.hp = 'La vida debe ser mayor a 0 y menor o igual a 500';
    }
    if (!pokemon.attack || pokemon.attack < 0 || pokemon.attack > 500) {
      errors.attack = 'El ataque debe ser mayor a 0 y menor o igual a 500';
    }
    if (!pokemon.defense || pokemon.defense < 0 || pokemon.defense > 500) {
      errors.defense = 'La defensa debe ser mayor a 0 y menor o igual a 500';
    }
    if(pokemon.types.length===0){
    errors.types = 'Debe seleccionar al menos 1';
    }else if(pokemon.types.length>2)
    errors.types = 'No puede tener más de 2 tipos';
    return errors;
  };
  