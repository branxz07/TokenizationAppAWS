window.onload = () => {
    navigateTo('loading'); // Default to loading page when app starts
};

// Function to load HTML pages dynamically into a central container
function navigateTo(page) {
    // You may need to update the path if your folder structure is different
    fetch(`/pages/${page}/${page}.html`)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById('app').innerHTML = html;
      })
      .catch((error) => console.log('Error loading page:', error));
}

// After 5 seconds, navigate to login page (this simulates loading delay)
setTimeout(() => {
    navigateTo('login');
}, 5000);
