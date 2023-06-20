// Create a test file for the postService module

const postService = require('../services/postService');


// Mock the wordpressApi module
jest.mock('../api/wordpress', () => ({
  getPosts: jest.fn(() => Promise.resolve([
    // Sample post data
    {
      id: 1,
      date: '2023-06-19T10:00:00',
      title: { rendered: 'Sample Post' },
      link: 'https://example.com/sample-post',
      featured_media: 1,
      _embedded: {
        author: [{ name: 'John Doe' }],
        'wp:term': [
          null,
          null,
          [{ name: 'Category' }],
        ],
      },
    },
  ])),
}));

describe('PostService', () => {
  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      const posts = await postService.getPosts();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('should fetch and return posts', async () => {
      const posts = await postService.getPosts();
      expect(posts).toEqual([
        // Expected post object
        {
          id: 1,
          date: '19 June 2023',
          title: 'Sample Post',
          link: 'https://example.com/sample-post',
          featured_media: 1,
          author_name: 'John Doe',
          category: 'Category',
          type: 'Uncategorized',
        },
      ]);
    });

    it('should return an empty array when an error occurs', async () => {
      // Mock the getPosts function to throw an error
      jest.spyOn(require('../api/wordpress'), 'getPosts').mockImplementation(() => {
        throw new Error('API Error');
      });

      const posts = await postService.getPosts();
      expect(posts).toEqual([]);
    });
  });
});
