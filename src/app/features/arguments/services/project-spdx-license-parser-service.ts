import { Injectable } from '@angular/core';

type Token =
  | { type: 'LICENSE'; value: string }
  | { type: 'WITH'; value: 'WITH' }
  | { type: 'AND'; value: 'AND' }
  | { type: 'OR'; value: 'OR' }
  | { type: 'LPAREN'; value: '(' }
  | { type: 'RPAREN'; value: ')' };

@Injectable({
  providedIn: 'root',
})
export class ProjectSpdxLicenseParserService {
  private tokenize(expr: string): Token[] | undefined {
    const tokens: Token[] = [];
    let i = 0;

    while (i < expr.length) {
      if (/\s/u.test(expr[i])) {
        i += 1;
        continue;
      }

      if (expr[i] === '(') {
        tokens.push({ type: 'LPAREN', value: '(' });
        i += 1;
      } else if (expr[i] === ')') {
        tokens.push({ type: 'RPAREN', value: ')' });
        i += 1;
      } else if (expr.slice(i, i + 3) === 'AND') {
        tokens.push({ type: 'AND', value: 'AND' });
        i += 3;
      } else if (expr.slice(i, i + 2) === 'OR') {
        tokens.push({ type: 'OR', value: 'OR' });
        i += 2;
      } else if (expr.slice(i, i + 4) === 'WITH') {
        tokens.push({ type: 'WITH', value: 'WITH' });
        i += 4;
      } else {
        let id = '';

        if (expr.slice(i, i + 12) === 'DocumentRef-') {
          id += 'DocumentRef-';
          i += 12;

          while (i < expr.length && /[A-Za-z0-9.-]/u.test(expr[i])) {
            id += expr[i];
            i += 1;
          }

          if (i < expr.length && expr[i] === ':') {
            id += ':';
            i += 1;
          } else {
            return undefined;
          }
        }

        const refIdx = expr.indexOf('-', i) + 1;
        const refIdxSlice = expr.slice(i, refIdx);
        if (refIdxSlice === 'LicenseRef-' || refIdxSlice === 'AdditionRef-') {
          id += refIdxSlice;
          i = refIdx;

          while (i < expr.length && /[A-Za-z0-9.-]/u.test(expr[i])) {
            id += expr[i];
            i += 1;
          }
        } else if (id === '') {
          while (i < expr.length && /[A-Za-z0-9.-]/u.test(expr[i])) {
            id += expr[i];
            i += 1;
          }
        }

        if (id !== '' && i < expr.length && expr[i] === '+') {
          id += expr[i];
          i += 1;
        }

        if (id === '') {
          return undefined;
        } else {
          tokens.push({ type: 'LICENSE', value: id });
        }
      }
    }

    return tokens;
  }

  private tokens: Token[] = [];
  private pos = 0;

  private current(): Token | undefined {
    return this.tokens[this.pos];
  }

  private consume(type: Token['type']): boolean {
    if (this.current()?.type !== type) {
      return false;
    }
    this.pos += 1;
    return true;
  }

  parse(expr: string): boolean {
    console.log(expr);
    const tokens = this.tokenize(expr);
    if (tokens === undefined) {
      return false;
    }
    this.tokens = tokens;
    this.pos = 0;
    return this.parseExpression() && this.pos === this.tokens.length;
  }

  private parseExpression(): boolean {
    if (!this.parseTerm()) {
      return false;
    }

    while (this.current()?.type === 'OR') {
      this.pos += 1;
      if (!this.parseTerm()) {
        return false;
      }
    }

    return true;
  }

  private parseTerm(): boolean {
    if (!this.parseFactor()) {
      return false;
    }

    while (this.current()?.type === 'AND') {
      this.pos += 1;

      if (!this.parseFactor()) {
        return false;
      }
    }

    return true;
  }

  private parseFactor(): boolean {
    if (this.current()?.type === 'LPAREN') {
      this.pos += 1;

      if (!this.parseExpression() || !this.consume('RPAREN')) {
        return false;
      }
    } else if (!this.parseLicense()) {
      return false;
    }

    return true;
  }

  private parseLicense(): boolean {
    const tokenLicense = this.current();
    if (tokenLicense === undefined) {
      return false;
    }
    if (tokenLicense.value.includes('AdditionRef')) {
      return false;
    }
    if (!this.consume('LICENSE')) {
      return false;
    }

    if (this.current()?.type === 'WITH') {
      this.pos += 1;
      const tokenLicense2 = this.current();
      if (tokenLicense2 === undefined) {
        return false;
      }
      if (tokenLicense2.value.includes('LicenseRef')) {
        return false;
      }
      if (!this.consume('LICENSE')) {
        return false;
      }
    }
    return true;
  }
}
