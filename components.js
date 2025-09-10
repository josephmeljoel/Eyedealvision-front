// components.js
document.addEventListener('DOMContentLoaded', async function() {
    // Get the current page path
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().replace('.html', '') || 'index';
    
    // Calculate the root path based on the current URL
    let rootPath = '.';
    const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
    if (pathSegments.length > 1) {
      rootPath = '';
      for (let i = 0; i < pathSegments.length - 1; i++) {
        rootPath += '../';
      }
      rootPath = rootPath.slice(0, -1); // Remove trailing slash
    }
    
    // Load header
    const headerContainer = document.querySelector('#header-container');
    if (headerContainer) {
      try {
        const headerResponse = await fetch(`${rootPath}/components/header.html`);
        let headerContent = await headerResponse.text();
        
        // Replace ROOT_PATH placeholders with the actual root path
        headerContent = headerContent.replace(/ROOT_PATH/g, rootPath);
        
        // Insert the header content
        headerContainer.innerHTML = headerContent;
        
        // Set active class for current page
        const currentNavItem = document.querySelector(`.nav-${pageName}`);
        if (currentNavItem) {
          currentNavItem.classList.add('active');
        }
        
        // Re-initialize menu button functionality
        const menuBtn = document.getElementById("menu-btn");
        const navLinks = document.getElementById("nav-links");
        if (menuBtn && navLinks) {
          menuBtn.addEventListener("click", (e) => {
            navLinks.classList.toggle("open");
            const isOpen = navLinks.classList.contains("open");
            const menuBtnIcon = menuBtn.querySelector("i");
            menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
          });
          
          navLinks.addEventListener("click", (e) => {
            navLinks.classList.remove("open");
            const menuBtnIcon = menuBtn.querySelector("i");
            menuBtnIcon.setAttribute("class", "ri-menu-line");
          });
        }
      } catch (error) {
        console.error('Error loading header:', error);
      }
    }
    
    // Load footer
    const footerContainer = document.querySelector('#footer-container');
    if (footerContainer) {
      try {
        const footerResponse = await fetch(`${rootPath}/components/footer.html`);
        let footerContent = await footerResponse.text();
        
        // Replace ROOT_PATH placeholders with the actual root path
        footerContent = footerContent.replace(/ROOT_PATH/g, rootPath);
        
        // Insert the footer content
        footerContainer.innerHTML = footerContent;
      } catch (error) {
        console.error('Error loading footer:', error);
      }
    }
  });