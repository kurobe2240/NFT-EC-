export class CSRFProtection {
  private static tokenKey = 'csrf-token';

  static generateToken(): string {
    const token = crypto.getRandomValues(new Uint8Array(32))
      .reduce((acc, val) => acc + val.toString(16).padStart(2, '0'), '');
    localStorage.setItem(this.tokenKey, token);
    return token;
  }

  static getToken(): string {
    let token = localStorage.getItem(this.tokenKey);
    if (!token) {
      token = this.generateToken();
    }
    return token;
  }

  static validateToken(token: string): boolean {
    return token === localStorage.getItem(this.tokenKey);
  }
} 