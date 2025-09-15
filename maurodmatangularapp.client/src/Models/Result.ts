
export class Result {
  Correct: boolean;
  ErrorMessage: string;
  Object: object;
  Objects: Array<object>;
  Exception: any;


  constructor(Correct: boolean, ErrorMessage: string, Object: object, Objects: Array<object>, Exception: any) {
    this.Correct = Correct;
    this.ErrorMessage = ErrorMessage;
    this.Object = Object;
    this.Objects = Objects;
    this.Exception = Exception;
  }
}
