// Movie data
const movies = [
    {
        id: 1,
        title: "My Hero Academia: Final Battle",
        genre: "Anime",
        rating: 4.8,
        duration: "2h 15m",
        description: "The ultimate showdown between heroes and villains reaches its epic conclusion in this thrilling anime masterpiece.",
        color: "linear-gradient(135deg, #FF6B6B, #EE5A24)"
    },
    {
        id: 2,
        title: "Spider-Man: Across the Spider-Verse",
        genre: "Cartoon",
        rating: 4.9,
        duration: "2h 20m",
        description: "Miles Morales catapults across the Multiverse to join forces with Gwen Stacy and a new team of Spider-People.",
        color: "linear-gradient(135deg, #4ECDC4, #2C8C7E)"
    },
    {
        id: 3,
        title: "Demon Slayer: Infinity Castle",
        genre: "Anime",
        rating: 4.7,
        duration: "2h 10m",
        description: "Tanjiro and his companions embark on a deadly mission to eliminate the Demon King and save his sister.",
        color: "linear-gradient(135deg, #A29BFE, #6C5CE7)"
    },
    {
        id: 4,
        title: "The Minions: Grand Adventure",
        genre: "Cartoon",
        rating: 4.5,
        duration: "1h 45m",
        description: "The hilarious Minions find themselves on a grand adventure to find the perfect boss for their troupe.",
        color: "linear-gradient(135deg, #FDCB6E, #E17055)"
    },
    {
        id: 5,
        title: "One Piece: Egghead Arc",
        genre: "Anime",
        rating: 4.9,
        duration: "2h 30m",
        description: "The Straw Hat Pirates arrive at the mysterious island of Egghead and uncover shocking truths.",
        color: "linear-gradient(135deg, #6C5CE7, #FD79A8)"
    },
    {
        id: 6,
        title: "Zootopia 2: New Horizons",
        genre: "Cartoon",
        rating: 4.6,
        duration: "1h 55m",
        description: "Judy Hopps and Nick Wilde return to solve a new mystery that threatens the harmony of Zootopia.",
        color: "linear-gradient(135deg, #00B894, #00A381)"
    },
    {
        id: 7,
        title: "Attack on Titan: The Final Chapters",
        genre: "Anime",
        rating: 4.9,
        duration: "2h 35m",
        description: "The epic conclusion to the legendary saga that has captivated millions worldwide.",
        color: "linear-gradient(135deg, #636E72, #2D3436)"
    },
    {
        id: 8,
        title: "Inside Out 2: Emotional Journey",
        genre: "Cartoon",
        rating: 4.7,
        duration: "1h 50m",
        description: "Riley's emotions face new challenges as she navigates the complexities of growing up.",
        color: "linear-gradient(135deg, #FD79A8, #E84393)"
    },
    {
        id: 9,
        title: "Naruto: Ultimate Ninja Storm",
        genre: "Anime",
        rating: 4.8,
        duration: "2h 25m",
        description: "An exhilarating new adventure with Naruto and his friends in an all-out ninja battle.",
        color: "linear-gradient(135deg, #0984E3, #0652DD)"
    },
    {
        id: 10,
        title: "Encanto: Magic Returns",
        genre: "Cartoon",
        rating: 4.6,
        duration: "1h 40m",
        description: "The Madrigal family discovers a new magical mystery that tests their bonds of family and love.",
        color: "linear-gradient(135deg, #E17055, #D63031)"
    }
];

// DOM Elements
const moviesGrid = document.getElementById('moviesGrid');
const movieSearch = document.getElementById('movieSearch');
const movieSelect = document.getElementById('movieSelect');
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const confirmationMessage = document.getElementById('confirmationMessage');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMovies(movies);
    populateMovieSelect();
    setMinimumDate();
    setupEventListeners();
    setupScrollAnimations();
});

// Render movies to grid
function renderMovies(movieList) {
    moviesGrid.innerHTML = movieList.map(movie => `
        <div class="movie-card" data-title="${movie.title.toLowerCase()}">
            <div class="movie-card-image">
                <div class="placeholder" style="background: ${movie.color}">
                    <i class="fas fa-film"></i>
                </div>
                <div class="movie-rating">
                    <i class="fas fa-star"></i>
                    <span>${movie.rating}</span>
                </div>
                <span class="movie-badge">${movie.genre}</span>
            </div>
            <div class="movie-card-content">
                <h3>${movie.title}</h3>
                <span class="genre">${movie.genre}</span>
                <p>${movie.description}</p>
                <div class="movie-card-footer">
                    <span class="duration">
                        <i class="far fa-clock"></i>
                        ${movie.duration}
                    </span>
                    <a href="#booking" class="btn btn-primary" onclick="selectMovie(${movie.id})">
                        Book Now
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Populate movie select dropdown
function populateMovieSelect() {
    movieSelect.innerHTML = '<option value="">Choose a movie...</option>' +
        movies.map(movie => `
            <option value="${movie.id}">${movie.title}</option>
        `).join('');
}

// Set minimum date to today
function setMinimumDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookDate').min = today;
    document.getElementById('bookDate').value = today;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    movieSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.genre.toLowerCase().includes(searchTerm)
        );
        renderMovies(filteredMovies);
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link based on scroll position
        updateActiveNavLink();
    });

    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleBooking();
    });
}

// Update active navigation link based on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Select movie in booking form
function selectMovie(movieId) {
    movieSelect.value = movieId;
    setTimeout(() => {
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// Handle booking form submission
function handleBooking() {
    const movieId = parseInt(movieSelect.value);
    const movie = movies.find(m => m.id === movieId);
    const showtime = document.getElementById('showtime').value;
    const date = document.getElementById('bookDate').value;
    const tickets = document.getElementById('tickets').value;
    const name = document.getElementById('bookerName').value;
    const email = document.getElementById('email').value;

    if (!movie || !showtime || !date || !name || !email) {
        alert('Please fill in all required fields');
        return;
    }

    // Hide form, show success
    bookingForm.style.display = 'none';
    bookingSuccess.classList.add('show');

    // Format date nicely
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    confirmationMessage.innerHTML = `
        <div class="confirmation-details">
            <p><strong>Movie:</strong> ${movie.title}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${showtime}</p>
            <p><strong>Tickets:</strong> ${tickets} ${tickets === '1' ? 'Ticket' : 'Tickets'}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
        </div>
        <p class="confirmation-note">A confirmation email has been sent to ${email}. See you at the movies!</p>
    `;
}

// Reset form for new booking
function resetForm() {
    bookingForm.reset();
    setMinimumDate();
    bookingForm.style.display = 'block';
    bookingSuccess.classList.remove('show');
    movieSelect.value = '';
}

// Scroll animations using Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all movie cards
    document.querySelectorAll('.movie-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Add staggered animation delay to movie cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});
