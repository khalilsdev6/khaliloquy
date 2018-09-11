
/**
 * shouldRouteTo
 * @function used to route to confirm that the test 
 * redirects to another page.
 * @param {String} url of new page
 * @param {Number} max timeout in milliseconds
 */

function shouldRouteTo(url, timeout) {
  var EC = browser.ExpectedConditions;
  browser.wait(EC.urlContains(url), timeout); // Checks that the current URL contains the expected text
  browser.wait(EC.urlIs(url), timeout); // Checks that the current URL matches the expected text
}

// spec.js
beforeAll(() => {
  browser.get('http://localhost:4200/');
})

describe('Khaliloquy Protractor demo', function() {
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Khaliloquy');
  });

  it('should be able to create an account with valid username and password', function () {
    element(by.id('username')).sendKeys("stemmlerhjs");
    element(by.id('password')).sendKeys("hellothisismypasswordnadstuff");
    element(by.id('signup-button')).click();
    shouldRouteTo('http://localhost:4200/lobby', 4000);
  });

  it('should be able to go to the friends list, find a friend, and send them a message', function() {
    element(by.id('/friends')).click();
    shouldRouteTo('http://localhost:4200/friends', 4000);
    // Default conversation messages
    let defaultConversationMessages = element.all(by.css('.message'));
    expect(defaultConversationMessages.count()).toBe(5);

    // Search for user
    element(by.id('friend-search')).sendKeys('nickcave');
    let list = element.all(by.css('.friends-section li'));
    expect(list.count()).toBe(1);

    // Select user
    list.get(0).click();
    
    // Send user messages
    element(by.css('.chat input')).sendKeys('Hey man, whats up?');
    element(by.css('.chat button')).click();
    let messages = element.all(by.css('.message'));
    browser.pause();
    expect(messages.count()).toBe(1);
  });

  
});