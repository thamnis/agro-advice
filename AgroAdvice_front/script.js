// Variables d'état
let isScrolled = false;
let activeSection = 'accueil';
let isMobileMenuOpen = false;

// Fonction pour gérer le scroll
function handleScroll() {
    const scrollY = window.scrollY;
    const newIsScrolled = scrollY > 50;
    
    if (newIsScrolled !== isScrolled) {
        isScrolled = newIsScrolled;
        const navbar = document.getElementById('navbar');
        if (isScrolled) {
            navbar.classList.add('bg-white', 'shadow-lg');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white', 'shadow-lg');
            navbar.classList.add('bg-transparent');
        }
    }
}

// Fonction pour faire défiler vers une section
function scrollToSection(sectionId) {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Fonction pour définir la section active
function setActiveSection(sectionId) {
    activeSection = sectionId;
    
    // Mettre à jour les liens de navigation desktop
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === sectionId) {
            link.classList.add('text-green-600', 'font-semibold');
            link.classList.remove('text-gray-700');
        } else {
            link.classList.remove('text-green-600', 'font-semibold');
            link.classList.add('text-gray-700');
        }
    });
    
    // Mettre à jour les liens de navigation mobile
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === sectionId) {
            link.classList.add('bg-green-50', 'text-green-600');
            link.classList.remove('text-gray-700');
        } else {
            link.classList.remove('bg-green-50', 'text-green-600');
            link.classList.add('text-gray-700');
        }
    });
}

// Fonction pour basculer le menu mobile
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    
    if (isMobileMenuOpen) {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Fonction pour fermer le menu mobile
function closeMobileMenu() {
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

// Fonction pour naviguer et fermer le menu mobile
function scrollToSectionAndClose(sectionId) {
    scrollToSection(sectionId);
    closeMobileMenu();
}

// Fonction pour gérer la soumission du formulaire
function handleSubmit(event) {
    event.preventDefault();
    alert('Merci pour votre message ! Nous vous répondrons bientôt.');
    event.target.reset();
}

// Fonction pour gérer les touches du clavier
function handleKeyPress(event) {
    if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
    }
}

// Fonction pour gérer le redimensionnement de la fenêtre
function handleResize() {
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
        closeMobileMenu();
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour l'année dans les footers
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('mobile-current-year').textContent = currentYear;
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('resize', handleResize);
    
    // Définir la section active initiale
    setActiveSection('accueil');
});
