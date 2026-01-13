// HCI Page JavaScript - Sidebar navigation and scroll highlighting

document.addEventListener('DOMContentLoaded', function() {
  
  // Navbar scroll behavior
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-main');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll for sidebar links
  const navLinks = document.querySelectorAll('.nav-link-item');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navbarHeight = 70;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Highlight active section on scroll
  const sections = document.querySelectorAll('.content-section[id]');
  
  function highlightActiveSection() {
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
  
  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection(); // Run on load
  
  // Mobile sidebar toggle (if needed)
  const sidebar = document.querySelector('.hci-sidebar');
  if (window.innerWidth <= 768) {
    sidebar.classList.add('collapsed');
    
    // Add toggle button functionality if you create one
    const toggleBtn = document.getElementById('sidebarToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
      });
    }
  }
  
});