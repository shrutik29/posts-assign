const postsContainer = document.getElementById('posts-container');
const loadingIndicator = document.getElementById('loading');
const errorIndicator = document.getElementById('error');


const fetchPosts = async () => {
    try {
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const posts = await postsResponse.json();
        const users = await usersResponse.json();
        const usersMap = users.reduce((map, user) => {
            map[user.id] = user;
            return map;
        }, {});

        loadingIndicator.classList.add('hidden');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <div class="user-info">Posted by: ${usersMap[post.userId].name} (${usersMap[post.userId].email})</div>
            `;
            // postElement.addEventListener('click', () => showPostDetails(post.id));
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        loadingIndicator.classList.add('hidden');
        errorIndicator.classList.remove('hidden');
        console.error('Error fetching posts:', error);
    }
};



fetchPosts();

