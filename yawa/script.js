const announcementForm = document.getElementById('announcementForm');
const announcementList = document.getElementById('announcementList');

announcementForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('announcementTitle').value;
    const description = document.getElementById('announcementDescription').value;

    const announcement = document.createElement('div');
    announcement.classList.add('announcement');
    announcement.innerHTML = `<h3>${title}</h3><p>${description}</p><button class="delete-announcement">&#x2715;</button>`;

    
    announcement.querySelector('.delete-announcement').addEventListener('click', () => {
        announcement.remove();
    });

    announcementList.appendChild(announcement);
    announcementForm.reset();
});


const monthSelect = document.getElementById('monthSelect');
const daysContainer = document.querySelector('.calendar .days');

const generateCalendar = (month) => {
    const date = new Date();
    date.setMonth(month);
    date.setDate(1);

    const firstDay = date.getDay();
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();

    daysContainer.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement('div');
        blank.classList.add('day');
        blank.style.visibility = 'hidden';
        daysContainer.appendChild(blank);
    }

    
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = i;

        
        day.addEventListener('click', () => {
            const eventMessage = prompt("Enter event details for day " + i + ":", "");
            if (eventMessage) {
                day.classList.add('event-day');
                day.setAttribute('data-event', eventMessage);

                
                const eventTooltip = document.createElement('div');
                eventTooltip.classList.add('event-tooltip');
                eventTooltip.textContent = eventMessage;

                
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = "&#x2715;";
                deleteButton.classList.add('delete-event');
                deleteButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    day.classList.remove('event-day');
                    day.removeAttribute('data-event');
                    day.innerHTML = i;
                });

                eventTooltip.appendChild(deleteButton);
                day.appendChild(eventTooltip);
            }
        });

        
        day.addEventListener('mouseenter', () => {
            const eventTooltip = day.querySelector('.event-tooltip');
            if (eventTooltip) {
                eventTooltip.style.display = 'block';
            }
        });

        day.addEventListener('mouseleave', () => {
            const eventTooltip = day.querySelector('.event-tooltip');
            if (eventTooltip) {
                eventTooltip.style.display = 'none';
            }
        });

        daysContainer.appendChild(day);
    }
};

monthSelect.addEventListener('change', (e) => {
    const selectedMonth = parseInt(e.target.value, 10);
    generateCalendar(selectedMonth);
});


generateCalendar(new Date().getMonth());


const lostFoundForm = document.getElementById('lostFoundForm');
const lostFoundList = document.getElementById('lostFoundList');

lostFoundForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('lostFoundItem').value;
    const details = document.getElementById('lostFoundDetails').value;
    const imageInput = document.getElementById('lostFoundImage');
    const imageFile = imageInput.files[0];

    const lostFoundItem = document.createElement('div');
    lostFoundItem.classList.add('lost-found-item');

    let content = `
        <h3>${itemName}</h3>
        <p>${details}</p>
        <button class="delete-lost-found">&#x2715;</button>
    `;

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            imgElement.alt = itemName;
            lostFoundItem.innerHTML = content;
            lostFoundItem.appendChild(imgElement);
            lostFoundList.appendChild(lostFoundItem);

            
            lostFoundItem.querySelector('.delete-lost-found').addEventListener('click', () => {
                lostFoundItem.remove();
            });
        };
        reader.readAsDataURL(imageFile);
    } else {
        lostFoundItem.innerHTML = content;
        lostFoundList.appendChild(lostFoundItem);

        
        lostFoundItem.querySelector('.delete-lost-found').addEventListener('click', () => {
            lostFoundItem.remove();
        });
    }

    lostFoundForm.reset();
});
