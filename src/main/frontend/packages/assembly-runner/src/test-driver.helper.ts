export class TestDriver  {

  hacerAlgo(){}

  hacerAlgoConParametros(cadena:string,contador:number){}

  hacerAlgoSinAdapter(texto: string){ return  texto}

  hacerAlgoQueRetornaUnString(){return "hola mundo"}

  haceralgoLambda = () => {}


  haceralgoNoLambda(){}

  hacerAlgoAsincrono(): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve("resultado asincrónico"), 100));
  }
}
