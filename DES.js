const { chunk, logger } = require("./utils");

const S = {
  s1: [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
  ],
  s2: [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
  ],
  s3: [
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
  ],
  s4: [
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
  ],
  s5: [
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
  ],
  s6: [
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
  ],
  s7: [
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
  ],
  s8: [
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
  ]
};
// prettier-ignore
const P = [
  16, 7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25];

function DESfunction(lOld, rOld, roundKey) {
  console.log(
    "****************************************\n For Generating LNew \n"
  );
  logger("LNew = ROld", rOld);

  console.log(
    "****************************************\n For Generating RNew\n"
  );
  const eOFR = expandTo48bit(rOld);
  logger("Expanding ROld to 48 bit", eOFR);

  const rNew = xOR(roundKey, eOFR, "48");
  logger("XOR with the round key", rNew);

  // divide into 8 groups of 6 bits
  const splittedRNew = arraySplitter(rNew, 8, true);
  logger("Divide into 8 groups", splittedRNew);

  const kpluse = splittedRNew.map((item, _index) => {
    const _row = parseInt(item[0].toString() + item[5].toString(), 2);
    const _column = parseInt(
      item
        .split("")
        .splice(1, 4)
        .join(""),
      2
    );
    // console.log(`Row Item: ${_row}`);
    // console.log(`Column Item: ${_column}`);
    const SofIndex = S[`s${_index + 1}`];
    const SofB = SofIndex[_row][_column];
    const _SofB = parseInt(SofB, 10).toString(2);
    const SofBtoD = "0".repeat(parseInt(4) - _SofB.length) + _SofB;
    logger("Converting part " + _index + " to 4 bits", SofBtoD);
    return SofBtoD;
  });
  logger("K + E(R)", kpluse.join(""));
  // console.log("K + E(R1)");
  // console.log(kpluse.join(""));
  const _bits = kpluse.join("").split("");
  const permutedMessage = P.map(item => _bits[item - 1]).join("");
  const rNEEW = xOR(lOld, permutedMessage, 32);
  logger("RNew", rNEEW);
  return {
    lnew: rOld,
    rnew: rNEEW
  };
}

// function to split array into equal halves
const arraySplitter = (a, n, balanced) => {
  if (n < 2) return [a];
  var len = a.length,
    out = [],
    i = 0,
    size;
  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }
  return out;
};

// function to XOR two values a & b
function xOR(a, b, bits) {
  const _a = a.toString().split("");
  const _b = b.toString().split("");
  const xorBits = _a.map((aItem, i) => {
    if (aItem === _b[i]) return 0;
    return 1;
  });
  const _xorBits = xorBits.join("");
  return "0".repeat(parseInt(bits) - _xorBits.length) + _xorBits;
}

// function to expand to 48bits
function expandTo48bit(R) {
  const fourBitsChunk = chunk(R.split(""), 4);
  let final = [];
  for (k = 0; k < 8; k++) {
    let previousItem;
    let nextItem;
    let currentItem = fourBitsChunk[k];
    if (k === 0) {
      previousItem = fourBitsChunk[fourBitsChunk.length - 1];
    } else {
      previousItem = fourBitsChunk[k - 1];
    }
    if (k === 7) {
      nextItem = fourBitsChunk[0];
    } else {
      nextItem = fourBitsChunk[k + 1];
    }
    const newItem = new Array();
    const finalNew = newItem.concat(currentItem);
    finalNew.unshift(previousItem[3]);
    finalNew.push(nextItem[0]);
    final.push(finalNew);
  }
  return final
    .join("")
    .split(",")
    .join("");
}

module.exports = {
  DESfunction
};
