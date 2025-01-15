export class TestAdapter  {

  hacerAlgo(){}

  hacerAlgoConParametros(cadena:string,contador:number){}

  hacerAlgoQueRetornaUnString(){return "hola mundo"}

  haceralgoLambda = () => {}


  haceralgoNoLambda(){}

  hacerAlgoAsincrono(): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve("resultado asincrónico"), 100));
  }
}
