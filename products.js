/*
 * Product definitions for UNKWN LABS.
 *
 * Each product includes an id, name, description, image path, available
 * sizes, and a price list keyed by size label. You can add or remove
 * products here as your gallery expands. The sizes can represent the
 * dimensions in inches (width × height). Prices are in US dollars.
 */

const products = [
  // Products featuring the user's own photography.  The original
  // abstract sample prints have been removed so the shop now
  // exclusively showcases your personal work.
  {
    id: 5,
    name: 'Highland Majesty',
    description:
      'A captivating photograph of a shaggy Highland cattle standing amid lush greenery. The rich texture of the fur and the verdant background bring rustic charm and warmth to your wall.',
    image: 'assets/images/product5.jpg',
    sizes: [
      '4×6',
      '8×12',
      '12×18',
      '16×23.9',
      '20×29.9',
      '24×35.9',
      '28×41.9',
      '31×46.4',
      '35×52.4',
    ],
    // Resolution in pixels (width, height) for computing quality
    resolution: [1365, 2048],
    // Updated prices based on WhiteWall pricing plus $150
    prices: {
      '4×6': 185.95,
      '8×12': 234.95,
      '12×18': 329.95,
      '16×23.9': 381.95,
      '20×29.9': 470.95,
      '24×35.9': 587.95,
      '28×41.9': 785.95,
      '31×46.4': 874.95,
      '35×52.4': 1066.95,
    },
  },
  {
    id: 6,
    name: 'Stately Longhorn',
    description:
      'A dramatic close-up portrait of a longhorn cattle framed between trees. Its serene gaze and natural tones lend a touch of pastoral elegance to modern interiors.',
    image: 'assets/images/product6.jpg',
    sizes: [
      '4×6',
      '8×12',
      '12×18',
      '16×23.9',
      '20×29.9',
      '24×35.9',
      '28×41.9',
      '31×46.4',
      '35×52.4',
    ],
    resolution: [1365, 2048],
    prices: {
      '4×6': 185.95,
      '8×12': 234.95,
      '12×18': 329.95,
      '16×23.9': 381.95,
      '20×29.9': 470.95,
      '24×35.9': 587.95,
      '28×41.9': 785.95,
      '31×46.4': 874.95,
      '35×52.4': 1066.95,
    },
  },

  // Additional prints from the user's collection
  {
    id: 7,
    name: 'Sunset Panorama',
    description:
      'A breathtaking aerial view of a city at dusk captured from above. The vibrant blend of teal sky and warm sunset hues evokes a serene and atmospheric mood.',
    image: 'assets/images/product7.jpg',
    sizes: [
      '4×6',
      '8×12',
      '12×18',
      '16×23.9',
      '20×29.9',
      '24×35.9',
      '28×41.9',
      '31×46.4',
      '35×52.4',
    ],
    resolution: [2048, 1536],
    prices: {
      '4×6': 185.95,
      '8×12': 234.95,
      '12×18': 329.95,
      '16×23.9': 381.95,
      '20×29.9': 470.95,
      '24×35.9': 587.95,
      '28×41.9': 785.95,
      '31×46.4': 874.95,
      '35×52.4': 1066.95,
    },
  },
  {
    id: 8,
    name: 'Historic Facade',
    description:
      'An architectural photograph featuring the stately elegance of a historic brick building framed by lush green foliage and a clear blue sky. A perfect piece for lovers of cityscapes and timeless design.',
    image: 'assets/images/product8.jpg',
    sizes: [
      '4×6',
      '8×12',
      '12×18',
      '16×23.9',
      '20×29.9',
      '24×35.9',
      '28×41.9',
      '31×46.4',
      '35×52.4',
    ],
    resolution: [1365, 2048],
    prices: {
      '4×6': 185.95,
      '8×12': 234.95,
      '12×18': 329.95,
      '16×23.9': 381.95,
      '20×29.9': 470.95,
      '24×35.9': 587.95,
      '28×41.9': 785.95,
      '31×46.4': 874.95,
      '35×52.4': 1066.95,
    },
  },

  // Newest additions from the user's farm and garden series
  {
    id: 9,
    name: 'Pasture Companions',
    description:
      'A heartwarming scene of two woolly companions grazing peacefully in a lush green pasture. This tender moment captures the simple beauty of rural life.',
    image: 'assets/images/product9.jpg',
    sizes: [
      '4×6',
      '8×12',
      '12×18',
      '16×23.9',
      '20×29.9',
      '24×35.9',
      '28×41.9',
      '31×46.4',
      '35×52.4',
    ],
    resolution: [2048, 1365],
    prices: {
      '4×6': 185.95,
      '8×12': 234.95,
      '12×18': 329.95,
      '16×23.9': 381.95,
      '20×29.9': 470.95,
      '24×35.9': 587.95,
      '28×41.9': 785.95,
      '31×46.4': 874.95,
      '35×52.4': 1066.95,
    },
  },
  {
    id: 10,
    name: 'Goat Bunkhouse',
    description:
      'A charming red bunkhouse nestled among rolling hills and verdant trees. This rustic print evokes the coziness and charm of rural farm life.',
    image: 'assets/images/product10.jpg',
    sizes: [
      '4×6',
      '8×12',
      '12×18',
      '16×23.9',
      '20×29.9',
      '24×35.9',
      '28×41.9',
      '31×46.4',
      '35×52.4',
    ],
    resolution: [2048, 1365],
    prices: {
      '4×6': 185.95,
      '8×12': 234.95,
      '12×18': 329.95,
      '16×23.9': 381.95,
      '20×29.9': 470.95,
      '24×35.9': 587.95,
      '28×41.9': 785.95,
      '31×46.4': 874.95,
      '35×52.4': 1066.95,
    },
  },
  {
    id: 11,
    name: 'Golden Sunflower',
    description:
      'A vibrant golden sunflower stands tall amidst lush green foliage, its bright petals bringing cheer and warmth to any space.',
    image: 'assets/images/product11.jpg',
    sizes: [
      '4×6',
      '8×12',
      '12×18',
      '16×23.9',
      '20×29.9',
      '24×35.9',
      '28×41.9',
      '31×46.4',
      '35×52.4',
    ],
    resolution: [1365, 2048],
    prices: {
      '4×6': 185.95,
      '8×12': 234.95,
      '12×18': 329.95,
      '16×23.9': 381.95,
      '20×29.9': 470.95,
      '24×35.9': 587.95,
      '28×41.9': 785.95,
      '31×46.4': 874.95,
      '35×52.4': 1066.95,
    },
  },
];