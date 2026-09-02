// Wait for the HTML document to be fully loaded before running the scripts
document.addEventListener("DOMContentLoaded", function() {

    // --- SCRIPT 1: Fade-in on Scroll Animation ---
    
    // Select all the sections we want to animate
    const fadeSections = document.querySelectorAll('.fade-in-section');

    // Set up the Intersection Observer
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // If the section is on the screen (is intersecting)
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing this section so the animation doesn't re-run
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is in view
    });

    // Tell the observer to watch each of the sections
    fadeSections.forEach(section => {
        fadeObserver.observe(section);
    });


    // --- SCRIPT 2: Active Nav Link Highlighting on Scroll ---
    
    // Select all the navigation links and the page sections
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.page-section, .hero');

    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the ID of the section that is currently in view
                const id = entry.target.getAttribute('id');
                
                // Remove the 'active' class from all navigation links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Find the navigation link that matches the current section's ID
                // (e.g., find the link with href="#research")
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                
                // Add the 'active' class to that specific link
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        // This margin "shrinks" the viewport. The link will only be
        // marked as active when it's in the middle 40% of the screen.
        rootMargin: '-30% 0px -70% 0px', 
        threshold: 0
    });

    // Tell this observer to watch each of the sections
    sections.forEach(section => {
        // Add an 'id' to the hero section so the "About" link can target it
        if(section.classList.contains('hero')) {
            section.setAttribute('id', 'about'); 
        }
        navObserver.observe(section);
    });
    
});