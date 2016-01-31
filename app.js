$(document).ready(function() {
	var empArray = [];
	var empMonthlySalary = 0;
	var totalMonthlySalary = 0;

//Event listener for form submit
	$('#employeeForm').on('submit', function(event) {
		event.preventDefault();

		var values = {};
		
		$.each($('#employeeForm').serializeArray(), function(i, field) {
			values[field.name] = field.value;
		});

		//calculate total Monthly Salary from everybody's Yearly Salaries
		empMonthlySalary = parseInt(values.empYearlySalary) / 12;
		totalMonthlySalary += empMonthlySalary;

		//write this form info to empArray
		empArray.push(values);
		
		//write to the console to test
		console.log(empArray);

		//stores the values so they can be added to the DOM - PRO VERSION
		$('#container').data("empMonthlySalary", empMonthlySalary);

		// clears the form
		$('#employeeForm').find('input[type=text]').val('');
		$('#employeeForm').find('input[type=number]').val('');
		
		//calls the appendDom function and passes in these values
		appendDom(values);

	});

// Event listener for Delete button
	$('#button').on('click', 'button', function() {
		$('#container').find('.emp').remove();

		//stores the values so they can be added to the DOM - PRO VERSION
		totalMonthlySalary -= $("#container").data("empMonthlySalary");

		$('#container').children().last().append('<p class="emp">Updated Employee Monthly Salary: $' + totalMonthlySalary.toFixed(2) + '</p>');
	
	});

	function appendDom(empInfo) {

		$('#container').append('<div></div>');
		var $el = $('#container').children().last();

		$el.append('<p class="emp">Employee First Name: ' + empInfo.empFirstName + '</p>');
		$el.append('<p class="emp">Employee Last Name: ' + empInfo.empLastName + '</p>');
		$el.append('<p class="emp">Employee ID: ' + empInfo.empID + '</p>');
		$el.append('<p class="emp">Employee Job Title: ' + empInfo.empJobTitle + '</p>');
		$el.append('<p class="emp">Employee Yearly Salary: $' + empInfo.empYearlySalary + '</p>');
		$el.append('<p class="emp">Employee Monthly Salary: $' + empMonthlySalary.toFixed(2) + '</p>');
		$el.append('<p class="emp">Total Monthly Salary: $' + totalMonthlySalary.toFixed(2) + '</p>');
		//$el.append('<p><button type="button" id="button">Delete Employee</button>') //can't get the event listener to recognize this - not sure why.

	}

});