    document.addEventListener('DOMContentLoaded', () => {

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('details-btn')) {
                    this.classList.toggle('flipped');


                    if (this.classList.contains('flipped')) {
                        setTimeout(() => {
                            showEventModal(this);
                        }, 400);
                    }
                }
            });
        });

       
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('eventModal').style.display = 'none';
        });

        
        
        function showEventModal(card) {
            const dayNumber = card.querySelector('.day-number').textContent;
            const eventTitle = card.querySelector('.event-title').textContent;
            const eventType = card.querySelector('.event-type').textContent;
            const eventDescription = card.querySelector('.event-description').innerHTML;

            
            let rewardsHTML = '';
            const rewards = card.querySelectorAll('.reward-item');
            rewards.forEach(reward => {
                rewardsHTML += `<div class="modal-reward-item">${reward.innerHTML}</div>`;
            });

           
            document.getElementById('modalDayNumber').textContent = dayNumber;
            document.getElementById('modalEventTitle').textContent = eventTitle;
            document.getElementById('modalEventType').textContent = eventType;
            document.getElementById('modalEventDescription').innerHTML = eventDescription;
            document.getElementById('modalEventRewards').innerHTML = rewardsHTML;

            
            document.getElementById('eventModal').style.display = 'block';
        }
    });