#!/usr/bin/env node

const {
  getBiblePassage,
  getBibleBooks,
  getBibleBooksOldTestament,
  getBibleBooksNewTestament,
} = require("../src");
const { help } = require("./help");

const getBiblePassageCli = async () => {
  const passage = process.argv
    .find((val) => val.includes("--passage") || val.includes("--p"))
    .split("=")[1];

  const result = await getBiblePassage(passage);

  console.log(passage + "\n");

  result.forEach((v) => {
    console.log(`${v.verse}. ${v.text}`);
  });
};

const showBibleBooksCli = () => {
  const currentCommand = process.argv;
  let bookList = getBibleBooks();

  if (currentCommand.includes("--old")) {
    bookList = getBibleBooksOldTestament();
  }

  if (currentCommand.includes("--new")) {
    bookList = getBibleBooksNewTestament();
  }

  console.table(bookList);
};

const parseCommand = () => {
  const currentCommand = process.argv;

  const commandList = [
    { option: "--p", foo: getBiblePassageCli },
    { option: "--passage", foo: getBiblePassageCli },
    { option: "--showBooks", foo: showBibleBooksCli },
    { option: "--help", foo: help },
  ];

  commandList.forEach((c) => {
    if (currentCommand.find((val) => val.includes(c.option))) {
      c.foo();
    }
  });
};

const main = () => {
  parseCommand();
};

main();
