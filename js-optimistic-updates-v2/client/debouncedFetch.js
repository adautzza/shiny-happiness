// Define a map to keep track of pending updates
const pendingUpdates = new Map();

// A function to send updates to the server
async function sendUpdate(personId, update) {
  // Add the update to the pending updates map
  pendingUpdates.set(personId, update);

  try {
    // Send the update to the server
    const response = await fetch(`/api/persons/${personId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    });

    if (response.ok) {
      // Remove the update from the pending updates map
      pendingUpdates.delete(personId);
    } else {
      // If the update failed, log an error and throw an exception
      console.error(`Failed to update person ${personId}: ${response.status}`);
      throw new Error('Failed to update person');
    }

    // Return the response object
    return response;

  } catch (error) {
    console.error(`Failed to update person ${personId}: ${error.message}`);

    // If the update failed, remove the update from the pending updates map
    pendingUpdates.delete(personId);

    // Rethrow the error so the calling code can handle it
    throw error;
  }
}

// A function to debounce updates
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn.apply(this, args);
      timerId = null;
    }, delay);
  };
}

// Wrap the sendUpdate function with the debounce function
export const debouncedFetch = debounce(sendUpdate, 500);
