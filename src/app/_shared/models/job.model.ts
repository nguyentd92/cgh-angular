export class Job {
  id: string;
  name!: string;
  deadline!: Date;
  doneAt?: Date;
}
