const axios = require('axios');

class GitHubAPI {
  constructor() {
    this.baseURL = 'https://api.github.com';
  }

  // Get user public information
  async getUserInfo(username) {
    try {
      const response = await axios.get(`${this.baseURL}/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user info:', error.message);
      throw error;
    }
  }

  // List public repositories for a user
  async listUserRepos(username) {
    try {
      const response = await axios.get(`${this.baseURL}/users/${username}/repos`);
      return response.data;
    } catch (error) {
      console.error('Error listing repositories:', error.message);
      throw error;
    }
  }

  // Get total number of commits for a repository
  async getTotalCommits(owner, repo) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/commits`);
      return response.data.length;
    } catch (error) {
      console.error('Error getting total commits:', error.message);
      throw error;
    }
  }

  // Get number of commits in the last 7 days for a repository
  async getCommitsLast7Days(owner, repo) {
    try {
      const since = new Date();
      since.setDate(since.getDate() - 7);
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/commits`, {
        params: {
          since: since.toISOString()
        }
      });
      console.log(response.data)
      return response.data.length;
    } catch (error) {
      console.error('Error getting commits in the last 7 days:', error.message);
      throw error;
    }
  }
  async getTotalCommitsForUser(username) {
    try {
        console.log(username)
      const repos = await this.listUserRepos(username);
      let totalCommits = 0;

      for (const repo of repos) {
        const commits = await this.getTotalCommits(username, repo.name);
        totalCommits += commits;
      }

      return totalCommits;
    } catch (error) {
      console.error('Error getting total commits for user:', error.message);
      throw error;
    }
  }

    // Get number of commits in the last 7 days across all repositories for a user
    async getCommitsLast7DaysForUser(username) {
        try {
          const repos = await this.listUserRepos(username);
          let totalCommitsLast7Days = 0;
    
          for (const repo of repos) {
            const commits = await this.getCommitsLast7Days(username, repo.name);
            totalCommitsLast7Days += commits;
          }
    
          return totalCommitsLast7Days;
        } catch (error) {
          console.error('Error getting commits in the last 7 days for user:', error.message);
          throw error;
        }
      }
}

module.exports = new GitHubAPI();