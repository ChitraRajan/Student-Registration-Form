const form = document.getElementById('registrationForm');
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    const editingRowIndexInput = document.getElementById('editingRowIndex');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const gender = document.getElementById('gender').value;
      const course = document.getElementById('course').value.trim();
      const dob = document.getElementById('dob').value;

      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }

      const editingRowIndex = parseInt(editingRowIndexInput.value);

      if (editingRowIndex === -1) {
        // Add new row
        addRow(name, email, phone, gender, course, dob);
      } else {
        // Update existing row
        const row = studentsTable.rows[editingRowIndex];
        row.cells[0].innerText = name;
        row.cells[1].innerText = email;
        row.cells[2].innerText = phone;
        row.cells[3].innerText = gender.charAt(0).toUpperCase() + gender.slice(1);
        row.cells[4].innerText = course;
        row.cells[5].innerText = dob;

        editingRowIndexInput.value = -1;
        form.querySelector('button').innerText = 'Register';
      }

      form.reset();
    });

    function addRow(name, email, phone, gender, course, dob) {
      const newRow = studentsTable.insertRow();
      newRow.insertCell().innerText = name;
      newRow.insertCell().innerText = email;
      newRow.insertCell().innerText = phone;
      newRow.insertCell().innerText = gender.charAt(0).toUpperCase() + gender.slice(1);
      newRow.insertCell().innerText = course;
      newRow.insertCell().innerText = dob;

      const actionsCell = newRow.insertCell();

      const editBtn = document.createElement('button');
      editBtn.innerText = 'Edit';
      editBtn.className = 'action-btn';
      editBtn.onclick = function() {
        editRow(newRow.rowIndex - 1);
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      deleteBtn.className = 'action-btn delete-btn';
      deleteBtn.onclick = function() {
        studentsTable.deleteRow(newRow.rowIndex - 1);
        form.reset();
        editingRowIndexInput.value = -1;
        form.querySelector('button').innerText = 'Register';
      };

      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(deleteBtn);
    }

    function editRow(index) {
      const row = studentsTable.rows[index];
      document.getElementById('name').value = row.cells[0].innerText;
      document.getElementById('email').value = row.cells[1].innerText;
      document.getElementById('phone').value = row.cells[2].innerText;
      document.getElementById('gender').value = row.cells[3].innerText.toLowerCase();
      document.getElementById('course').value = row.cells[4].innerText;
      document.getElementById('dob').value = row.cells[5].innerText;

      editingRowIndexInput.value = index;
      form.querySelector('button').innerText = 'Update';
    }