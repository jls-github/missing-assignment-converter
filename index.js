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
    const csvOutputData = [];
    namesArray.forEach((name) => {
      csvOutputData.push({ name: name });
    });
    csvWriter.writeRecords(csvOutputData);
  });
