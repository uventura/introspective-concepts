const fs = require('fs');
const path = require('path');
const process = require('process');

// Palavras que não serão consideradas
function readStopWords(ignoreContext = false)
{
  // Você precisa conhecer sobre o nome da função que chama
  // para permitir que esta possa ser chamada
  if(!ignoreContext && readStopWords.caller.name != "extractWords")
  {
    return false; 
  }

  const stopWordsPath = path.join(process.cwd(), "data/stop_words.txt");
  const stopWords = fs.readFileSync(stopWordsPath, 'utf8').toLowerCase().split(',');
  return stopWords;
}

// Extração de Palavras
function extractWords(pathToFile)
{
  const strData = fs.readFileSync(pathToFile, 'utf8');
  const pattern = /[\W_]+/g;
  const cleanedText = strData.replace(pattern, ' ').toLowerCase();
  const stopWords = readStopWords();
  const wordList = cleanedText.split(' ');

  return wordList.filter(word => !stopWords.includes(word));
}

// Contagem de Frequências
function frequencies(wordList)
{
  const wordFreqs = {};
  for (const w of wordList)
  {
    if (wordFreqs[w])
    {
      wordFreqs[w]++;
    }
    else
    {
      wordFreqs[w] = 1;
    }
  }
  return wordFreqs;
}

// Ordenação do dicionário
function sort(wordFreq)
{
  // Object.entries() => Converter o dicionário em uma vetor de vetores.
  // sort()           => Ordenar o vetor considerando suas frequências.
  const sortedWordFreq = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]);
  return sortedWordFreq;
}

function main() {
  if (process.argv.length < 3) {
    console.log('Uso: node instrospective01.js arquivo_de_entrada.txt');
    process.exit(1);
  }

  const inputFileName = process.argv[2];
  const wordList = extractWords(inputFileName);
  const wordFreq = frequencies(wordList);
  const sortedWordFreq = sort(wordFreq);

  for (let i = 0; i < Math.min(25, sortedWordFreq.length); i++) {
    const [word, count] = sortedWordFreq[i];
    console.log(`${word} - ${count}`);
  }
}

module.exports = {
  readStopWords,
  extractWords,
  frequencies,
  sort
}

// Exemplo:
//    node introspective01.js examples/01.txt
if (require.main === module) {
  main();
}