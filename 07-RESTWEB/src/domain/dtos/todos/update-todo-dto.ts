export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date,
  ) {}

  get values() {
    const returnObject: { [key: string]: any } = {};

    if (this.text) {
      returnObject.text = this.text;
    }

    if (this.completedAt) {
      returnObject.completedAt = this.completedAt;
    }

    return returnObject;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id || isNaN(id)) {
      return ['ID must be a valid number'];
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === 'Invalid Date') {
        return ['Invalid date format for completedAt'];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, completedAt)];
  }
}
