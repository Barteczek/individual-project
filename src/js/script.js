{
  'use strict';

  const select = {
    hamburgerMenu: '#hamburger-menu',
    sidebarLinksTexts: '#sidebar-links li span',
    wallet: '.wallet',
    iconArrowDown: '.icon-arrow-down',
    mainWrapper: '.main-content-wrapper',
    sidebar: '.sidebar',
    sidebarLinks: '#sidebar-links li',
    allSections: '.main-content-wrapper section',
    detailsTable: '#details table',
    pagination: '#details .pages',
  };

  const classNames = {
    active: 'active',
    iconArrowUp: 'icon-arrow-up',
    hideText: 'hide-text',
  };

  const walletDrop = function() {
    const wallet = document.querySelector(select.wallet);
    const arrow = wallet.querySelector(select.iconArrowDown);
    
    wallet.addEventListener('click', function(event){
      event.preventDefault();
      
      wallet.classList.toggle(classNames.active);
      arrow.classList.toggle(classNames.iconArrowUp);
    });
  };

  walletDrop();

  const hambMenuAction = function() {
    const hambMenu = document.querySelector(select.hamburgerMenu);
    const sidebar = document.querySelector(select.sidebar);
    const mainWrapper = document.querySelector(select.mainWrapper);
    const sidebarLinks = document.querySelectorAll(select.sidebarLinksTexts);

    const sidebarLinksText = [];

    for(let link of sidebarLinks){
      sidebarLinksText.push(link.innerText);
    }

    hambMenu.addEventListener('click', function(event){
      event.preventDefault();

      if(window.innerWidth > 768) {
        sidebar.classList.toggle(classNames.hideText);
        mainWrapper.classList.toggle(classNames.hideText);
        let i = 0;
        for(let link of sidebarLinks) {
          if(link.innerText === '') {
            link.innerText = sidebarLinksText[i];
            i++;
          } else {
            link.innerText = '';
          }
        }

      } else {
        sidebar.classList.toggle(classNames.active);
      }
    });
  };

  hambMenuAction();

  const sidebarLinksAction = function() {
    const sidebarLinks = document.querySelectorAll(select.sidebarLinks);

    for(let link of sidebarLinks){
      
      /* add event listener to all links */
      link.addEventListener('click', function(event){
        event.preventDefault();

        /* Hide menu on mobile after link clicked */
        hideMenuOnMobile();

        /* clear 'active' class in all links */
        for(let link of sidebarLinks){
          link.classList.remove(classNames.active);
        }
        
        const clickedElement = this;
        
        /* get href of clicked link */
        const id = clickedElement.querySelector('a').getAttribute('href').replace('#', '');
        console.log(id);
        
        const sections = document.querySelectorAll(select.allSections);

        /* clear class 'active' from all sections */
        for(let section of sections){
          section.classList.remove(classNames.active);  
        }

        /* find section with id === clicked element href and add 'active' class to it */
        document.getElementById(id).classList.add(classNames.active);

        /* if 'General' clicked show also 'Links' section */
        if(id === 'general'){
          document.getElementById('links').classList.add(classNames.active);
        }

        /* add 'active' class to clicked link */
        clickedElement.classList.add(classNames.active);
      });
    }
  };

  sidebarLinksAction();

  const hideMenuOnMobile = function() {
    const sidebar = document.querySelector(select.sidebar);

    if(window.innerWidth <= 768) {
      sidebar.classList.remove(classNames.active);
    }
  };


  const detailsTable = document.querySelector(select.detailsTable);
  
  const pagination = function(table, itemsPerPage = 10) {
    /* Select all data from tbody of table */
    const newTable = table.querySelectorAll('tbody tr');

    let currentPage = 1;
    const tableBeg = currentPage * itemsPerPage - itemsPerPage;
    const tableStop = currentPage * itemsPerPage;

    /* TODO table slice*/

    // let tableSlice = {};
    // for(let i = tableBeg; i<tableStop; i++){
    //   console.log(i);
    //   console.log(newTable[i]);
    //   tableSlice[i].push(newTable[i]);
    // }

    /* Count number of pages */
    const pageNumbers = Math.ceil(newTable.length / itemsPerPage);

    /* Select div to put page numbers */
    const pagination = document.querySelector(select.pagination);

    /* Create 'a' element for each page and set href attribute to number of page */
    for(let i=1; i<=pageNumbers; i++){
      const newPage = document.createElement('a');
      newPage.innerText = i; 
      newPage.setAttribute('href', i);

      /* Append page number to div with page numbers */
      pagination.appendChild(newPage);
    }
  };

  pagination(detailsTable, 8);
}