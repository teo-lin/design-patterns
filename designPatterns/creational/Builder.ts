type Status = 'planned' | 'started' | 'drafted' | 'reviewed' | 'completed';
type Priority = 'urgent' | 'normal' | 'none';
type Assignee = { id: number; name: string };

interface TaskInterface {
    setStatus(status: Status): void;
    setPriority(priority: Priority): void;
    setDescription(description: string): void;
    setDeadline(deadline: Date): void;
    addTag(tag: string): void;
    assignTo(assignee: Assignee): void;
}

class Task implements TaskInterface {
    private status: Status = 'planned';
    private priority: Priority = 'none';
    private description: string = '';
    private deadline: Date | null = null;
    private tags: string[] = [];
    private assignees: Assignee[] = [];

    setStatus(status: Status): void { this.status = status}
    setPriority(priority: Priority): void { this.priority = priority }
    setDescription(description: string): void { this.description = description }
    setDeadline(deadline: Date): void { this.deadline = deadline }
    addTag(tag: string): void { this.tags.push(tag) }
    assignTo(assignee: Assignee): void { this.assignees.push(assignee) }
}

class TaskBuilder {
    private task: Task
    constructor() { this.task = new Task() }

    setStatus(status: Status): TaskBuilder {
        this.task.setStatus(status);
        return this 
    }
    setPriority(priority: Priority): TaskBuilder {
        this.task.setPriority(priority);
        return this 
    }
    setDescription(description: string): TaskBuilder {
        this.task.setDescription(description);
        return this 
    }
    setDeadline(deadline: Date): TaskBuilder {
        this.task.setDeadline(deadline);
        return this 
    }

    build(): Task { return this.task }
}

// Usage.ts
const taskBuilder = new TaskBuilder();
const task = taskBuilder
    .setDescription('Complete TypeScript project')
    .setPriority('urgent')
    .setStatus('started')
    .setDeadline(new Date(2024, 1, 31))
    .build();

console.log(task);
