// Instrospective01.js tests

const intros01 = require("../introspective01")
const path = require('path');
const wordsPath = path.join(process.cwd(), "examples/01.txt");

describe("Instrospection01 TestCases", () => {
  test("Read Stop Words Functionality, wrong context", () => {
    expect(intros01.readStopWords()).toBe(false)
  });

  test("Read Stop Words Functionality, correct context", () => {
    expectedValue = ["o", "a", "um", "se", "de", "da", "na", "no", "para", "per", "perante","por","sob","e","sem"]
  expect(intros01.readStopWords(true)).toStrictEqual(expectedValue)
  })

  test("Extract Words Functionality Composed", () => {
    expectedValue = [
        "este",
        "exemplo",
        "texto",
        "aleatorio",
        "digitado",
        "muito",
        "proposito",
        "mas",
        "acho",
        "que",
        "serve",
        "como",
        "texto",
        "exemplo",
    ]      
      expect(intros01.extractWords(wordsPath)).toStrictEqual(expectedValue)
  })

  test("Frequencies Functionality Composed", () => {
    const extractedWords = intros01.extractWords(wordsPath)
    
    result = intros01.frequencies(extractedWords)
    expected = {"acho": 1, "aleatorio": 1, "como": 1, "digitado": 1, "este": 1, "exemplo": 2, "mas": 1, "muito": 1, "proposito": 1, "que": 1, "serve": 1, "texto": 2}

    expect(result).toStrictEqual(expected)
  })

  test("Frequencies Functionality", () => {
    const inputWords = ["ola", "ola", "tchau"]
    result = intros01.frequencies(inputWords)
    expected = {"ola":2, "tchau":1}
    expect(result).toStrictEqual(expected)
  })

  test("Sort Frequencies Functionality Composed", () => {
    const extractedWords = intros01.extractWords(wordsPath)
    const frequencies = intros01.frequencies(extractedWords)

    result = intros01.sort(frequencies)
    expected = [["exemplo",2],
      ["texto", 2],
      ["este", 1],
      ["aleatorio", 1],
      ["digitado", 1],
      ["muito", 1],
      ["proposito", 1],
      ["mas", 1],
      ["acho", 1],
      ["que", 1],
      ["serve", 1],
      ["como", 1]]

    expect(result).toStrictEqual(expected)
  })

  test("Sort Functionality Lonely", () => {
    frequenciesInput = {"a": 1, "ola": 5, "credo": 0}
    expected = [["ola", 5], ["a", 1], ["credo", 0]]

    result = intros01.sort(frequenciesInput)
    console.log(result)
    expect(result).toStrictEqual(expected)
  })
});