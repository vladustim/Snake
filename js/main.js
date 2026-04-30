import Game from "./core/game.js";
import PlayState from "./states/PlayState.js";
import ProfileManager from "./core/ProfileManager.js";

const dom = {
    canvas: document.getElementById("game"),
    startBtn: document.getElementById("startBtn"),
    overlay: document.getElementById("overlay"),
    profileBtn: document.getElementById("profileBtn"),
    profileModal: document.getElementById("profileModal"),
    closeProfileModal: document.getElementById("closeProfileModal"),
    createProfileBtn: document.getElementById("createProfileBtn"),
    profileInput: document.getElementById("profileInput"),
    currentProfileSpan: document.getElementById("currentProfile"),
    errorMessage: document.getElementById("errorMessage"),
    sidebarLeaderboard: document.getElementById("sidebarLeaderboard"),
    leaderboard: document.getElementById("leaderboard"),
    profilesList: document.getElementById("profilesList")
};

const game = new Game(dom.canvas);
const profileManager = new ProfileManager();

game.setProfileManager(profileManager);

const showError = (message, duration = 3000) => {
    dom.errorMessage.textContent = message;
    dom.errorMessage.style.display = "block";
    dom.errorMessage.style.opacity = "1";
    
    setTimeout(() => {
        dom.errorMessage.style.opacity = "0";
        setTimeout(() => {
            dom.errorMessage.style.display = "none";
        }, 300);
    }, duration);
};

const hideOverlay = () => {
    dom.overlay.style.display = "none";
};

const startGame = () => {
    if (!profileManager.currentProfile) {
        showError("Будь ласка, виберіть профіль!");
        return;
    }

    hideOverlay();
    game.stateMachine.change(new PlayState(game));
};

const updateProfileDisplay = () => {
    dom.currentProfileSpan.textContent = profileManager.currentProfile
        ? `Гравець: ${profileManager.currentProfile}`
        : "Гравець: -";
};

const updateSidebarLeaderboard = () => {
    const profiles = profileManager.getAllProfiles();
    let html = "";

    profiles.slice(0, 5).forEach((profile, index) => {
        html += `<div class="sidebar-item">
            <span class="rank">#${index + 1}</span>
            <span class="name">${profile.name}</span>
            <span class="score">${profile.highScore}</span>
        </div>`;
    });

    dom.sidebarLeaderboard.innerHTML = html || "<p style='color: #0f0; font-size: 12px; text-align: center;'>Немає рекордів</p>";
};

const updateLeaderboardOnScore = () => {
    updateLeaderboard();
    updateSidebarLeaderboard();
    updateProfileDisplay();
};

const updateLeaderboard = () => {
    const profiles = profileManager.getAllProfiles();
    let html = "<h3>Рейтинг:</h3><div class='leaderboard-list'>";

    profiles.slice(0, 10).forEach((profile, index) => {
        html += `<div class="leaderboard-item">
            <span>${index + 1}. ${profile.name}</span>
            <span>${profile.highScore}</span>
        </div>`;
    });

    html += "</div>";
    dom.leaderboard.innerHTML = html || "<p style='color: #0f0; font-size: 12px; text-align: center;'>Немає профілів</p>";
};

const refreshAllUI = () => {
    updateProfileDisplay();
    updateSidebarLeaderboard();
    updateLeaderboard();
};

const updateProfilesList = () => {
    const names = profileManager.getProfileNames();
    let html = "<h3>Мої профілі:</h3><div class='profiles-list-items'>";

    names.forEach(name => {
        const isActive = profileManager.currentProfile === name;
        html += `<div class="profile-item ${isActive ? 'active' : ''}">
            <button class="select-profile-btn" data-name="${name}">
                ${name}
                <span class="profile-score">${profileManager.profiles[name].highScore}</span>
            </button>
            <button class="delete-profile-btn" data-name="${name}">✕</button>
        </div>`;
    });

    html += "</div>";
    dom.profilesList.innerHTML = html;

    document.querySelectorAll(".select-profile-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const name = e.target.closest("button").dataset.name;
            profileManager.selectProfile(name);
            refreshAllUI();
            updateProfilesList();
            dom.profileModal.style.display = "none";
        });
    });

    document.querySelectorAll(".delete-profile-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const name = e.target.dataset.name;
            if (confirm(`Видалити профіль "${name}"?`)) {
                profileManager.deleteProfile(name);
                refreshAllUI();
                updateProfilesList();
            }
        });
    });
};

// Обробники подій
dom.startBtn.addEventListener("click", startGame);
dom.profileBtn.addEventListener("click", () => {
    dom.profileModal.style.display = "flex";
    updateProfilesList();
    updateLeaderboard();
});

dom.closeProfileModal.addEventListener("click", () => {
    dom.profileModal.style.display = "none";
});

dom.profileModal.addEventListener("click", (e) => {
    if (e.target === dom.profileModal) {
        dom.profileModal.style.display = "none";
    }
});

dom.createProfileBtn.addEventListener("click", () => {
    const name = dom.profileInput.value.trim();
    if (!name) {
        showError("Введіть ім'я профілю!");
        return;
    }

    if (profileManager.createProfile(name)) {
        dom.profileInput.value = "";
        profileManager.selectProfile(name);
        refreshAllUI();
        updateProfilesList();
        dom.profileModal.style.display = "none";
    } else {
        showError("Профіль з таким ім'ям уже існує!");
    }
});

dom.profileInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        dom.createProfileBtn.click();
    }
});

game.events.on("highscoreUpdated", updateLeaderboardOnScore);

// Клавіші Enter та Space для старту
document.addEventListener("keydown", (e) => {
    if (dom.profileModal.style.display === "flex") return;
    
    const isOverlayVisible = dom.overlay.style.display === "flex" || (dom.overlay.style.display === "" && getComputedStyle(dom.overlay).display === "flex");
    
    if (isOverlayVisible && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        startGame();
    }
});

updateProfileDisplay();
updateLeaderboard();
updateSidebarLeaderboard();