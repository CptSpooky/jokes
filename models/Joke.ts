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

  constructor(data: RawJoke | Joke | null) {
    const isRaw = data && 'jokeText' in data;

    this.id = data?.id || crypto.randomUUID();
    this.name = data?.name || '';
    this.text = isRaw ? (data as RawJoke).jokeText : (data as Joke)?.text || '';
    this.author = data?.author || '';
    this.imgUrl = isRaw
      ? (data as RawJoke).url
      : (data as Joke)?.imgUrl || this.randomizeImage();
  }

  static from(data: RawJoke | Joke | null): Joke {
    return new Joke(data);
  }

  randomizeImage(): string {
    return `https://picsum.photos/400/700?image=${Math.floor(Math.random() * 10) + 1 * 5 + 10}`;
  }
}