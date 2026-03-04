
import { readFileSync } from 'node:fs';
import {expect, test, describe, beforeAll} from '@jest/globals';
import { DungeonGame } from './DungeonGame';
import { Dungeon } from './Dungeon';

type DungeonTest = {
  testName: string
  inputFile: string
  outputFile: string
  levelFile: string
  dungeon: Dungeon
}

class ConsoleLogPatch {
  logs: Array<string> = []
  badLogs: Array<any> = []

  constructor(logs: Array<string>, badLogs: Array<any>) {
    this.logs = logs;
    this.badLogs = badLogs;
  }

  reset() {
    this.logs.length = 0;
    this.badLogs.length = 0;
  }

  log(...data: any) {
    if(typeof data === 'string') {
      this.logs.push(data);
    } else {
      this.badLogs.push(data);
    }
  }

  stitchOutput() {
    return this.logs.join('\n');
  }
}

let logs: Array<string> = [];
let badlogs: Array<any> = [];

function logsReset() {
  logs.length = 0;
  badlogs.length = 0;
}

function stdinPatch() {
  let logger = new ConsoleLogPatch(logs, badlogs);
  let original_log = console.log;
  
  console.log = function(...args: any) {
    logger.log(...args);
    original_log(...args);
  }
}

function loadData(path: string): string | null {
  const data = readFileSync(path, { encoding: 'utf8', flag: 'r' });
  if(data.length < 1) {
    return null;
  } else {
    return data;
  }
}

function splitOnNewline(input: string): Array<string> {
  return new Array(
    ...input.split("\n")
  );
}

async function fileTest(dtest: DungeonTest) {
  const testName = dtest.testName;
  const inputFile = dtest.inputFile;
  const outputFile = dtest.outputFile;

  const dungeon = dtest.dungeon;  

  const inputData = loadData(inputFile);
  const outputData = loadData(outputFile);
  let inputLines: Array<string> = [];
  if(inputData) {
    inputLines = splitOnNewline(inputData);
  }
  test(testName, function() {
  
    expect(dungeon).not.toEqual(null);
    if(dungeon) {
      const game = new DungeonGame(dungeon);
      for(const line of inputLines) {
        game.perform(line);
      }
      const actual = stitchOutput(logs)

      expect(actual).toEqual(outputData);
    }
  });
  
  return;
}


function stitchOutput(logs: Array<string>) {
  let result = logs.join('\n');
  logsReset();
  return result;
}

function procTest(name: string, dungeon: Dungeon) {
  if(name) {
    fileTest({
      testName: `${name}`,
      inputFile: `./testfiles/${name}.in`,
      outputFile: `./testfiles/${name}.out`,
      levelFile: `./testfiles/${name}.dg`,
      dungeon
    });
  }
}
/*
async function procTestGen(tests: Array<string>) {
  if(tests.length > 0) {
  
    for(let i = 0; i < tests.length; i++) {
      const name = tests[i];
      if(name) {
        await procTest(name, );
      }
    }
  }
  return;
}*/

stdinPatch();


/*
procTest('dungeon1')
procTest('dungeon2');
procTest('dungeon3');
procTest('dungeon4');
procTest('lost_woods');*/

let iotests = ['dungeon1', 'dungeon2', 'dungeon3', 'dungeon4', 'lost_woods']
let dungeons: Array<Dungeon> = []

beforeAll(async () => {
  for(const name of iotests) {
    let d = await Dungeon.loadFrom(name);
    if(d) {
      dungeons.push(d);
    }
  }
})

let i = 0;
for(const name of iotests) {
  const ddg = dungeons[i]
  if(ddg) {
    procTest(name, ddg);
  }
  i++;
}
