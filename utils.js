// prettier-ignore
var lookup = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'a': '1010',
    'b': '1011',
    'c': '1100',
    'd': '1101',
    'e': '1110',
    'f': '1111',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
  };

function hexToBinary(s) {
  var ret = "";
  for (var i = 0, len = s.length; i < len; i++) {
    ret += lookup[s[i]];
  }
  return ret;
}

function leftShift(item, shiftingValue) {
  const _item = item.split("");
  for (j = 0; j < shiftingValue; j++) {
    const tmpShiftItem = _item.shift();
    _item.push(tmpShiftItem);
  }
  return _item.join("");
}

function chunk(array, size) {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
}

module.exports = {
  hexToBinary,
  leftShift,
  chunk
};
