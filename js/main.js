// Fetch and display rooms dynamically
fetch('data/rooms.json')
  .then(response => response.json())
  .then(rooms => {
    const roomList = document.getElementById('room-list');

    rooms.forEach(room => {
      const card = document.createElement('div');
      card.className = 'col-md-4';
      card.innerHTML = `
        <div class="card h-100 text-center">
          <img src="${room.image}" class="card-img-top" alt="${room.name}">
          <div class="card-body">
            <h5 class="card-title">${room.name}</h5>
            <p class="card-text">${room.price}</p>
            <button class="btn btn-primary book-btn" data-room="${room.name}" data-bs-toggle="modal" data-bs-target="#bookingModal">
              Book Now
            </button>
          </div>
        </div>
      `;
      roomList.appendChild(card);
    });

    // Add click events to all book buttons
    document.querySelectorAll('.book-btn').forEach(button => {
      button.addEventListener('click', e => {
        const roomName = e.target.getAttribute('data-room');
        document.getElementById('roomName').value = roomName;
      });
    });
  })
  .catch(error => console.error('Error loading rooms:', error));

// Handle booking form submission
document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;

  if (!name || !email || !checkin || !checkout) {
    alert('Please fill in all fields.');
    return;
  }

  // Date validation
  if (new Date(checkin) >= new Date(checkout)) {
    alert('Check-out date must be after check-in date.');
    return;
  }

  // Simulate success
  alert(`✅ Thank you ${name}! Your booking has been confirmed.\nCheck-in: ${checkin}\nCheck-out: ${checkout}`);
  
  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
  modal.hide();
  e.target.reset();
});
