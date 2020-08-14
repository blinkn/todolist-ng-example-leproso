export class TodoModel {
    uid: string;
    description: string;
    complete: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(init?: Partial<TodoModel>) {
        Object.assign(this, init);
    }

}
