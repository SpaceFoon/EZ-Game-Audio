const searchFiles = require("./searchFiles");

test("Make sure the file path is correct", () => {
  const initialPath = "C:\\Users\\username\\Desktop\\"; // replace with your initial file path
  const searchPath = searchFiles(initialPath);
  const isValidPath = /^([a-zA-Z]\:)(\\[^<>:"/|?*]+)+(\.[a-zA-Z]{2,})+$/.test(
    searchPath
  );
  expect(isValidPath).toBe(true);
});
