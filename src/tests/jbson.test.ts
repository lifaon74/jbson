import { StructuredClone as GeneratorClone } from '../core/generator-based/jbson';
import { StructuredClone as FunctionClone, EncodeToJBSON } from '../core/function-based/jbson';

type TClone = <T>(value: T) => T;

async function testJBSONClone(clone: TClone) {
  function equals(a: any, b: number) {
    return Object.is(a, b)
    || JSON.stringify(a) === JSON.stringify(b);
  }

  function testValue(value: any): any {
    const clonedValue: any = clone(value);
    if (!equals(clonedValue, value)) {
      console.log(value, clonedValue);
      throw new Error('Failed to clone');
    }
    return clonedValue;
  }


  const date: Date = new Date();
  const regexp: RegExp = new RegExp('abc', 'g');

  const buffer: ArrayBuffer = new Uint8Array([1, 2, 3]).buffer as ArrayBuffer;

  const map: Map<any, any> = new Map<any, any>();
  map.set('a', 'b');

  const set: Set<any> = new Set<any>();
  set.add('a');
  set.add('b');

  const obj1: any = {};
  obj1.obj = obj1;

  const obj2: any = { a: date, b: date };


  testValue(void 0);
  testValue(null);
  testValue(true);
  testValue(false);
  testValue(1);
  testValue(-1);
  testValue(1 / 2);
  testValue(2 ** 45);
  testValue(2 ** 68);
  testValue('hello');
  testValue(123456789123456789123456789123456789n);

  const _date: Date = clone(date);
  if (_date.getTime() !== date.getTime()) {
    throw new Error(`Failed to clone Date`);
  }

  const _regexp: RegExp = clone(regexp);
  if ((_regexp.source !== regexp.source) || (_regexp.flags !== regexp.flags)) {
    throw new Error(`Failed to clone RegExp`);
  }

  const _buffer: ArrayBuffer = clone(buffer);
  if (new Uint8Array(_buffer)[1] !== new Uint8Array(buffer)[1]) {
    throw new Error(`Failed to clone ArrayBuffer`);
  }

  await testValue(new Float64Array([1.1]));

  const _map: Map<any, any> = clone(map);
  if (_map.values().next().value !== 'b') {
    throw new Error(`Failed to clone Map`);
  }

  const _set: Set<any> = clone(set);
  if (_set.values().next().value !== 'a') {
    throw new Error(`Failed to clone Set`);
  }

  testValue([1, 'a']);
  testValue({ 'a': 'b' });

  const _obj1: any = clone(obj1);
  if (_obj1.obj !== _obj1) {
    throw new Error(`Failed to clone circular object`);
  }

  const _obj2: any = clone(obj2);
  if (_obj2.a !== _obj2.b) {
    throw new Error(`Failed to clone object with pointers`);
  }

}


function JSONClone(value: any): any {
  return JSON.parse(JSON.stringify(value) || '""');
}

function getSerializableElements(): any[] {
  return [
    false, true, 1234, 1.2, -4321, -1.2, 'abc', 'a'.repeat(512),
    new Date(), ['a', 1, true], { a: 'a', b: 1, c: true},
    { a: { b: 'c' }}
  ];
}

function getJSONData() {
  return [
    {
      '_id': '5cecd9310c2289def871125f'.repeat(Math.random() * 10),
      'index': 0,
      'guid': '3091d3b1-8c49-4590-bf8a-f54f1ac2e153',
      'isActive': true,
      'balance': '$2,560.64',
      'picture': 'http://placehold.it/32x32',
      'age': 25,
      'eyeColor': 'blue',
      'name': {
        'first': 'Tricia',
        'last': 'Matthews'
      },
      'company': 'MUSIX',
      'email': 'tricia.matthews@musix.com',
      'phone': '+1 (917) 544-2503',
      'address': '304 Aitken Place, Geyserville, Vermont, 6912',
      'about': 'Ipsum do aliqua ea aute dolore ad minim labore. Ea amet sunt voluptate amet enim duis officia nostrud. Magna aliqua tempor dolore reprehenderit ex laboris laboris eu in consequat aliquip labore dolor aliqua. Est sunt anim laboris mollit. Officia adipisicing excepteur pariatur culpa excepteur. Reprehenderit non mollit magna pariatur et nisi.',
      'registered': 'Thursday, November 26, 2015 1:59 PM',
      'latitude': '38.877588',
      'longitude': '33.40158',
      'tags': [
        'incididunt',
        'proident',
        'elit',
        'excepteur',
        'deserunt'
      ],
      'range': [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Talley Welch'
        },
        {
          'id': 1,
          'name': 'Robert Hughes'
        },
        {
          'id': 2,
          'name': 'Kate Pearson'
        }
      ],
      'greeting': 'Hello, Tricia! You have 8 unread messages.',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5cecd931826f36273c7de8ed',
      'index': 1,
      'guid': '7d20b67a-6761-4be7-bd57-84c982c5eb9a',
      'isActive': true,
      'balance': '$2,697.59',
      'picture': 'http://placehold.it/32x32',
      'age': 31,
      'eyeColor': 'green',
      'name': {
        'first': 'Queen',
        'last': 'Patel'
      },
      'company': 'MAROPTIC',
      'email': 'queen.patel@maroptic.co.uk',
      'phone': '+1 (956) 410-2039',
      'address': '786 Dunne Place, Lynn, New Jersey, 8724',
      'about': 'Ad nostrud exercitation occaecat do. Quis do veniam enim id nulla commodo ad adipisicing nisi est incididunt cupidatat sunt exercitation. Ad et ex tempor nisi mollit aliquip voluptate qui duis aliquip minim. Anim enim consequat elit tempor culpa fugiat culpa Lorem nulla aute adipisicing enim amet.',
      'registered': 'Wednesday, August 31, 2016 2:30 PM',
      'latitude': '-72.417728',
      'longitude': '124.643486',
      'tags': [
        'dolore',
        'fugiat',
        'ex',
        'culpa',
        'esse'
      ],
      'range': [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Imelda Rollins'
        },
        {
          'id': 1,
          'name': 'Vera Bentley'
        },
        {
          'id': 2,
          'name': 'Marquita Schultz'
        }
      ],
      'greeting': 'Hello, Queen! You have 8 unread messages.',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '5cecd9318d3c6b4d5d50ca1e',
      'index': 2,
      'guid': 'b7b3dc13-f99c-4eac-a923-e3e3c3c30ad8',
      'isActive': true,
      'balance': '$3,044.59',
      'picture': 'http://placehold.it/32x32',
      'age': 25,
      'eyeColor': 'brown',
      'name': {
        'first': 'Jerri',
        'last': 'Warner'
      },
      'company': 'PULZE',
      'email': 'jerri.warner@pulze.tv',
      'phone': '+1 (985) 447-2012',
      'address': '627 Lancaster Avenue, Bordelonville, Federated States Of Micronesia, 3785',
      'about': 'Exercitation esse proident pariatur Lorem id esse ea ad irure duis qui ipsum anim. Incididunt nisi non aliqua nostrud commodo minim ad fugiat enim dolor et dolor aute. Laboris non pariatur et labore sint. Ut officia aliqua quis amet nulla consectetur anim nulla reprehenderit irure ea.',
      'registered': 'Monday, May 12, 2014 1:08 AM',
      'latitude': '-88.915858',
      'longitude': '66.886879',
      'tags': [
        'ea',
        'fugiat',
        'ullamco',
        'minim',
        'elit'
      ],
      'range': [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Graves Snow'
        },
        {
          'id': 1,
          'name': 'Amanda Cochran'
        },
        {
          'id': 2,
          'name': 'Morris Beck'
        }
      ],
      'greeting': 'Hello, Jerri! You have 9 unread messages.',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '5cecd9316c0eed5575781b5e',
      'index': 3,
      'guid': '3b3c7e76-0abc-4065-88d5-da5263cec6ad',
      'isActive': false,
      'balance': '$1,879.82',
      'picture': 'http://placehold.it/32x32',
      'age': 27,
      'eyeColor': 'green',
      'name': {
        'first': 'Alma',
        'last': 'Tucker'
      },
      'company': 'XYLAR',
      'email': 'alma.tucker@xylar.name',
      'phone': '+1 (956) 536-2814',
      'address': '332 Elm Avenue, Strykersville, Tennessee, 4505',
      'about': 'Eu magna in exercitation laboris labore elit nostrud proident enim officia ullamco veniam nostrud qui. Non reprehenderit do reprehenderit duis exercitation excepteur non et elit enim id ad veniam. Ad enim tempor Lorem ut aliquip occaecat occaecat dolore fugiat in aute laboris. Nostrud ea amet irure consectetur aute consequat sunt laborum.',
      'registered': 'Tuesday, March 24, 2015 3:20 AM',
      'latitude': '44.498816',
      'longitude': '-57.228656',
      'tags': [
        'fugiat',
        'sit',
        'velit',
        'ipsum',
        'adipisicing'
      ],
      'range': [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Juarez Kirby'
        },
        {
          'id': 1,
          'name': 'Humphrey Huber'
        },
        {
          'id': 2,
          'name': 'Millie Vargas'
        }
      ],
      'greeting': 'Hello, Alma! You have 8 unread messages.',
      'favoriteFruit': 'banana'
    },
    {
      '_id': '5cecd931175628139b2d2b5d',
      'index': 4,
      'guid': 'e785d799-7aef-4779-ac3e-b5affac14973',
      'isActive': true,
      'balance': '$2,185.65',
      'picture': 'http://placehold.it/32x32',
      'age': 22,
      'eyeColor': 'blue',
      'name': {
        'first': 'Slater',
        'last': 'James'
      },
      'company': 'PLASMOSIS',
      'email': 'slater.james@plasmosis.biz',
      'phone': '+1 (805) 567-3861',
      'address': '281 Gerry Street, Nanafalia, Marshall Islands, 662',
      'about': 'Aute mollit ea nostrud excepteur Lorem nostrud in. Aliquip ea id culpa id laborum quis aute sit aute. Pariatur laborum nostrud aliqua esse dolor occaecat occaecat dolor cillum dolore occaecat proident. Non minim nisi sint ullamco nostrud voluptate irure. Veniam sunt eiusmod magna cillum sint sunt minim ipsum officia fugiat aute. Elit cupidatat elit qui Lorem ex esse dolor id. Voluptate deserunt do minim nisi labore.',
      'registered': 'Monday, September 28, 2015 2:20 PM',
      'latitude': '72.431053',
      'longitude': '29.382634',
      'tags': [
        'ad',
        'ex',
        'id',
        'consectetur',
        'anim'
      ],
      'range': [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Minnie Mosley'
        },
        {
          'id': 1,
          'name': 'Roach Fletcher'
        },
        {
          'id': 2,
          'name': 'Ola Carlson'
        }
      ],
      'greeting': 'Hello, Slater! You have 7 unread messages.',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '5cecd931e46a9f52ded3e4b5',
      'index': 5,
      'guid': '9ad25d46-aad8-4496-a604-848f652de296',
      'isActive': false,
      'balance': '$3,588.66',
      'picture': 'http://placehold.it/32x32',
      'age': 32,
      'eyeColor': 'blue',
      'name': {
        'first': 'Blanca',
        'last': 'Hebert'
      },
      'company': 'AVIT',
      'email': 'blanca.hebert@avit.biz',
      'phone': '+1 (868) 592-3382',
      'address': '394 Brown Street, Dunbar, Washington, 6867',
      'about': 'Laborum occaecat consequat ut laboris deserunt ex esse consectetur laboris irure Lorem culpa consectetur. Dolore aliqua quis velit est et minim incididunt consectetur sunt veniam tempor. Quis consectetur culpa consectetur officia dolore nostrud commodo cillum magna cillum consectetur.',
      'registered': 'Thursday, January 16, 2014 2:04 AM',
      'latitude': '-84.538663',
      'longitude': '-176.208131',
      'tags': [
        'tempor',
        'elit',
        'ad',
        'eu',
        'cupidatat'
      ],
      'range': [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Hilda Santana'
        },
        {
          'id': 1,
          'name': 'Summers Morin'
        },
        {
          'id': 2,
          'name': 'Lily Dotson'
        }
      ],
      'greeting': 'Hello, Blanca! You have 10 unread messages.',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5cecd931659bbaf6cd9f0a70',
      'index': 6,
      'guid': '80f61746-eda7-4c2f-8ce9-0a8aec9c5622',
      'isActive': false,
      'balance': '$1,618.22',
      'picture': 'http://placehold.it/32x32',
      'age': 36,
      'eyeColor': 'blue',
      'name': {
        'first': 'Edna',
        'last': 'Lowery'
      },
      'company': 'ZANILLA',
      'email': 'edna.lowery@zanilla.info',
      'phone': '+1 (906) 593-2983',
      'address': '312 Tudor Terrace, Tryon, Northern Mariana Islands, 121',
      'about': 'Lorem dolor ullamco culpa incididunt. Reprehenderit deserunt excepteur excepteur non eu mollit ea sunt nisi velit ea in. Adipisicing consequat culpa eiusmod labore quis qui reprehenderit magna pariatur. Culpa enim Lorem cillum eu esse dolore et nulla dolor cillum dolor enim culpa. Eu amet officia excepteur dolore cupidatat laboris cupidatat incididunt ea ipsum. Labore irure est ut id quis occaecat sunt qui quis minim labore ut veniam et.',
      'registered': 'Sunday, July 16, 2017 1:47 AM',
      'latitude': '-59.951881',
      'longitude': '69.681137',
      'tags': [
        'ex',
        'proident',
        'irure',
        'sunt',
        'do'
      ],
      'range': [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Zimmerman Camacho'
        },
        {
          'id': 1,
          'name': 'Cantrell Schroeder'
        },
        {
          'id': 2,
          'name': 'Schwartz Slater'
        }
      ],
      'greeting': 'Hello, Edna! You have 7 unread messages.',
      'favoriteFruit': 'apple'
    }
  ];
}


function testSpeedPerformance(clone: TClone): void {
  const elements: any[] = getSerializableElements();

  console.time('timer');
  let a: number = 0;
  for (let i = 0; i < 1e5; i++) {
    // a += (JSON.stringify(JSONClone(elements[Math.floor(Math.random() * elements.length)])) || '').length; // 100ms
    a += (JSON.stringify(clone(elements[Math.floor(Math.random() * elements.length)])) || '').length;
    // a += JSON.stringify(JSONClone(getJSONData())).length; // 110ms
    // a += JSON.stringify(clone(getJSONData())).length;
  }
  console.timeEnd('timer');
  console.log(a);
}

function testCompressionRatio(value: any, name: string = ''): void {
  const a = EncodeToJBSON(value).length;
  const b = JSON.stringify(value).length;
  console.log(`Compression ratio ${ name ? `- ${ name } ` : ''}: ${ Math.round(a / b * 1000) / 10 }% of original size (${ a } / ${ b })`);
}

function testSizePerformance() {
  testCompressionRatio(new Array(1e4).fill(1), 'uint8 array');
  testCompressionRatio(new Uint8Array(1e4).fill(1), 'typed uint8 array');
  testCompressionRatio(new Array(1e4).fill(1.23456789123456789), 'float array');
  testCompressionRatio(getJSONData(), 'getJSONData()');
}


export async function testJBSON() {
  console.log('testing GeneratorClone');
  await testJBSONClone(GeneratorClone);
  console.log('testing GeneratorClone DONE');

  console.log('testing FunctionClone');
  await testJBSONClone(FunctionClone);
  console.log('testing FunctionClone DONE');

  console.log('\ntestSpeedPerformance GeneratorClone');
  testSpeedPerformance(GeneratorClone);
  // n = 1e3, getJSONData() => ~4200ms
  // n = 1e5, elements => ~1090ms

  console.log('\ntestSpeedPerformance FunctionClone');
  testSpeedPerformance(FunctionClone);
  // n = 1e3, getJSONData() => ~900ms
  // n = 1e5, elements => ~400ms

  console.log('\ntestSizePerformance');
  testSizePerformance();
}
