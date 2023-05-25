const { test, expect } = require('@playwright/test');
const debounce = require('lodash.debounce');

const getPersonsFromServer = async function(page) {
    const response = await page.request.get('http://localhost:3000/persons');
    const body = await response.body();
    return JSON.parse(body);
};

const createDeferred = function() {
    const deferred = {};

    deferred.promise = new Promise(function(resolve, reject) {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });

    return deferred;
};

const trackRequests = function(page) {
    const requests = new Set();
    const deferred = createDeferred();
    const check = debounce(function() {
        if (requests.length > 0) return;
        deferred.resolve();
    }, 500);

    let onRequest = () => {};

    page.on('request', async function(request) {
        requests.add(request);
        await request.response();
        requests.delete(request);
        onRequest();
        check();
    });

    return {
        idle() {
            return deferred.promise;
        },
        onRequest(callback) {
            onRequest = callback;
        },
    };
};

test.beforeEach(async function({ page }) {
    // Reset our InMemoryDB every time we run a test.
    await page.request.post('http://localhost:3000/reset');
});

test('Challenge', async ({ page }) => {
    await page.goto('http://localhost:3000/app');

    const requests = trackRequests(page);

    // Click the "Create Person" button.
    await page.locator('[data-test="challenge-create-person-button"]').click();

    const renderedPersons = page.locator('[data-test="challenge-person"]');
    const input = renderedPersons.locator('[data-test="challenge-person-name"]');
    const saveButton = renderedPersons.locator('[data-test="challenge-person-save-name-button"]');

    // An empty input should already be visible at this stage, the user should not have to wait.
    expect(await renderedPersons.count()).toBe(1);
    expect(await renderedPersons.getAttribute('data-test-person-name')).toBe('');

    await input.type('1');
    await saveButton.click();

    await input.focus();
    await input.type('2');
    await saveButton.click();

    await input.focus();
    await input.type('3');
    await saveButton.click();

    await input.focus();
    await input.type('4');
    await saveButton.click();

    await input.focus();
    await input.type('5');
    await saveButton.click();

    // The above interactions may fire multiple requests, the responses of which may arrive
    // in a different order. Check that our client has the correct state after any request made.
    requests.onRequest(async function() {
        expect(await renderedPersons.count()).toBe(1);
        expect(await renderedPersons.getAttribute('data-test-person-name')).toBe('12345');
    });

    // Let any ongoing requests finish.
    await requests.idle();

    // Fetch the current state of our server and check that everything is ok.
    const persons = await getPersonsFromServer(page);
    expect(persons.length).toBe(1);
    expect(persons[0].name).toBe('12345');

    // Finally check that the client is indeed synced with our server.
    expect(await renderedPersons.getAttribute('data-test-person-id')).toBe(persons[0].id);
});
