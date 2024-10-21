function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('ESNcard Checker')
    .addItem('Open Sidebar', 'showSidebar')
    .addToUi();
}

/**
 * Displays the sidebar for ESNcard status checking.
 */
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('ESNcard Status Checker')
      .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Checks the ESN card statuses for all rows in the specified column.
 *
 * @param {string} columnLetter - The letter of the column containing ESN codes.
 * @param {string} outputColumnLetter - The letter of the column for output statuses (optional).
 * @returns {Object} An object containing counts of each status type and total checked cards.
 */
function checkAllESNCardStatuses(columnLetter, outputColumnLetter) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  // Validate the column letter
  if (!/^[A-Z]{1,2}$/.test(columnLetter)) {
    throw new Error('Invalid input for column letter: ' + columnLetter);
  }

  if (lastRow < 2) {
    throw new Error('No data in the specified column.');
  }

  var columnRange = columnLetter + '2:' + columnLetter + lastRow; // Skip the header
  var range;

  // Validate the range
  try {
    range = sheet.getRange(columnRange);
  } catch (e) {
    throw new Error('Range not found: ' + columnRange);
  }

  var values = range.getValues();
  var statusCounts = {
    active: 0,
    inactive: 0,
    invalid: 0,
    available: 0,
    error: 0,
    totalChecked: 0
  };

  values.forEach(function(row) {
    var esnCode = row[0];
    var status = 'inactive'; // Default status

    if (esnCode && esnCode.toString().length === 11) {
      try {
        var fetchedData = fetchESNCardStatus(esnCode.toString());
        status = fetchedData.length > 0 ? fetchedData[0].status || 'inactive' : 'inactive';

        // Count available cards
        if (status === 'available') {
          statusCounts.available++;
        }
      } catch (e) {
        status = 'error'; // Handle fetch error
        statusCounts.error++; // Increment error count
      }
    } else if (esnCode) {
      status = 'invalid';
    }

    // Update status counts
    if (statusCounts.hasOwnProperty(status)) {
      statusCounts[status]++;
    }

    // Update total checked count
    statusCounts.totalChecked++;

    // Update output column if specified
    if (outputColumnLetter) {
      var statusCell = outputColumnLetter + (values.indexOf(row) + 2); // Correct index calculation
      sheet.getRange(statusCell).setValue(status);
      var esnCell = sheet.getRange(columnLetter + (values.indexOf(row) + 2));
      updateCellColor(esnCell, status);
    }
  });

  return statusCounts; // Return status counts instead of individual results
}

/**
 * Updates the background color of a cell based on its status.
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} cell - The cell to update.
 * @param {string} status - The status to determine the cell's color.
 */
function updateCellColor(cell, status) {
  if (status === 'active') {
    cell.setBackground('#a5d6a7'); // Green for active
  } else if (status === 'inactive' || status === 'invalid') {
    cell.setBackground('#ef9a9a'); // Red for inactive or invalid
  } else if (status === 'available') {
    cell.setBackground('#90caf9'); // Blue for available
  } else {
    cell.setBackground('#ffffff'); // Default to white
  }
}

/**
 * Fetches the status of an ESN card using its code.
 *
 * @param {string} esnCode - The ESN code to check.
 * @returns {Object} The fetched data from the ESN card service.
 */
function fetchESNCardStatus(esnCode) {
  var url = 'https://esncard.org/services/1.0/card.json?code=' + esnCode;
  
  try {
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    var data = JSON.parse(json);
    
    return data;
  } catch (e) {
    throw new Error('Error fetching or parsing data: ' + e.message);
  }
}
