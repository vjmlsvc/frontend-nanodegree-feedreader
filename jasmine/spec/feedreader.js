/$(function() {
    describe('RSS Feeds', function() {
        /* Tests that "allFeeds" is defined and populated
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0)
        });


        /* Tests that each entry has a URL
         */
         it('have URLs', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toBeTruthy();
            }
         });

        /* Tests that each entry has a name
         */
         it('have names', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeTruthy();
            }
         });
    });

    describe('The menu', function() {
        /* Tests that the menu is hidden by default
         */
        it('is initially hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

         /* Tests that the visibility of the menu toggles properly
          */
        it('toggles visibility when menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        /* Tests that once "loadFeed(0)" finishes executing the
         * ".feed" is populated with at least one ".entry"
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least one entry', function() {
            expect($('.feed').find('.entry')[0]).toBeDefined();
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        var entries = [];

        /* Tests that once "loadFeed(0)" and "loadFeed(1)" have
         * finished executing there was a change made to the ".feed"
         * by checking the content of the first ".entry"
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                entries.push($('.feed').find('.entry')[0]);
                loadFeed(1, function() {
                    entries.push($('.feed').find('.entry')[0]);
                    done();
                });
            });
        });

        it('updates the feed', function() {
            expect(entries[0]).toBeDefined();
            expect(entries[1]).toBeDefined();
            expect(entries[0].innerHTML).not.toEqual(entries[1].innerHTML);
        });
    });
}());
