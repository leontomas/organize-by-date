A simple and powerful file organizer built with Node.js that automatically sorts files by **date (year/month)** and **file type**.

## Features

-  Organizes files by date (Year → Month)
-  Sorts files into categories:
  - Images
  - Videos
  - Audio
  - Documents
  - Compressed files
  - Programs
  - Others 
-  Case-insensitive file extension handling
- 🛡 Prevents file overwrite (collision protection)
-  Automatically creates folders if they don't exist
-  Fast and simple automation script

## ▶️ How to Use

Install Node.js

node -v

Clone the repo

git clone https://github.com/your-username/organize-by-date.git
cd organize-by-date

Run the script

node organize.js /path/to/folder

Example:

node organize.js ~/Downloads

Done ✅

Files will be organized into:

Year/
   Month/
      images/
      videos/
      documents/
      others/
