export class Book {
  constructor(title, author, year) {
    this.id = Math.round(Math.random() * 100000);
    this.title = title;
    this.author = author;
    this.year = year;
  }
}
