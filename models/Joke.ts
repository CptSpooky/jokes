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
    : (data as Joke)?.imgUrl || 'https://picsum.photos/200/300';
  }

  static from(data: RawJoke | Joke | null): Joke {
    return new Joke(data);
  }
}