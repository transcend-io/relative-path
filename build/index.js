/**
 *
 * ## RealtivePath
 * A simple class that has utilities for accessing/manipulating files from some relative path, and expected extensions.
 *
 * @module RealtivePath
 */
// // external modules
// import { existsSync, unlinkSync } from 'fs';
// import { join } from 'path';
// // commons
// import cases from '@commons/cases';
// import transformCase from '@commons/utils/transformCase';
// // global
// import listFiles from '@checks/utils/listFiles';
// import listFolders from '@checks/utils/listFolders';
// import writeFile from '@checks/utils/writeFile';
// // local
// import listExportsConfig from './listExportsConfig';
// import listImports from './listImports';
// import listImportsWithInd from './listImportsWithInd';
// /**
//  * Helper functions for a path in a repository
//  *
//  * @property {Function} getFile - Get a file relative to the path
//  * @property {Function} getFolder - Get a folder relative to the path
//  * @property {Function} hasFile - Check if the path has a file
//  * @property {Function} hasFolder - Check if the path has a folder
//  * @property {Function} readFile - Read the contents of a file from the path
//  * @property {Function} listFiles - List the files in the directory
//  * @property {Function} listFolders - List the folders in the directory
//  * @property {Function} removeFile - Remove a file
//  * @property {Function} writeFile - Write contents to a file
//  * @property {Function} listImports - List imports in a file
//  * @property {Function} listImportsWithInd - List imports in a file with line numbers
//  * @property {Function} listExports - List exports in a file
//  * @property {Function} hasFileExport - Check if an export exists in a file
//  * @property {Function} hasFileImport - Check if an import exists in a file
//  */
// export type PathHelpers = {};
// /**
//  * Configuration for file sections
//  *
//  * @typedef {Object} SectionOptions
//  * @property {string}   section - The name of the section
//  * @property {string[]} sections - The ordering of the sections
//  */
// export type SectionOptions = {};
// // Remove the / at the start of a string
// const removeStartSlash = (fil: string): string =>
//   fil.startsWith('/') ? fil.slice(1, fil.length) : fil;
// /**
//  * Create helper functions for a path in the repository
//  *
//  * @param basePath - The path from which the helper functions should originate
//  * @param extension - When last arg to a function is true, add the extension to the file
//  * @returns {module:Repository/typeDefs~PathHelpers} The helper functions for that path
//  */
// export default function createPathHelpers(
//   basePath: string,
//   extension: string,
// ): PathHelpers {
//   // Get a relative file path
//   const getFile = (fil) => join(basePath, addFileExtension(fil, extension));
//   // const getFile = (fil) => {
//   //   let fil;
//   //   for (ext in extensions) {
//   //     fil = join(basePath, addFileExtension(fil, ext));
//   //     if (existsSync(fil)) return fil;
//   //   }
//   //   return fil;
//   // };
//   // Get a relative folder path
//   const getFolder = (fil) => join(basePath, fil);
//   // Check if a file exists
//   const hasFile = (fil) => existsSync(getFile(fil));
//   return {
//     getFile,
//     getFolder,
//     hasFile,
//     removePath: (fil) =>
//       fil.includes(basePath)
//         ? removeStartSlash(fil.replace(basePath, ''))
//         : fil,
//     // Check if a folder exists
//     hasFolder: (fil) => existsSync(getFolder(fil)),
//     // Read the contents of a file
//     readFile: (fil) => (!hasFile(fil) ? null : readFile(getFile(fil))),
//     // List the files in the folder
//     listFiles: (subDir = '.') => listFiles(getFolder(subDir)),
//     // List the folders in the folder
//     listFolders: (subDir = '.') => listFolders(getFolder(subDir)),
//     // Remove a file
//     removeFile: (fil) => {
//       // The location of the file
//       const fileLoc = getFile(fil);
//       // If it exists, remove it
//       if (existsSync(fileLoc)) {
//         unlinkSync(fileLoc);
//         return true;
//       }
//       // File did not exist
//       return false;
//     },
//     // Write a file
//     writeFile: (fil, contents) => writeFile(getFile(fil), contents),
//   };
// }
// # sourceMappingURL=index.js.map
