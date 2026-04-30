export default class ProfileManager {
    constructor() {
        this.profiles = this.loadProfiles();
        this.currentProfile = this.loadCurrentProfile();
    }

    loadProfiles() {
        const saved = localStorage.getItem('snakeProfiles');
        return saved ? JSON.parse(saved) : {};
    }

    saveProfiles() {
        localStorage.setItem('snakeProfiles', JSON.stringify(this.profiles));
    }

    loadCurrentProfile() {
        const current = localStorage.getItem('snakeCurrentProfile');
        return current && this.profiles[current] ? current : null;
    }

    saveCurrentProfile(name) {
        if (name) {
            localStorage.setItem('snakeCurrentProfile', name);
        } else {
            localStorage.removeItem('snakeCurrentProfile');
        }
    }

    createProfile(name) {
        if (!name || this.profiles[name]) {
            return false;
        }

        this.profiles[name] = {
            name,
            highScore: 0,
            gamesPlayed: 0,
            totalScore: 0,
            createdAt: new Date().toISOString()
        };

        this.saveProfiles();
        return true;
    }

    selectProfile(name) {
        if (!this.profiles[name]) {
            return false;
        }

        this.currentProfile = name;
        this.saveCurrentProfile(name);
        return true;
    }

    deleteProfile(name) {
        if (!this.profiles[name]) {
            return false;
        }

        delete this.profiles[name];

        if (this.currentProfile === name) {
            this.currentProfile = null;
            this.saveCurrentProfile(null);
        }

        this.saveProfiles();
        return true;
    }

    getCurrentProfile() {
        return this.currentProfile ? this.profiles[this.currentProfile] : null;
    }

    updateScore(score) {
        const profile = this.getCurrentProfile();
        if (!profile) return;

        profile.gamesPlayed++;
        profile.totalScore += score;

        if (score > profile.highScore) {
            profile.highScore = score;
        }

        this.saveProfiles();
    }

    getAllProfiles() {
        return Object.values(this.profiles)
            .sort((a, b) => b.highScore - a.highScore);
    }

    getProfileNames() {
        return Object.keys(this.profiles);
    }
}
