export interface RawJoke {
    id: string;
    name: string;
    jokeText: string;
    author: string;
    url: string;
}

export class Joke {
  id: string;
  name: string;
  text: string;
  author: string;
  imgUrl: string;

  constructor(data: RawJoke) {
    this.id = data.id || crypto.randomUUID();
    this.name = data.name || 'Some Joke';
    this.text = data.jokeText || '';
    this.author = data.author || '';
    this.imgUrl = data.url || 'https://picsum.photos/200/300'; // Example URL, adjust as needed
  }
}