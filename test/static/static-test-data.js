const staticFullObjects = {
  single: {
    inputs: [
      `let obj = {
  b: 2,
  a: 1,
  c: 3,
}`,
      `let obj = {
  b: 2,
  c: 3,
  a: 1,
}`,
      `let obj = {
  c: 3,
  b: 2,
  a: 1,
}`,
    ],
    output:
      `let obj = {
  a: 1,
  b: 2,
  c: 3,
}`,
  },
  nestedOneLevel: {
    inputs: [
      `let obj = {
  b: 2,
  a: 1,
  c: {
    d: 4,
    e: 5,
    f: 6,
  },
}`,
      `let obj = {
  b: 2,
  c: {
    d: 4,
    e: 5,
    f: 6,
  },
  a: 1,
}`,
      `let obj = {
  c: {
    d: 4,
    e: 5,
    f: 6,
  },
  b: 2,
  a: 1,
}`,
    ],
    output:
      `let obj = {
  a: 1,
  b: 2,
  c: {
    d: 4,
    e: 5,
    f: 6,
  },
}`,
  },
  nestedTwoLevels: {
    inputs: [
      `let obj = {
  b: 2,
  a: 1,
  c: {
    d: 4,
    e: 5,
    f: {
      g: 7,
      h: 8,
      i: 9,
    },
  },
}`,
      `let obj = {
  b: 2,
  c: {
    d: 4,
    e: 5,
    f: {
      g: 7,
      h: 8,
      i: 9,
    },
  },
  a: 1,
}`,
      `let obj = {
  c: {
    d: 4,
    e: 5,
    f: {
      g: 7,
      h: 8,
      i: 9,
    },
  },
  b: 2,
  a: 1,
}`,
    ],
    output:
      `let obj = {
  a: 1,
  b: 2,
  c: {
    d: 4,
    e: 5,
    f: {
      g: 7,
      h: 8,
      i: 9,
    },
  },
}`,
  },
};

// output represents the expected error message
const staticInvalidEdgeCases = {
  emptyWithDeclarationAndName: {
    inputs: [
      `let obj = {`,
      `let obj = { `,
      `let obj = {  `,
    ],
    output: `Invalid nested object start at line 1: (let obj = {)`
  },
  emptyWithName: {
    inputs: [
      `obj = {`,
      `obj = { `,
      `obj = {  `,
    ],
    output: `Invalid nested object start at line 1: (obj = {)`
  },
  emptyLiteral: {
    inputs: [
      `{`,
      `{ `,
      `{  `,
    ],
    output: `Invalid input length`
  },
  empty: {
    inputs: [
      ``,
      ` `,
      `  `,
    ],
    output: 'Invalid input length',
  },
};

const staticValidEdgeCases = {
  multLineValue: {
    inputs: [
      `let obj = {
  a: new String('a')
    .length
    .toString()
    .trim(),
  b: new String('b'),
}`,
    ],
    output:
      `let obj = {
  a: new String('a').length.toString().trim(),
  b: new String('b'),
}`,
  },
  naturalOrder: {
    inputs: [
      `let obj = {
  a10b: 'teszt',
  a2b: 2,
}`
    ],
    output:
      `let obj = {
  a2b: 2,
  a10b: 'teszt',
}`
  },
  emptyWithComments: {
    inputs: [
      `let obj = {} // hey there`,
      `let obj = {\n} // hey there`,
      `let obj = {\n\n} // comment`,
      `let obj = {\n\n}\n // comment`,
    ],
    output: 'let obj = {}',
  },
  emptyWithSpread: {
    inputs: [
      `let obj = {
  ...rest,
  a: 1,
  b: 2,
}`,
      `let obj = {
  a: 1,
  ...rest,
  b: 2,
}`,
      `let obj = {
  a: 1,
  b: 2,
  ...rest,
}`,
    ],
    output:
      `let obj = {
  a: 1,
  b: 2,
  ...rest,
}`,
  },
  emptyWithDeclarationAndName: {
    inputs: [
      `let obj = {}`,
      `let obj = {\n}`,
      `let obj = {\n\n}`,
      `let obj = {\n\n}\n`,
    ],
    output: 'let obj = {}',
  },
  emptyLiteral: {
    inputs: [
      `{}`,
      `{\n}`,
      `{\n\n}`,
      `{\n\n}\n`,
    ],
    output: '{}',
  },
  emptyWithName: {
    inputs: [
      `obj = {}`,
      `obj = {\n}`,
      `obj = {\n\n}`,
      `obj = {\n\n}\n`,
    ],
    output: 'obj = {}',
  },
};

const staticExtremelyNested = [
  {
    input: 'const c = {\n' +
      '  o: 85,\n' +
      "  i: 'mtwz0a',\n" +
      '  s: 94,\n' +
      '  k: 84,\n' +
      "  j: '8znn6s',\n" +
      '  p: {\n' +
      '  u: null,\n' +
      '  j: true,\n' +
      '  f: 13,\n' +
      '  n: {\n' +
      '  h: null,\n' +
      '  u: null,\n' +
      '  q: {\n' +
      '  z: null,\n' +
      '  y: 62,\n' +
      '  b: 23,\n' +
      '  l: 36,\n' +
      "  s: 'omisda',\n" +
      '  w: {\n' +
      '  x: {\n' +
      '  e: {\n' +
      '  r: {},\n' +
      "  m: 'qqxf3i',\n" +
      '  t: false,\n' +
      '  o: false,\n' +
      '  d: 79,\n' +
      '  o: null\n' +
      '},\n' +
      '  f: true,\n' +
      "  a: 'fxj8f6',\n" +
      '  o: {\n' +
      "  y: 'naciah',\n" +
      '  r: true,\n' +
      '  y: 55,\n' +
      '  u: 0,\n' +
      '  x: true,\n' +
      '  d: 99\n' +
      '},\n' +
      '  f: true,\n' +
      '  t: false\n' +
      '},\n' +
      "  s: 'nvw7de',\n" +
      '  y: true,\n' +
      '  b: true,\n' +
      '  t: null,\n' +
      '  f: 39\n' +
      '}\n' +
      '},\n' +
      "  t: 'qihvmp',\n" +
      '  v: 17,\n' +
      '  o: 32\n' +
      '},\n' +
      '  f: {\n' +
      '  k: null,\n' +
      '  u: {\n' +
      "  p: 'tsjj93',\n" +
      '  h: true,\n' +
      '  e: 85,\n' +
      '  j: false,\n' +
      "  d: 'vy8qxd',\n" +
      '  b: {\n' +
      '  k: 16,\n' +
      '  r: true,\n' +
      '  k: 24,\n' +
      '  g: null,\n' +
      '  k: {\n' +
      '  h: 62,\n' +
      '  r: true,\n' +
      '  l: {\n' +
      '  g: false,\n' +
      "  v: '1lbbk6',\n" +
      '  u: true,\n' +
      '  q: 80,\n' +
      '  z: 11,\n' +
      '  o: 8\n' +
      '},\n' +
      '  j: 49,\n' +
      '  e: {\n' +
      '  k: false,\n' +
      '  z: {},\n' +
      '  e: null,\n' +
      '  y: null,\n' +
      '  p: true,\n' +
      '  b: {}\n' +
      '},\n' +
      '  m: true\n' +
      '},\n' +
      '  y: 21\n' +
      '}\n' +
      '},\n' +
      '  v: false,\n' +
      "  b: 'q7uorz',\n" +
      '  w: true,\n' +
      "  m: '47ityz'\n" +
      '},\n' +
      '  o: 60\n' +
      '}\n' +
      '}',
    output: 'const c = {\n' +
      '  s: 94,\n' +
      '  p: {\n' +
      '    u: null,\n' +
      '    o: 60,\n' +
      '    n: {\n' +
      '      v: 17,\n' +
      '      u: null,\n' +
      "      t: 'qihvmp',\n" +
      '      q: {\n' +
      '        z: null,\n' +
      '        y: 62,\n' +
      '        w: {\n' +
      '          y: true,\n' +
      '          x: {\n' +
      '            t: false,\n' +
      '            o: {\n' +
      "              y: 'naciah',\n" +
      '              y: 55,\n' +
      '              x: true,\n' +
      '              u: 0,\n' +
      '              r: true,\n' +
      '              d: 99\n' +
      '            },\n' +
      '            f: true,\n' +
      '            f: true,\n' +
      '            e: {\n' +
      '              t: false,\n' +
      '              r: {},\n' +
      '              o: false,\n' +
      '              o: null,\n' +
      "              m: 'qqxf3i',\n" +
      '              d: 79,\n' +
      '            },\n' +
      "            a: 'fxj8f6',\n" +
      '          },\n' +
      '          t: null,\n' +
      "          s: 'nvw7de',\n" +
      '          f: 39,\n' +
      '          b: true,\n' +
      '        },\n' +
      "        s: 'omisda',\n" +
      '        l: 36,\n' +
      '        b: 23,\n' +
      '      },\n' +
      '      o: 32,\n' +
      '      h: null,\n' +
      '    },\n' +
      '    j: true,\n' +
      '    f: 13,\n' +
      '    f: {\n' +
      '      w: true,\n' +
      '      v: false,\n' +
      '      u: {\n' +
      "        p: 'tsjj93',\n" +
      '        j: false,\n' +
      '        h: true,\n' +
      '        e: 85,\n' +
      "        d: 'vy8qxd',\n" +
      '        b: {\n' +
      '          y: 21,\n' +
      '          r: true,\n' +
      '          k: 16,\n' +
      '          k: 24,\n' +
      '          k: {\n' +
      '            r: true,\n' +
      '            m: true,\n' +
      '            l: {\n' +
      '              z: 11,\n' +
      "              v: '1lbbk6',\n" +
      '              u: true,\n' +
      '              q: 80,\n' +
      '              o: 8,\n' +
      '              g: false,\n' +
      '            },\n' +
      '            j: 49,\n' +
      '            h: 62,\n' +
      '            e: {\n' +
      '              z: {},\n' +
      '              y: null,\n' +
      '              p: true,\n' +
      '              k: false,\n' +
      '              e: null,\n' +
      '              b: {}\n' +
      '            },\n' +
      '          },\n' +
      '          g: null,\n' +
      '        },\n' +
      '      },\n' +
      "      m: '47ityz',\n" +
      '      k: null,\n' +
      "      b: 'q7uorz',\n" +
      '    },\n' +
      '  },\n' +
      '  o: 85,\n' +
      '  k: 84,\n' +
      "  j: '8znn6s',\n" +
      "  i: 'mtwz0a',\n" +
      '}',
    direction: 'desc'
  },
  {
    input: 'const c = {\n' +
      '  o: 85,\n' +
      "  i: 'mtwz0a',\n" +
      '  s: 94,\n' +
      '  k: 84,\n' +
      "  j: '8znn6s',\n" +
      '  p: {\n' +
      '  u: null,\n' +
      '  j: true,\n' +
      '  f: 13,\n' +
      '  n: {\n' +
      '  h: null,\n' +
      '  u: null,\n' +
      '  q: {\n' +
      '  z: null,\n' +
      '  y: 62,\n' +
      '  b: 23,\n' +
      '  l: 36,\n' +
      "  s: 'omisda',\n" +
      '  w: {\n' +
      '  x: {\n' +
      '  e: {\n' +
      '  r: {},\n' +
      "  m: 'qqxf3i',\n" +
      '  t: false,\n' +
      '  o: false,\n' +
      '  d: 79,\n' +
      '  o: null\n' +
      '},\n' +
      '  f: true,\n' +
      "  a: 'fxj8f6',\n" +
      '  o: {\n' +
      "  y: 'naciah',\n" +
      '  r: true,\n' +
      '  y: 55,\n' +
      '  u: 0,\n' +
      '  x: true,\n' +
      '  d: 99\n' +
      '},\n' +
      '  f: true,\n' +
      '  t: false\n' +
      '},\n' +
      "  s: 'nvw7de',\n" +
      '  y: true,\n' +
      '  b: true,\n' +
      '  t: null,\n' +
      '  f: 39\n' +
      '}\n' +
      '},\n' +
      "  t: 'qihvmp',\n" +
      '  v: 17,\n' +
      '  o: 32\n' +
      '},\n' +
      '  f: {\n' +
      '  k: null,\n' +
      '  u: {\n' +
      "  p: 'tsjj93',\n" +
      '  h: true,\n' +
      '  e: 85,\n' +
      '  j: false,\n' +
      "  d: 'vy8qxd',\n" +
      '  b: {\n' +
      '  k: 16,\n' +
      '  r: true,\n' +
      '  k: 24,\n' +
      '  g: null,\n' +
      '  k: {\n' +
      '  h: 62,\n' +
      '  r: true,\n' +
      '  l: {\n' +
      '  g: false,\n' +
      "  v: '1lbbk6',\n" +
      '  u: true,\n' +
      '  q: 80,\n' +
      '  z: 11,\n' +
      '  o: 8\n' +
      '},\n' +
      '  j: 49,\n' +
      '  e: {\n' +
      '  k: false,\n' +
      '  z: {},\n' +
      '  e: null,\n' +
      '  y: null,\n' +
      '  p: true,\n' +
      '  b: {}\n' +
      '},\n' +
      '  m: true\n' +
      '},\n' +
      '  y: 21\n' +
      '}\n' +
      '},\n' +
      '  v: false,\n' +
      "  b: 'q7uorz',\n" +
      '  w: true,\n' +
      "  m: '47ityz'\n" +
      '},\n' +
      '  o: 60\n' +
      '}\n' +
      '}',
    output: 'const c = {\n' +
      "  i: 'mtwz0a',\n" +
      "  j: '8znn6s',\n" +
      '  k: 84,\n' +
      '  o: 85,\n' +
      '  p: {\n' +
      '    f: 13,\n' +
      '    f: {\n' +
      "      b: 'q7uorz',\n" +
      '      k: null,\n' +
      "      m: '47ityz',\n" +
      '      u: {\n' +
      '        b: {\n' +
      '          g: null,\n' +
      '          k: 16,\n' +
      '          k: 24,\n' +
      '          k: {\n' +
      '            e: {\n' +
      '              b: {},\n' +
      '              e: null,\n' +
      '              k: false,\n' +
      '              p: true,\n' +
      '              y: null,\n' +
      '              z: {},\n' +
      '            },\n' +
      '            h: 62,\n' +
      '            j: 49,\n' +
      '            l: {\n' +
      '              g: false,\n' +
      '              o: 8,\n' +
      '              q: 80,\n' +
      '              u: true,\n' +
      "              v: '1lbbk6',\n" +
      '              z: 11,\n' +
      '            },\n' +
      '            m: true,\n' +
      '            r: true,\n' +
      '          },\n' +
      '          r: true,\n' +
      '          y: 21\n' +
      '        },\n' +
      "        d: 'vy8qxd',\n" +
      '        e: 85,\n' +
      '        h: true,\n' +
      '        j: false,\n' +
      "        p: 'tsjj93',\n" +
      '      },\n' +
      '      v: false,\n' +
      '      w: true,\n' +
      '    },\n' +
      '    j: true,\n' +
      '    n: {\n' +
      '      h: null,\n' +
      '      o: 32,\n' +
      '      q: {\n' +
      '        b: 23,\n' +
      '        l: 36,\n' +
      "        s: 'omisda',\n" +
      '        w: {\n' +
      '          b: true,\n' +
      '          f: 39,\n' +
      "          s: 'nvw7de',\n" +
      '          t: null,\n' +
      '          x: {\n' +
      "            a: 'fxj8f6',\n" +
      '            e: {\n' +
      '              d: 79,\n' +
      "              m: 'qqxf3i',\n" +
      '              o: false,\n' +
      '              o: null,\n' +
      '              r: {},\n' +
      '              t: false,\n' +
      '            },\n' +
      '            f: true,\n' +
      '            f: true,\n' +
      '            o: {\n' +
      '              d: 99,\n' +
      '              r: true,\n' +
      '              u: 0,\n' +
      '              x: true,\n' +
      "              y: 'naciah',\n" +
      '              y: 55,\n' +
      '            },\n' +
      '            t: false\n' +
      '          },\n' +
      '          y: true,\n' +
      '        },\n' +
      '        y: 62,\n' +
      '        z: null,\n' +
      '      },\n' +
      "      t: 'qihvmp',\n" +
      '      u: null,\n' +
      '      v: 17,\n' +
      '    },\n' +
      '    o: 60,\n' +
      '    u: null,\n' +
      '  },\n' +
      '  s: 94,\n' +
      '}',
    direction: 'asc'
  }
];

module.exports = {
  staticExtremelyNested,
  staticFullObjects,
  staticInvalidEdgeCases,
  staticValidEdgeCases,
};