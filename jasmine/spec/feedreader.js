/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Test that loops through each feed in the allFeeds object
     * and ensures it has a URL defined and that the URL is not
     * empty.
    */
    it('urls are defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe("");
      });
    });

    /* Test that loops through each feed in the allFeeds object
     * and ensures it has a name defined and that the name is not
     * empty.
    */
    it('names are defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toBe("");
      });
    });
  });


  /* New Test Suite for menu testing */
  describe('The menu', function() {
    // Test that ensures the menu element is hidden by default.
    it('is hidden by default', function(){
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });

    /* Test that ensures the menu changes visibility when the menu
     * icon is clicked. This test has two expectations: does the menu
     * display when clicked and does it hide when clicked again.
     * This is realized through the beforeEach method and 2 declared
     * functions.
    */

    describe('Button', function() {
      const menuButton = $('.menu-icon-link');

      // Check if menu toggles after click
      it('menu toggles on click', function () {
        //Click and check if shown
        menuButton.click();
        expect($('body').hasClass('menu-hidden')).toBeFalsy();

        // Click again and check if hidden
        menuButton.click();
        expect($('body').hasClass('menu-hidden')).toBeTruthy();
      });
    });
  });


  /* New test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    const feed = $('.feed')[0];
    let entries;

    /* A test that checks the loadFeed function is called and
     * completes its work, there is at least a single .entry element
     * within the .feed container.
    */
    // loadFeed and wait until done loading before checking expectation
    beforeEach(function(done) {
      loadFeed(0, function() {
        entries = $('.feed .entry')[0];
        done();
      });
    });

    // Check that feed container has at least one child element
    it('at least one loaded', function() {
      expect(feed.children.length).not.toBe(0);
      expect(entries.children.length).not.toBe(0);
    });
  });


  /* New test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    // TODO: Create way to loop through each Feed and compare with prior feed

    /* A test that checks if the feed content updates when the
     * feed selection changes.
    */
    // Declare Array for feeds
    const firstFeeds = [];

    // Function run before specs run as soon as loadFeed(); finishes
    beforeEach(function(done) {
      /* Load 2nd feed, store first child and call loadFeed on first feed
       * when finished.
       * Store first feed elements into Array. Needed for comparision later
      */
      loadFeed(1, function() {
        firstFeeds.push($('.feed')[0].firstElementChild);
        loadFeed(0, function() {
          firstFeeds.push($('.feed')[0].firstElementChild);
          done();
        });
      });
    });

    // Ensure Feed Content has changed by comparing Array elements
    it('content updates', function() {
      expect(firstFeeds[0]).not.toBe(firstFeeds[1]);
    });
  });
}());
