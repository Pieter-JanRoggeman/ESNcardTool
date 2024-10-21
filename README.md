🎫 ESNcard Status Checker
=========================

Welcome to the **ESNcard Status Checker**! This Google Apps Script adds a custom menu to your Google Sheets, allowing you to check the status of ESNcards directly from the spreadsheet. It's perfect for quickly verifying the status of multiple ESNcards with just a few clicks!

🛠 Features
-----------

*   🖥️ **Custom Sidebar:** Check ESNcards from a simple sidebar interface.
    
*   📊 **Status Updates:** Display ESNcard statuses like _active_, _inactive_, _invalid_, and _available_.
    
*   🟢 **Color-Coded Results:** Automatically color the cells based on the card status.
    
*   🚀 **Easy Integration:** Works with any Google Spreadsheet.
    

🚀 How to Use
-------------

### Step 1: Copy the Script to Your Spreadsheet

1.  **Open your Google Spreadsheet.**
    
2.  **Go to the menu bar** and click on Extensions ➡️ Apps Script.
    
3.  javascriptCode kopiëren// (Insert full Apps Script code here)
    
4.  **Save the script** by clicking the disk icon 💾 at the top.
    

### Step 2: Create the Sidebar HTML File

1.  In the Apps Script editor, click on the **plus (+)** sign next to Files 📂 and select HTML.
    
2.  htmlCode kopiëren// (Insert the full Sidebar HTML code here)
    
3.  **Save the HTML file** as well.
    

### Step 3: Refresh and Open the Sidebar

1.  **Refresh your Google Spreadsheet**.
    
2.  You will see a new menu called ESNcard Checker at the top of the sheet.
    
3.  Click on ESNcard Checker ➡️ Open Sidebar to launch the ESNcard status checker!
    

### Step 4: Check ESNcard Statuses

1.  Enter the **column letter** where your ESNcard numbers are located (e.g., A).
    
2.  Optionally, enter the **output column letter** where the statuses should appear (e.g., B).
    
3.  Click **Check ESNcard Statuses**, and watch the results populate with color-coded statuses! 🎨
    

📊 Status Key:
--------------

*   🟢 **Active:** The card is active.
    
*   🔴 **Inactive:** The card is inactive.
    
*   ⚠️ **Invalid:** The card number is invalid (wrong format).
    
*   🔵 **Available:** The card is available but not yet activated.
    

⚠️ Important Notes
------------------

*   This script checks ESNcard statuses via the ESN API. Be sure you have **correct API access** to use the script.
    
*   The script assumes that your ESNcard numbers start from row 2 in the spreadsheet (to skip the header).
    

📄 License
----------

This project is open-sourced under the MIT License.

### 🔗 Useful Links

*   [Google Apps Script](https://developers.google.com/apps-script)
