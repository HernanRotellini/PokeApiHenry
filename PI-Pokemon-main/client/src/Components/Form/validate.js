export const validate = (pokemon) => {
    let errors = {};
  
    // Validar que el nombre esté completo
    if (!pokemon.name) {
      errors.name = 'El nombre es requerido';
    }
  
    // Validar que hp, attack y defense sean números
    if (isNaN(pokemon.hp)) {
      errors.hp = 'HP debe ser un número';
    }
    if (isNaN(pokemon.attack)) {
      errors.attack = 'Ataque debe ser un número';
    }
    if (isNaN(pokemon.defense)) {
      errors.defense = 'Defensa debe ser un número';
    }
  
    return errors;
  };
  