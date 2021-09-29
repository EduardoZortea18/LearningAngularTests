import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

// prefixo x = serve para excluir o teste ou testes 
// desejados da linha de execução  EX: xit('teste') ou xdescribe

// prefixo f = serve para focar um ou mais testes e somente os
// testes focados serão executados EX: fit('teste') ou fdescribe

describe('CalculatorService', () => {
  // mock de LoggerService, definindo também quais 
  // métodos quero mockar
  let calculator: CalculatorService;
  let logger: any;
  beforeEach(() => {
    logger = jasmine.createSpyObj('LoggerService', ["log"]);
    // injeção de dependencia para mockar os dados de
    // sem necessidade de criar instancias reais e usar os 
    // construtores e metodos das classes
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        // uso essa declaração pra definir um provider criado na classe
        // nesse caso sempre que eu for utiliza LoggerService seu valor será
        // "logger"
        { provide: LoggerService, useValue: logger }
      ]
    })
    calculator = TestBed.inject(CalculatorService);
  })

  it('should add two numbers', () => {
    const result = calculator.add(2, 2);

    expect(result).toBe(4);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result!");
  });
})