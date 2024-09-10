document.addEventListener('DOMContentLoaded', function() {
    const dataTable = document.getElementById('data');
    let users = [];
  
    // Fetch users from the API
    fetchUsers();
  
    async function fetchUsers() {
        try {
          const response = await fetch('https://f602fafd-cea2-4f7d-8637-64d8df92f018.mock.pstmn.io/getUsers');
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched users:', data); // Debug output
            // Access the `users` property of the response object
            users = Array.isArray(data.users) ? data.users : [];
            displayUsers(users);
          } else {
            console.error('Failed to fetch users');
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
    }
  
    document.querySelector('.submit').addEventListener('click', async function(event) {
      event.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const gender = document.getElementById('gender').value;
      const bday = parseInt(document.getElementById('bday').value);
      const bmonth = parseInt(document.getElementById('bmonth').value);
      const byear = parseInt(document.getElementById('byear').value);
      const state = document.getElementById('state').value;
      const municipality = document.getElementById('municipality').value;
      const dateCreation = parseInt(document.getElementById('dateCreation').value);
      const dateLastUpdate = parseInt(document.getElementById('dateLastUpdate').value);
      const tokenFather = document.getElementById('tokenFather').value;
      const tokenMother = document.getElementById('tokenMother').value;
      const tokenDigIdentity = document.getElementById('tokenDigIdentity').value;
      const rolLevel = parseInt(document.getElementById('rolLevel').value);
      const selected = document.getElementById('selected').checked;
      
      // Create user object
      const user = {
        id: generateID(), // Optional, if you need an ID for other purposes
        name,
        email,
        phone,
        address,
        gender: gender === 'true' ? true : false,
        bday,
        bmonth,
        byear,
        state,
        municipality,
        dateCreation,
        dateLastUpdate,
        tokenFather,
        tokenMother,
        tokenDigIdentity,
        rolLevel,
        selected
      };
  
      // Send user data to the API
      try {
        const response = await fetch('https://f602fafd-cea2-4f7d-8637-64d8df92f018.mock.pstmn.io/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        
        if (response.ok) {
          fetchUsers(); // Refresh the user list
          document.getElementById('myForm').reset();
          const modal = bootstrap.Modal.getInstance(document.getElementById('userForm'));
          modal.hide();
        } else {
          console.error('Failed to add user');
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    });
  
    function generateID() {
      return 'user-' + Math.random().toString(36).substr(2, 9);
    }
  
    function displayUsers(users) {
      if (!Array.isArray(users)) {
        console.error('Users is not an array');
        return;
      }
      dataTable.innerHTML = '';
      users.forEach((user, index) => {
        const row = document.createElement('tr');
        console.log(user.name);
        console.log(user);
        row.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="/images/ProfileIcon.webp" alt="Profile" width="50" height="50"></td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.address}</td>
          <td>${user.gender ? 'Male' : 'Female'}</td>
          <td>${user.bday}/${user.bmonth}/${user.byear}</td>
          <td>${user.state}</td>
          <td>${user.municipality}</td>
          <td>${new Date(user.dateCreation).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-info btn-sm" onclick="viewDetails('${user.tokenDigIdentity}')">View</button>
            <button class="btn btn-warning btn-sm" onclick="editUser('${user.tokenDigIdentity}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.tokenDigIdentity}')">Delete</button>
          </td>
        `;
        dataTable.appendChild(row);
      });
    }
  
    window.viewDetails = function(tokenDigIdentity) {
      const user = users.find(u => u.tokenDigIdentity === tokenDigIdentity);
      if (!user) {
        console.error('User not found');
        return;
      }
  
      document.getElementById('details').innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Address:</strong> ${user.address}</p>
        <p><strong>Gender:</strong> ${user.gender ? 'Male' : 'Female'}</p>
        <p><strong>Date of Birth:</strong> ${user.bday}/${user.bmonth}/${user.byear}</p>
        <p><strong>State:</strong> ${user.state}</p>
        <p><strong>Municipality:</strong> ${user.municipality}</p>
        <p><strong>Date Creation:</strong> ${new Date(user.dateCreation).toLocaleDateString()}</p>
        <p><strong>Date Last Update:</strong> ${new Date(user.dateLastUpdate).toLocaleDateString()}</p>
        <p><strong>Token Father:</strong> ${user.tokenFather}</p>
        <p><strong>Token Mother:</strong> ${user.tokenMother}</p>
        <p><strong>Token Digital Identity:</strong> ${user.tokenDigIdentity}</p>
        <p><strong>Role Level:</strong> ${user.rolLevel}</p>
        <p><strong>Selected:</strong> ${user.selected ? 'Yes' : 'No'}</p>
      `;
      const modal = new bootstrap.Modal(document.getElementById('readData'));
      modal.show();
    }
  
    window.editUser = function(tokenDigIdentity) {
      const user = users.find(u => u.tokenDigIdentity === tokenDigIdentity);
      if (!user) {
        console.error('User not found');
        return;
      }
  
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      document.getElementById('phone').value = user.phone;
      document.getElementById('address').value = user.address;
      document.getElementById('gender').value = user.gender ? 'true' : 'false';
      document.getElementById('bday').value = user.bday;
      document.getElementById('bmonth').value = user.bmonth;
      document.getElementById('byear').value = user.byear;
      document.getElementById('state').value = user.state;
      document.getElementById('municipality').value = user.municipality;
      document.getElementById('dateCreation').value = user.dateCreation;
      document.getElementById('dateLastUpdate').value = user.dateLastUpdate;
      document.getElementById('tokenFather').value = user.tokenFather;
      document.getElementById('tokenMother').value = user.tokenMother;
      document.getElementById('tokenDigIdentity').value = user.tokenDigIdentity;
      document.getElementById('rolLevel').value = user.rolLevel;
      document.getElementById('selected').checked = user.selected;
  
      // Show form modal for editing
      const modal = new bootstrap.Modal(document.getElementById('userForm'));
      modal.show();
    }
  
    window.deleteUser = async function(tokenDigIdentity) {
      try {
        const response = await fetch(`https://f602fafd-cea2-4f7d-8637-64d8df92f018.mock.pstmn.io/deleteUser/${tokenDigIdentity}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          fetchUsers(); // Refresh the user list
        } else {
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  });
