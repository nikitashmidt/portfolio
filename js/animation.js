const about = document.querySelector('.about'),
    resume = document.querySelector('.resume'),
    skills = document.querySelector('.skills'),
    portfolio = document.querySelector('.portfolio'),
    contacts = document.querySelector('.contacts');
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.style.opacity = '1';
            change.target.style.transform = 'translateY(0px)';
        }
    });
}
let options = { threshold: [0.1] };
let observer = new IntersectionObserver(onEntry, options);
let obsAbout = observer.observe(about),
     obsResume = observer.observe(resume),
     obsSkills = observer.observe(skills),
     obsPortfolio = observer.observe(portfolio),
     obsContacts = observer.observe(contacts);
 