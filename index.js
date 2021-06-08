const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "out.csv",
  header: [{ id: "name", title: "Name" }],
});

const names = {};

fs.createReadStream("index.csv")
  .pipe(csv())
  .on("data", (row) => {
    names[row["Student Name"]] = true;
  })
  .on("end", () => {
    const namesArray = Object.keys(names);
    for (let i = 0; i < namesArray.length; i++) {
      const splitName = namesArray[i].split(", ");
      if (splitName[1]) {
        const transformedName = `${splitName[1]} ${splitName[0]}`;
        namesArray[i] = transformedName;
      }
    }
    const sortedNamesArray = namesArray.sort();
    const csvOutputData = [];
    sortedNamesArray.forEach((name) => {
      csvOutputData.push({ name: name });
    });
    csvWriter.writeRecords(csvOutputData);
  });
