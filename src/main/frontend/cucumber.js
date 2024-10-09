module.exports = {
    default: {
      require: ['../../jsAcceptanceTest/steps/*.js', '../../jsAcceptanceTest/hooks/*.js'], // Ruta a tus archivos de pasos
      paths: ['../../jsAcceptanceTest/features/*.feature'] // Ruta a tus archivos de características
    }
  };