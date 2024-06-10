// EXTERNAL SERVICE SIMULATION
interface CalendarEvent {
  eventDate: string;
  eventTitle: string;
  metadata: Record<string, any>;
}
class ExternalCalendar {
  addEvent(event: CalendarEvent): void {
    console.log(`Event added: ${event.eventTitle} on ${event.eventDate}`);
  }
  // etc ...
}

// SIMPLE TASKS APP
type Status = "planned" | "started" | "drafted" | "reviewed" | "completed";
type Priority = "urgent" | "normal" | "none";
class Task {
    name: string;
    deadline: Date;
    status: Status = "planned";
    priority: Priority = "none";
    assignedUserId: string;
  
    constructor(name: string, deadline: Date, assignedUserId: string) {
      this.name = name;
      this.deadline = deadline;
      this.assignedUserId = assignedUserId;
    }
  
    start(): void {
      this.status = "started";
    }
  
    do(): void {
      console.log(`Doing the task: ${this.name}`);
    }
  }

class CalendarAdapter {
  private calendarService: ExternalCalendar;
  constructor() {
    this.calendarService = new ExternalCalendar();
  }

  addTaskToCalendar(task: Task): void {
    const eventDate = task.deadline.toISOString().split("T")[0];
    const eventTitle = task.name.toLocaleLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    const metadata = {
      isUrgent: task.priority === 'urgent' ? true : false,
      assignedTo: task.assignedUserId,
    };
    const event: CalendarEvent = { eventDate, eventTitle, metadata };

    this.calendarService.addEvent(event);
  }
  // etc ...
}

class TasksService {
  private calendarAdapter: CalendarAdapter;
  constructor() {
    this.calendarAdapter = new CalendarAdapter();
  }

  createTask(task: Task): void {
    // Existing logic to create a task...
    this.calendarAdapter.addTaskToCalendar(task);
  }
  // etc...
}

// USAGE:
const taskService = new TasksService();
const newTask = new Task(
  "Complete the GODDAMN report!!!",
  new Date("2024-02-20"),
  "user123"
);
taskService.createTask(newTask);
