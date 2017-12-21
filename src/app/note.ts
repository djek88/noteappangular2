export class Note {
  constructor(
    public id: number = null,
    public title: string = '',
    public content: string = '',
    public updatedAt: Date = new Date(),
    public createdAt: Date = new Date()
  ) {}

  static clone(note: Note) {
    return new Note(
      note.id,
      note.title,
      note.content,
      note.updatedAt,
      note.createdAt
    );
  }
}
