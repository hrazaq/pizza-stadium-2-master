export class PhoneNumber {
    country: string = '212';
    area: string;
    prefix: string;
    line: string;
    phone: string;
  
    // format phone numbers as E.164
    get e164() {
      const num = this.country + this.area + this.prefix + this.line
      return `+${num}`
    }

    get morocco() {
      return this.phone.length==10 ? `+${this.country+this.phone}` : `+${this.country}0${this.phone}`
    }
  
  }