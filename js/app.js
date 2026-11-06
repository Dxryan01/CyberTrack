
const activityForm = document.getElementById('activity-form');
const activityList = document.getElementById('activity-list');

const totalCount = document.getElementById('total-count');
const progressCount = document.getElementById('progress-count');
const completedCount = document.getElementById('completed-count');

let activities = [];

const statusLabels = {
    todo: 'À faire',
    progress: 'En cours',
    completed: 'Terminé'
};

function updateStats() {
    totalCount.textContent = activities.length;

    progressCount.textContent = activities.filter(
        activity => activity.status === 'progress'
    ).length;

    completedCount.textContent = activities.filter(
        activity => activity.status === 'completed'
    ).length;
}

function renderActivities() {
    activityList.innerHTML = '';

    if (activities.length === 0) {
        activityList.innerHTML = `
            <p class="empty-message">
                Aucune activité pour le moment.
            </p>
        `;

        updateStats();
        return;
    }

    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';

        const info = document.createElement('div');
        info.className = 'activity-info';

        const title = document.createElement('h3');
        title.textContent = activity.name;

        const category = document.createElement('p');
        category.textContent = activity.type;

        info.append(title, category);

        const actions = document.createElement('div');
        actions.className = 'activity-actions';

        const badge = document.createElement('span');
        badge.className = `badge ${activity.status}`;
        badge.textContent = statusLabels[activity.status];

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Supprimer';
        deleteButton.type = 'button';

        deleteButton.addEventListener('click', () => {
            activities = activities.filter(
                current => current.id !== activity.id
            );

            renderActivities();
        });

        actions.append(badge, deleteButton);
        item.append(info, actions);

        activityList.appendChild(item);
    });

    updateStats();
}

activityForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('activity-name');
    const typeInput = document.getElementById('activity-type');
    const statusInput = document.getElementById('activity-status');

    const newActivity = {
        id: crypto.randomUUID(),
        name: nameInput.value.trim(),
        type: typeInput.value,
        status: statusInput.value
    };

    if (!newActivity.name) {
        return;
    }

    activities.push(newActivity);

    activityForm.reset();
    renderActivities();
});

renderActivities();