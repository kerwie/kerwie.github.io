document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Gallery Data (Replace with actual data or fetch from backend) ---
    // This is a placeholder. In a real app, you'd fetch this from a server.
    const galleryItemsData = [
        {
            id: 'build-001',
            imageUrl: 'images/gallery/pc-build-1.jpg',
            title: 'The "Cyberpunk Dream" Build',
            description: 'Custom water-cooled PC with RGB, high-end gaming specs.',
            comments: [
                { text: 'Amazing build! The cable management is superb.', author: 'TechLover99' },
                { text: 'Dream PC right here. What GPU is that?', author: 'GamerPro' }
            ]
        },
        {
            id: 'repair-005',
            imageUrl: 'images/gallery/pc-repair-1.jpg',
            title: 'Rescued from the Dead',
            description: 'Revived an old workstation with a new SSD and RAM.',
            comments: [
                { text: 'Great save! Always satisfying to bring old hardware back.', author: 'RetroGamer' }
            ]
        },
        {
            id: 'build-002',
            imageUrl: 'images/gallery/pc-build-2.jpg',
            title: 'Compact Powerhouse',
            description: 'Small form factor build for maximum performance in a minimal space.',
            comments: []
        },
        {
            id: 'repair-010',
            imageUrl: 'images/gallery/pc-repair-2.jpg',
            title: 'Overheating Nightmare',
            description: 'Fixed a persistent thermal issue on a gaming rig.',
            comments: [
                { text: 'Those thermal pads needed replacing badly!', author: 'CoolingMaster' },
                { text: 'Happens to the best of them.', author: 'PCDoctor' }
            ]
        },
        {
            id: 'build-003',
            imageUrl: 'images/gallery/pc-build-3.jpg',
            title: 'The Silent Office PC',
            description: 'Focus on quiet operation and productivity.',
            comments: []
        },
        {
            id: 'custom-001',
            imageUrl: 'images/gallery/custom-mod-1.jpg',
            title: 'Unique Case Mod',
            description: 'A one-of-a-kind custom PC case modification.',
            comments: []
        },
        // Add more items as needed...
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const loadMoreBtn = document.getElementById('load-more-gallery');
    let displayedGalleryItems = 0;
    const itemsPerLoad = 3; // Number of items to load at a time

    function renderGalleryItems(itemsToRender) {
        itemsToRender.forEach(item => {
            const galleryItemDiv = document.createElement('div');
            galleryItemDiv.classList.add('gallery-item');
            galleryItemDiv.setAttribute('data-id', item.id);

            galleryItemDiv.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}">
                <div class="gallery-caption">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="comments-count">${item.comments.length} Comment(s)</span>
                </div>
                <div class="comments-section">
                    <h4>Comments</h4>
                    <div class="comments-list">
                        ${item.comments.map(comment => `
                            <div class="comment">
                                <p>${comment.text}</p>
                                <span>~ ${comment.author}</span>
                            </div>
                        `).join('')}
                    </div>
                    <p><em>(Note: Comment submission requires a backend. This is a display-only example.)</em></p>
                </div>
            `;

            galleryGrid.appendChild(galleryItemDiv);
            displayedGalleryItems++;
        });
    }

    function loadGallery() {
        const itemsToShow = galleryItemsData.slice(0, itemsPerLoad);
        renderGalleryItems(itemsToShow);

        if (galleryItemsData.length > itemsPerLoad) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Load initial gallery items
    loadGallery();

    // Load more gallery items on button click
    loadMoreBtn.addEventListener('click', () => {
        const nextItems = galleryItemsData.slice(displayedGalleryItems, displayedGalleryItems + itemsPerLoad);
        renderGalleryItems(nextItems);

        if (displayedGalleryItems >= galleryItemsData.length) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // --- Commenting Functionality (Client-Side Simulation) ---
    const commentForm = document.getElementById('comment-form');
    const galleryItemIdInput = document.getElementById('gallery-item-id');
    const messageTextarea = document.getElementById('message');

    // Add click listener to gallery items to set the active item for commenting
    galleryGrid.addEventListener('click', (event) => {
        const galleryItem = event.target.closest('.gallery-item');
        if (!galleryItem) return;

        // Toggle comments section visibility
        const commentsSection = galleryItem.querySelector('.comments-section');
        if (commentsSection) {
            commentsSection.classList.toggle('active');
        }

        // Set the ID of the gallery item in the hidden input for the form
        const itemId = galleryItem.getAttribute('data-id');
        galleryItemIdInput.value = itemId;
    });

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission

        const selectedItemId = galleryItemIdInput.value;
        const commentText = messageTextarea.value.trim();

        if (!selectedItemId || !commentText) {
            alert('Please select a gallery item and enter a message.');
            return;
        }

        // --- Simulate sending comment to a backend ---
        // In a real application, you would use fetch() or XMLHttpRequest here
        // to send the data to your server API.
        console.log('Simulating comment submission:');
        console.log('Item ID:', selectedItemId);
        console.log('Comment:', commentText);

        const newComment = {
            text: commentText,
            // In a real app, you'd get the author from a logged-in user or ask for it.
            author: 'Anonymous'
        };

        // Find the item in our data and add the comment
        const targetItem = galleryItemsData.find(item => item.id === selectedItemId);
        if (targetItem) {
            targetItem.comments.push(newComment);

            // Update the displayed comment count
            const galleryItemElement = galleryGrid.querySelector(`.gallery-item[data-id="${selectedItemId}"]`);
            if (galleryItemElement) {
                const commentsCountSpan = galleryItemElement.querySelector('.comments-count');
                commentsCountSpan.textContent = `${targetItem.comments.length} Comment(s)`;

                // Add the new comment visually to the active comments section
                const commentsList = galleryItemElement.querySelector('.comments-list');
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                    <p>${newComment.text}</p>
                    <span>~ ${newComment.author}</span>
                `;
                commentsList.appendChild(commentDiv);
            }
        }

        // Clear the form and provide feedback
        messageTextarea.value = '';
        galleryItemIdInput.value = ''; // Reset the selected item
        alert('Comment submitted (simulated)! It has been added to the data.');
        // You might want to visually indicate which gallery item was commented on,
        // or perhaps close the comments section automatically.
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
