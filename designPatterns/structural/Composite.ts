abstract class Employee {
  constructor(protected name: string, protected role: string) {}

  getName(): string {
    return this.name;
  }

  getRole(): string {
    return this.role;
  }

  abstract getManager(): Employee | null;

  abstract setManager(manager: Employee | null): void;

  getSubordinates(): Employee[] {
    return [];
  }
}

class Manager extends Employee {
  private subordinates: Employee[] = [];
  private manager: Employee | null = null;

  constructor(name: string, role: string, manager: Employee | null = null) {
    super(name, role);
    this.manager = manager;
  }

  addSubordinate(employee: Employee): void {
    this.subordinates.push(employee);
    employee.setManager(this);
  }

  removeSubordinate(employee: Employee): void {
    const index = this.subordinates.indexOf(employee);
    if (index !== -1) {
      this.subordinates.splice(index, 1);
      employee.setManager(null);
    }
  }

  getManager(): Employee | null {
    return this.manager;
  }

  setManager(manager: Employee | null): void {
    this.manager = manager;
  }

  getSubordinates(): Employee[] {
    return this.subordinates;
  }
}
class TeamMember extends Employee {
  private directManager: Employee | null = null;

  constructor(
    name: string,
    role: string,
    protected directManagerName: string | null = null
  ) {
    super(name, role);
  }

  getManager(): Employee | null {
    return this.directManager;
  }

  setManager(manager: Employee | null): void {
    this.directManager = manager;
  }

  getSubordinates(): Employee[] {
    return [];
  }
}

class FulltimeEmployee extends TeamMember {
  constructor(name: string, role: string, directManagerName: string) {
    super(name, role, directManagerName);
  }
}
class Intern extends TeamMember {
  constructor(name: string, role: string, directManagerName: string) {
    super(name, role, directManagerName);
  }
}
class InternalContractor extends TeamMember {
  constructor(name: string, role: string, directManagerName: string) {
    super(name, role, directManagerName);
  }
}
class ExternalContractor extends TeamMember {
  constructor(name: string, role: string, directManagerName: string) {
    super(name, role, directManagerName);
  }
}

// Example Usage:
const developer1 = new FulltimeEmployee(
  'John Doe',
  'Software Developer',
  'Crocodile Dundee'
);
const developer2 = new FulltimeEmployee(
  'Jane Doe',
  'Software Developer',
  'Crocodile Dundee'
);

// Team Lead
const teamLeadCharlie = new Manager('Crocodile Dundee', 'Team Lead');

// Engineering Manager with Subordinates
const engineeringManagerBob = new Manager('Iron Man', 'Engineering Manager');
engineeringManagerBob.addSubordinate(teamLeadCharlie); // Adding teamLeadCharlie as a subordinate

teamLeadCharlie.addSubordinate(developer1);
teamLeadCharlie.addSubordinate(developer2);

// External Contractor
const externalContractor = new ExternalContractor(
  'Gigi Contra',
  'Contractor',
  'Crocodile Dundee'
);

// Intern
const intern = new Intern('Alice In Wonderland', 'Intern', 'Crocodile Dundee');

// CEO with Subordinates
const ceo = new Manager('Stormy Daniels', 'CEO');
ceo.addSubordinate(engineeringManagerBob);
ceo.addSubordinate(externalContractor);
ceo.addSubordinate(intern);

// Print Organigrama
function printOrganization(employee: Employee, depth: number = 0) {
  function getManagerName(employee: Employee): string {
    const manager = employee.getManager();
    return manager ? manager.getName() : 'None';
  }
  console.log(
    ' '.repeat(depth * 4) +
      employee.getName() +
      ' - ' +
      employee.getRole() +
      ' - Manager: ' +
      getManagerName(employee)
  );

  if (employee instanceof Manager) {
    const subordinates = employee.getSubordinates();
    subordinates.forEach((subordinate) => {
      printOrganization(subordinate, depth + 1);
    });
  }
}

console.log('Organization Structure:');
printOrganization(ceo);
