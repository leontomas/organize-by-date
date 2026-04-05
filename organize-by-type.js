const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

/**
 * Configuration: Target folder to organize (relative to script location).
 * Set to "../" to organize the parent directory (e.g., Downloads folder).
 */
const TARGET_FOLDER = "../";

/**
 * File type categories with their extensions.
 * Files are categorized based on their extension (case-insensitive).
 */
const FILE_TYPES = {
  images: [".jpg", ".png", ".jpeg", ".gif", ".bmp", ".tiff", ".tif", ".webp", ".svg", ".ico", ".jfif"],
  videos: [".mp4", ".mkv", ".mov", ".ts", ".avi", ".wmv", ".flv", ".webm", ".m4v", ".3gp", ".mpg", ".mpeg"],
  audio: [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a", ".wma"],
  documents: [".pdf", ".docx", ".txt", ".epub", ".doc", ".pptx", ".xlsx", ".rtf", ".odt", ".csv"],
  compressed: [".7z", ".zip", ".rar", ".tar", ".gz", ".bz2", ".xz"],
  programs: [".exe", ".msi", ".bat", ".cmd", ".jar"]
};

/**
 * Main function to organize files in the target folder.
 * Reads files, categorizes them by extension, and moves them to type-based subfolders.
 */
async function organizeFiles() {
  try {
    const files = await fsp.readdir(TARGET_FOLDER);

    for (const file of files) {
      const fullPath = path.join(TARGET_FOLDER, file);

      // Skip directories
      const stat = await fsp.lstat(fullPath);
      if (stat.isDirectory()) {
        continue;
      }

      const category = getFileCategory(file);
      await moveFile(file, category);
    }

    console.log("File organization completed.");
  } catch (err) {
    console.error("Error organizing files:", err);
  }
}

/**
 * Determines the category of a file based on its extension.
 * @param {string} file - The filename.
 * @returns {string} - The category name (e.g., "images", "others").
 */
function getFileCategory(file) {
  const ext = path.extname(file).toLowerCase();

  for (const [category, extensions] of Object.entries(FILE_TYPES)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }

  return "others"; // Default category for unmatched files
}

/**
 * Moves a file to its categorized folder by file type.
 * @param {string} file - The filename.
 * @param {string} category - The category folder name.
 */
async function moveFile(file, category) {
  const oldPath = path.join(TARGET_FOLDER, file);

  // Construct the new folder path: ../category/
  const newFolder = path.join(TARGET_FOLDER, category);

  // Ensure the folder exists
  try {
    await fsp.mkdir(newFolder, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }

  const newPath = path.join(newFolder, file);

  // Move the file
  try {
    await fsp.rename(oldPath, newPath);
    console.log(`Moved: ${file} → ${newPath}`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`Skipped: ${file} (already exists at ${newPath})`);
    } else {
      throw err;
    }
  }
}

// Run the organization
organizeFiles();
