// Create a test file for the postService module

const postService = require('../services/postService');

describe('postService', () => {
  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      const posts = await postService.getPosts();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

  });
});
