const generateTrimmedGetFullObject = async (obj) => {
  const trimDeclaration = (input) => {
    return typeof input === 'string'
      ? input.slice(input.indexOf('{'))
      : input.map((str) => str.slice(str.indexOf('{')));
  };

  let ret = {};
  for (const [key, values] of Object.entries(obj)) {
    ret[key] = {
      inputs: trimDeclaration(values.inputs),
      output: trimDeclaration(values.output),
    };
  }
  return ret;
};

const generateKeyPairsGetFullObject = async (obj) => {
  const trimmer = (str) => {
    let start = str.indexOf('{'), end = str.lastIndexOf('}');
    if (start === -1 || end === -1) return str;

    let ret = str.slice(start + 1, end);
    if (ret.startsWith('\n')) ret = ret.slice(1);
    if (ret.endsWith('\n')) ret = ret.slice(0, -1);
    return ret;
  };
  const trimAll = (input) => {
    return typeof input === 'string'
      ? trimmer(input)
      : input.map((str) => trimmer(str));
  };

  let ret = {};
  for (const [key, values] of Object.entries(obj)) {
    ret[key] = {
      inputs: trimAll(values.inputs),
      output: trimAll(values.output),
    };
  }
  return ret;
};

const generateRandomObject = async() => {
  return new Promise((resolve, reject) => {
    const declarationType = 'const';
    const name = generateRandomName();
    const types = ['string', 'number', 'boolean', 'object', 'null'];
    // const types = ['string', 'number', 'boolean', 'array', 'object', 'null'];
    const length = Math.floor(Math.random() * 10) + 1;
    const depth = Math.floor(Math.random() * 5) + 1;

    function generateRandomName() {
      return String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    function generateRandomValue(currentDepth) {
      const type = types[Math.floor(Math.random() * types.length)];
      switch (type) {
        case 'string':
          return `'${Math.random().toString(36).substring(2, 8)}'`;
        case 'number':
          return Math.floor(Math.random() * 100);
        case 'boolean':
          return Math.random() < 0.5;
        case 'array':
          if (currentDepth >= depth) return '[]';
          return `[${Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => generateRandomValue(currentDepth + 1)).join(', ')}]`;
        case 'object':
          if (currentDepth >= depth) return '{}';
          return generateObjectString(currentDepth + 1);
        case 'null':
          return 'null';
      }
    }

    function generateObjectString(currentDepth = 1, indent = '  ') {
      let result = '{\n';
      for (let i = 0; i < length; i++) {
        const key = generateRandomName();
        const value = generateRandomValue(currentDepth);
        result += `${indent}${key}: ${value}`;
        if (i < length - 1) result += ',';
        result += '\n';
      }
      result += `${indent.slice(0, -2)}}`;
      return result;
    }

    const objectString = generateObjectString();
    resolve(`${declarationType} ${name} = ${objectString}`);
  });
}

module.exports = {
  generateKeyPairsGetFullObject,
  generateRandomObject,
  generateTrimmedGetFullObject,
};