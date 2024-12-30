export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt: Date | null,
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, completedAt } = object;

    if (typeof id !== 'number') throw new Error('id must be a number');

    if (!id) throw new Error('id is required');

    if (!text) throw new Error('text is required');

    let newCompletedAt: Date | null = null;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw new Error('completedAt must be a valid date');
      }
    }

    return new TodoEntity(id, text, newCompletedAt);
  }
}
