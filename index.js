// Helper functions to manage employee records, time events, and payroll calculations

// Function: createEmployeeRecord
// Creates an employee record object from an array of employee details
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function: createEmployeeRecords
  // Converts an array of arrays into an array of employee records using createEmployeeRecord
  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employee => createEmployeeRecord(employee));
  }
  
  // Function: createTimeInEvent
  // Records a time-in event for an employee on a specific date
  function createTimeInEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  // Function: createTimeOutEvent
  // Records a time-out event for an employee on a specific date
  function createTimeOutEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  // Function: hoursWorkedOnDate
  // Calculates the total hours worked by an employee on a specific date
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function: wagesEarnedOnDate
  // Calculates the wages earned by an employee on a specific date based on hours worked and pay rate
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Function: allWagesFor
  // Calculates the total wages earned by an employee across all dates
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
  }
  
  // Function: calculatePayroll
  // Calculates the total payroll for all employees
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  // Example usage:
  const employeeData = [
    ["John", "Doe", "Engineer", 25],
    ["Jane", "Smith", "Manager", 30]
  ];
  
  // Create employee records
  let employees = createEmployeeRecords(employeeData);
  
  // Record time events
  createTimeInEvent(employees[0], "2024-07-21 0800");
  createTimeOutEvent(employees[0], "2024-07-21 1700");
  
  createTimeInEvent(employees[1], "2024-07-21 0900");
  createTimeOutEvent(employees[1], "2024-07-21 1800");
  
  // Calculate wages for specific date or total payroll
  const wagesForDate = wagesEarnedOnDate(employees[0], "2024-07-21");
  const totalPayroll = calculatePayroll(employees);
  
  console.log(wagesForDate); // Output: 225 (assuming 8 hours worked at $25 per hour)
  console.log(totalPayroll); // Output: 1325 (assuming both employees worked 8 hours each)
  