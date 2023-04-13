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

    expect(await renderedPersons.count()).toBe(1);
    expect(await renderedPersons.getAttribute('data-test-person-name')).toBe('');

    await input.type('1');
    await saveButton.click();

    const renderedPersonsEdit = page.locator('[data-test="challenge-edit-person"]');
    const editButton = renderedPersonsEdit.locator('[data-test="challenge-person-edit-name-button"]');

    await editButton.click();

    await input.focus();
    await input.type('2');
    await saveButton.click();

    await editButton.click();

    await input.focus();
    await input.type('3');
    await saveButton.click();

    await editButton.click();

    await input.focus();
    await input.type('4');
    await saveButton.click();

    await editButton.click();

    await input.focus();
    await input.type('5');
    await saveButton.click();


    // The above interactions may fire multiple requests, the responses of which may arrive
    // in a different order. Check that our client has the correct state after any request made.
    requests.onRequest(async function() {
        expect(await renderedPersonsEdit.count()).toBe(1);
    });

    // Let any ongoing requests finish.
    await requests.idle();

    // Fetch the current state of our server and check that everything is ok.
    const persons = await getPersonsFromServer(page);
    
    expect(persons.length).toBe(1);
    expect(persons[0].name).toBe('12345');

    // Geo - we have to wrap the following test case just like it was before
    requests.onRequest(async function() {
        expect(await renderedPersonsEdit.getAttribute('data-test-person-id')).toBe(persons[0].id);
        expect(await renderedPersonsEdit.getAttribute('data-test-person-name')).toBe('12345')
    });
    
});


    // Geo - add test to check reset button
test('Reset button should clear all persons from state and InMemoryDB', async ({ page }) => {
    await page.goto('http://localhost:3000/app');

    const requests = trackRequests(page);

    // Click the "Create Person" button.
    await page.locator('[data-test="challenge-create-person-button"]').click();

    const renderedPersons = page.locator('[data-test="challenge-person"]');
    const input = renderedPersons.locator('[data-test="challenge-person-name"]');
    const saveButton = renderedPersons.locator('[data-test="challenge-person-save-name-button"]');

    // Input a person name and save the person
    await input.type('12345');
    await saveButton.click();

    const renderedPersonsEdit = page.locator('[data-test="challenge-edit-person"]');

    // Click the "Reset" button.
    await page.locator('[data-test="challenge-reset-button"]').click();

    // Check that we have no persons in state or InMemoryDB.
    const personsAfterReset = await getPersonsFromServer(page);
    expect(personsAfterReset.length).toBe(0);

    // Let any ongoing requests finish.
    await requests.idle();
  
    // Check that we have no rendered persons.
    expect(await renderedPersons.count()).toBe(0);
    expect(await renderedPersonsEdit.count()).toBe(0);
  });
  