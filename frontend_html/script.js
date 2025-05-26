// Function to scroll to announcements section
function scrollToAnnouncements() {
    document.getElementById('all-announcements').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Function to handle arrow navigation in scrollable sections
function setupScrollButtons() {
    const scrollContainers = document.querySelectorAll('.overflow-x-auto');
    
    scrollContainers.forEach(container => {
        const leftBtn = container.parentElement.querySelector('.fa-chevron-left').parentElement;
        const rightBtn = container.parentElement.querySelector('.fa-chevron-right').parentElement;
        
        leftBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        });
        
        rightBtn.addEventListener('click', () => {
            container.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        });
    });
}

// Function to handle category filter button clicks and reordering
function setupCategoryFilters() {
    const filterContainer = document.querySelector('#all-announcements .flex.flex-wrap.gap-3');
    const filterButtons = filterContainer.querySelectorAll('a');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            const isActive = button.classList.contains('bg-primary');

            if (isActive) {
                // Deactivate button
                button.classList.remove('bg-primary', 'text-white');
                button.classList.add('bg-primary/10', 'text-primary', 'hover:bg-primary/20');
                // Move deactivated button to the end
                filterContainer.appendChild(button);
            } else {
                // Activate button
                button.classList.remove('bg-primary/10', 'text-primary', 'hover:bg-primary/20');
                button.classList.add('bg-primary', 'text-white');
                // Move activated button to the beginning
                filterContainer.prepend(button);
            }
        });
    });
}

// Function to handle pagination button clicks
function setupPagination() {
    const paginationContainer = document.querySelector('#all-announcements .flex.justify-center.items-center.space-x-3.mt-12');
    const paginationButtons = paginationContainer.querySelectorAll('button');

    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Handle number buttons
            if (!button.querySelector('i')) {
                paginationButtons.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white');
                    if (!btn.querySelector('i')) {
                        btn.classList.add('border', 'border-gray-300', 'hover:bg-gray-50');
                    }
                });
                button.classList.remove('border', 'border-gray-300', 'hover:bg-gray-50');
                button.classList.add('bg-primary', 'text-white');
            } else if (button.querySelector('.fa-chevron-left')) {
                // Handle previous button
                console.log('Previous button clicked');
            } else if (button.querySelector('.fa-chevron-right')) {
                // Handle next button
                console.log('Next button clicked');
            }
        });
    });
}

// Initialize scroll buttons and category filters when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupScrollButtons();
    setupCategoryFilters();
    setupPagination();
}); 