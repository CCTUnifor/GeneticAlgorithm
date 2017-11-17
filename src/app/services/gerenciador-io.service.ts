import { Injectable } from '@angular/core';

@Injectable()
export class IOManagerService {

  constructor() { }

  public async readFileList(file: File): Promise<Array<String>> {
    return new Promise<Array<String>>((resolve) => {
      let reader = new FileReader();
      reader.onload = (theFile) => {
        resolve(reader.result.split("\n"))
      }
      reader.readAsText(file);
    })
  }
}
