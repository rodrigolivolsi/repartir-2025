import { CoverageReportOptions} from "monocart-coverage-reports"

// https://github.com/cenfun/monocart-coverage-reports
const coverageOptions: CoverageReportOptions = {

    name: 'Repartir Reporte de Cobertura (Pruebas de Aceptación JS)',

    reports: [
        'v8',
        "lcovonly"
    ],

    // entryFilter: {
    //     '**/node_modules/**': false,
    //     '**/webpack/**': false,
    //     './src/**': true
    // },
    filter: {
      '**/node_modules/**': false,
      '**/webpack/**': false,
      '**/*': true
    },

    all: {
        dir: ['./src'],
        filter: {
            // exclude files
            '**/*.html': false,
            '**/*.css': false,
            '**/*.png': false,
            '**/*.ico': false,
            '**/*.spec.ts': false,
            '**/test.ts': false,

            // empty files coverage
            '**/*': true
        }
    },

    outputDir: './coverage-reports'
}

export default coverageOptions
