export interface RawUser {
    id: {
        name: string;
        value: string;
    };
    name: {
        first: string;
        last: string;
        title: string;
    };
    email: string;
    phone: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}

export class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture: string;

  constructor(data: RawUser) {
    this.id = data.id.name ? data.id.value : crypto.randomUUID();
    this.name = data.name.first + ' ' + data.name.last;
    this.email = data.email;
    this.phone = data.phone;
    this.picture = data.picture.thumbnail;
  }
}