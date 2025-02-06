const { exec } = require('child_process');
const path = require('path');

const directorio = path.resolve(__dirname);
const comando = process.platform === 'win32' ? `cd ${directorio} && gradlew.bat bootRun` : `cd ${directorio} && ./gradlew bootRun`;

const proceso = exec(comando);

if (process.env.DEBUG) {
    proceso.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
    });
    
    proceso.stderr.on('data', (data) => {
        process.stderr.write(data.toString());
    });
}

proceso.on('close', (code) => {
    console.log(`El proceso gradlew terminó con el código ${code}`);
});

proceso.on('error', (error) => {
    console.error(`Error al ejecutar el proceso: ${error}`);
});