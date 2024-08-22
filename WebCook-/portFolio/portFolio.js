document.addEventListener("DOMContentLoaded", function() {
    const skills = ["Web Developer", "Java Developer", "Python Developer", "Programmer"];
    let currentSkillIndex = 0;
    const skillElement = document.getElementById("dynamic-skill");

    function updateSkill() {
        skillElement.classList.remove('fade-in');
        void skillElement.offsetWidth;
        skillElement.textContent = skills[currentSkillIndex];
        skillElement.classList.add('fade-in');
        currentSkillIndex = (currentSkillIndex + 1) % skills.length;
    }

    updateSkill();

    setInterval(updateSkill, 2000);
});


document.addEventListener("DOMContentLoaded", function() {
    const skills = document.querySelectorAll(".skill progress");

    skills.forEach(skill => {
        const value = skill.getAttribute('value');
        skill.style.width = '0';
        skill.style.transition = 'width 2s';

        setTimeout(() => {
            skill.style.width = value + '%';
        }, 100);
    });
});