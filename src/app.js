document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("see-challenges-btn");
    const challengesSection = document.getElementById("challenges-section");
    
    button.onclick = () => {
        challengesSection.scrollIntoView({behavior: "smooth"});
    }
})