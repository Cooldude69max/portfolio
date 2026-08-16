/* ===================================================================
   AYUSH RAJ - PORTFOLIO INTERACTIVITY (Vanilla JavaScript)
   BCA 2nd Year | Web Dev, App Dev, Cybersecurity
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME CONTROLLER (Dark / Light) ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('ayush-theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '🌙';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
    }
    localStorage.setItem('ayush-theme', theme);
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }

  // --- 2. MOBILE NAVIGATION DRAWER ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileMenuBtn.innerHTML = isOpen ? '✕' : '☰';
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 3. ACTIVE NAV LINK HIGHLIGHTER ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- 4. INTERACTIVE TERMINAL EMULATOR (For index.html) ---
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  if (terminalInput && terminalOutput) {
    let commandHistory = [];
    let historyIndex = -1;

    const commands = {
      help: `Available commands:
  • <span class="term-cyan">about</span>       - Brief overview of Ayush Raj
  • <span class="term-cyan">skills</span>      - Overview of technical skillset
  • <span class="term-cyan">services</span>    - Web Dev, App Dev & Cybersecurity offerings
  • <span class="term-cyan">projects</span>    - Featured engineering projects
  • <span class="term-cyan">education</span>   - BCA details & University info
  • <span class="term-cyan">contact</span>     - How to get in touch or hire
  • <span class="term-cyan">github</span>      - Open Ayush's GitHub profile
  • <span class="term-cyan">linkedin</span>    - Open Ayush's LinkedIn profile
  • <span class="term-cyan">clear</span>       - Clear terminal window`,

      about: `<span class="term-green">Ayush Raj</span> | Systems-Oriented Software Engineer & Tech Enthusiast
Currently in 2nd Year BCA at <span class="term-cyan">AN College, Patna (Patliputra University)</span>.
Passionate about designing robust web apps, mobile systems, and defensive & offensive cybersecurity.`,

      skills: `<span class="term-cyan">Frontend:</span> HTML5, CSS3, JavaScript ES6+, React, Responsive UI
<span class="term-cyan">Backend & Mobile:</span> Node.js, Python, Flask, REST APIs, SQL, Flutter basics
<span class="term-cyan">Cybersecurity:</span> Web Pentesting, OWASP Top 10, Network Security, Wireshark, Burp Suite, Linux CLI`,

      services: `1. <span class="term-green">Web Development:</span> Modern, responsive web applications & APIs
2. <span class="term-green">App Development:</span> Mobile app solutions & interactive utilities
3. <span class="term-green">Cybersecurity:</span> Vulnerability assessment, code security review & hardening`,

      projects: `• <span class="term-cyan">SecureVault</span> - Cryptographic Password & Secret Manager
• <span class="term-cyan">DevPulse</span> - Developer Knowledge & Collaboration Platform
• <span class="term-cyan">NetSentinel</span> - Network Port & Vulnerability Inspector
• <span class="term-cyan">CampusConnect</span> - Student Utility & Academic Management App`,

      education: `<span class="term-green">Bachelor of Computer Applications (BCA)</span>
Institution: AN College, Patna — Patliputra University
Batch: 2025–2028 (Currently in 2nd Year)
Key Subjects: Data Structures, Operating Systems, Computer Networks, DBMS, Web Tech`,

      contact: `Direct hire & enquiries:
• Email: <span class="term-cyan">contact@ayushraj.dev</span> (or use the contact form on /contact.html)
• Location: Patna, Bihar (Open to remote worldwide)
• GitHub: <a href="https://github.com/Cooldude69max" target="_blank" class="term-cyan">github.com/Cooldude69max</a>
• LinkedIn: <a href="https://www.linkedin.com/in/ayush-raj-39356b199/" target="_blank" class="term-cyan">linkedin.com/in/ayush-raj-39356b199</a>`,

      whoami: `guest@ayush-portfolio (Access Level: Explorer)`,
      sudo: `<span style="color:#ef4444;">Permission denied: User 'guest' is not in the sudoers file. This incident will be reported to Ayush Raj.</span>`,
      date: () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      
      github: () => {
        window.open('https://github.com/Cooldude69max', '_blank');
        return 'Opening GitHub in a new tab...';
      },
      linkedin: () => {
        window.open('https://www.linkedin.com/in/ayush-raj-39356b199/', '_blank');
        return 'Opening LinkedIn in a new tab...';
      }
    };

    function appendOutput(htmlContent) {
      const line = document.createElement('div');
      line.className = 'term-line';
      line.innerHTML = htmlContent;
      terminalOutput.appendChild(line);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = terminalInput.value.trim();
        const cmd = rawCmd.toLowerCase();

        if (rawCmd) {
          commandHistory.push(rawCmd);
          historyIndex = commandHistory.length;

          // Echo user command
          appendOutput(`<span class="term-prompt">visitor@ayush-sec:~$</span> ${rawCmd}`);

          if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
          } else if (commands[cmd]) {
            const res = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
            appendOutput(res);
          } else {
            appendOutput(`<span style="color:#ef4444;">command not found: "${rawCmd}". Type <span class="term-cyan">help</span> for a list of commands.</span>`);
          }
        }

        terminalInput.value = '';
      } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
        e.preventDefault();
      }
    });

    // Focus input on terminal container click
    const terminalContainer = document.querySelector('.terminal-card');
    if (terminalContainer) {
      terminalContainer.addEventListener('click', () => {
        terminalInput.focus();
      });
    }
  }

  // --- 5. PROJECT CATEGORY FILTERING (For services.html) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active class toggle
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 6. FAQ ACCORDION (For contact.html) ---
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (questionBtn) {
        questionBtn.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          
          // Close all first
          faqItems.forEach(i => i.classList.remove('active'));

          // Toggle clicked one
          if (!isOpen) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // --- 7. CONTACT & HIRE FORM SUBMISSION (For contact.html) ---
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalNamePlaceholder = document.getElementById('modalNamePlaceholder');

  if (contactForm && successModal) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const emailInput = document.getElementById('clientEmail');
      const serviceInput = document.getElementById('clientService');
      const messageInput = document.getElementById('clientMessage');

      const clientName = nameInput ? nameInput.value.trim() : 'there';

      if (modalNamePlaceholder) {
        modalNamePlaceholder.textContent = clientName || 'there';
      }

      // Display animated success modal
      successModal.classList.add('open');
      contactForm.reset();
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('open');
      });
    }

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('open');
      }
    });
  }

  // --- 8. FOOTER CURRENT YEAR ---
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
