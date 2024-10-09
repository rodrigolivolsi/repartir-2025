module.exports = {
    default: {
      require: ['../../jsAcceptanceTest/steps/*.js'], // Ruta a tus archivos de pasos
      paths: ['../../jsAcceptanceTest/features/*.feature'], // Ruta a tus archivos de características
      formatOptions: {
          "snippetInterface": "async-await"
      },
      "format": [
          [
              "html",
              "cucumber-report.html"
          ],
          "summary",
          "progress-bar",
          "json:./cucumber-report.json"
      ]
    }
  };
