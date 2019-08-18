const readline = require("readline");
const { hexToBinary, leftShift } = require("./utils");
var input = readline.createInterface(process.stdin, process.stdout);
const KEYS = {
  // prettier-ignore
  PC1: [
    57,49,41,33,25,17,9,1,58,50,42,34,
    26,18,10,2,59,51,43,35,27,19,11,3,
    60,52,44,36,63,55,47,39,31,23,15,7,
    62,54,46,38,30,22,14,6,61,53,45,37,
    29,21,13,5,28,20,12,4
  ],
  // prettier-ignore
  PC2: [ 
    14,17,11,24,1,5,3,28,15,6,21,10,23,
    19,12,4,26,8,16,7,27,20,13,2,41,52,
    31,37,47,55,30,40,51,45,33,48,44,49,
    39,56,34,53,46,42,50,36,29,32
  ],
  // prettier-ignore
  IP: [
    58,50,42,34,26,18,10,2,60,52,44,36,
    28,20,12,4,62,54,46,38,30,22,14,6,
    64,56,48,40,32,24,16,8,57,49,41,33,
    25,17,9,1,59,51,43,35,27,19,11,3,
    61,53,45,37,29,21,13,5,63,55,47,39,
    31,23,15,7
  ]
};
// const _input = "133457799BBCDFF1";
const message = "0123456789ABCDEF";
const messageInBinary = hexToBinary(message);
const InitialPermutationMessage = KEYS.IP.map(
  key => messageInBinary[key - 1]
).join("");
console.log("Permuted Message \n" + InitialPermutationMessage);
const L0 = InitialPermutationMessage.slice(
  0,
  InitialPermutationMessage.length / 2
);
const R0 = InitialPermutationMessage.slice(
  InitialPermutationMessage.length / 2,
  InitialPermutationMessage.length
);

input.question("Please Provide 64bit Key in Hex \n", __input => {
  console.log(`Provided 64bit Hex Key: ${__input}`);
  const K = hexToBinary(__input);
  1;
  console.log(`\nK = ${K} `);
  const K_Plus = KEYS.PC1.map(key => K[key - 1]).join("");
  console.log(`K+ = ${K_Plus} \n`);
  const C0 = K_Plus.slice(0, K_Plus.length / 2);
  const D0 = K_Plus.slice(K_Plus.length / 2, K_Plus.length);
  let tmpC, tmpD;
  tmpC = C0;
  tmpD = D0;
  let lOld, rOld;
  lOld = L0;
  rOld = R0;
  for (i = 1; i <= 16; i++) {
    if (i == 1 || i == 2 || i == 9 || i == 16) {
      tmpC = leftShift(tmpC, 1);
      tmpD = leftShift(tmpD, 1);
    } else {
      tmpC = leftShift(tmpC, 2);
      tmpD = leftShift(tmpD, 2);
    }
    let tmpKey = tmpC + tmpD;
    const tmpRoundKey = KEYS.PC2.map(key => tmpKey[key - 1]).join("");
    console.log(`Round Key ${i}: ${tmpRoundKey}`);
  }

  input.close();
});

process.exit();
