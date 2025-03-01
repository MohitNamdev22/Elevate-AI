const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/addUser', UserController.addUser);
router.get('/user/:id', UserController.getUserById);
router.put('/user/:id', UserController.updateUser);
// Route to get GitHub details for a student
router.get('/:id/github-details', UserController.getGitHubDetails);
// Route to get total commits and commits in the last 7 days for a repository
router.get('/repos/:owner/:repo/commits', UserController.getRepoCommits);
router.get('/:id/total-commits', UserController.getTotalCommitsForUser);
router.get('/:id/commits-last-7-days', UserController.getCommitsLast7DaysForUser);

// Route to get LeetCode stats for a user
router.get('/:id/leetcode-stats', UserController.getLeetCodeStats);

// Route to get top categories based on student profile
router.post('/top-categories', UserController.getTopCategories);
// Route to get job recommendations based on top categories
router.post('/top-categories-and-jobs', UserController.getTopCategoriesAndJobs);

router.get("/registeredUser/:email",UserController.getUserRegisteredOrNot)



module.exports = router;