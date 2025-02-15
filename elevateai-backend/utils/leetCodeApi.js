const axios = require('axios');

class LeetCodeAPI {
  async getUserStats(username) {
    try {
      const response = await axios.get(`https://leetcode.com/graphql`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
            query getUserProfile($username: String!) {
              matchedUser(username: $username) {
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
            }
          `,
          variables: {
            username,
          },
        },
      });

      const stats = response.data.data.matchedUser.submitStats.acSubmissionNum;
      const { totalSolved, easySolved, mediumSolved, hardSolved } = stats.reduce(
        (acc, curr) => {
          if (curr.difficulty === 'All') {
            acc.totalSolved = curr.count;
          } else if (curr.difficulty === 'Easy') {
            acc.easySolved = curr.count;
          } else if (curr.difficulty === 'Medium') {
            acc.mediumSolved = curr.count;
          } else if (curr.difficulty === 'Hard') {
            acc.hardSolved = curr.count;
          }
          return acc;
        },
        { totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 }
      );

      return { totalSolved, easySolved, mediumSolved, hardSolved };
    } catch (error) {
      console.error('Error fetching LeetCode user stats:', error.message);
      throw error;
    }
  }
}

module.exports = new LeetCodeAPI();