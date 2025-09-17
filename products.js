/*
 * Product definitions for UNKWN LABS.
 *
 * Each product includes an id, name, description, image path, available
 * sizes, and a price list keyed by size label. You can add or remove
 * products here as your gallery expands. The sizes can represent the
 * dimensions in inches (width × height). Prices are in US dollars.
 */

const products = [
  {
    id: 1,
    name: 'Luminous Depth',
    description:
      'An abstract composition of luminous colours and layered patterns that evoke depth and mystery. Each stroke of colour shines through the acrylic for a striking, modern finish.',
    image: 'assets/images/product1.png',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },
  {
    id: 2,
    name: 'Monochrome Calm',
    description:
      'An elegant monochrome gradient with intricate swirling shapes, exuding calm and sophistication. The subtle tones and textures are elevated behind clear acrylic.',
    image: 'assets/images/product2.png',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },
  {
    id: 3,
    name: 'Geometric Dynamics',
    description:
      'Richly textured geometric shapes with bold contrasting colours create a dynamic, contemporary art piece. Perfect for making a statement in any space.',
    image: 'assets/images/product3.png',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },
  {
    id: 4,
    name: 'Pastel Waves',
    description:
      'Soft gradient pastel waves with subtle depth and smooth transitions. This calming piece adds a touch of serenity to your wall, enhanced by the glossy acrylic surface.',
    image: 'assets/images/product4.png',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },

  // New products featuring the user's photography
  {
    id: 5,
    name: 'Highland Majesty',
    description:
      'A captivating photograph of a shaggy Highland cattle standing amid lush greenery. The rich texture of the fur and the verdant background bring rustic charm and warmth to your wall.',
    image: 'assets/images/product5.jpg',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },
  {
    id: 6,
    name: 'Stately Longhorn',
    description:
      'A dramatic close-up portrait of a longhorn cattle framed between trees. Its serene gaze and natural tones lend a touch of pastoral elegance to modern interiors.',
    image: 'assets/images/product6.jpg',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },

  // Additional prints from the user's collection
  {
    id: 7,
    name: 'Sunset Panorama',
    description:
      'A breathtaking aerial view of a city at dusk captured from above. The vibrant blend of teal sky and warm sunset hues evokes a serene and atmospheric mood.',
    image: 'assets/images/product7.jpg',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },
  {
    id: 8,
    name: 'Historic Facade',
    description:
      'An architectural photograph featuring the stately elegance of a historic brick building framed by lush green foliage and a clear blue sky. A perfect piece for lovers of cityscapes and timeless design.',
    image: 'assets/images/product8.jpg',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },

  // Newest additions from the user's farm and garden series
  {
    id: 9,
    name: 'Pasture Companions',
    description:
      'A heartwarming scene of two woolly companions grazing peacefully in a lush green pasture. This tender moment captures the simple beauty of rural life.',
    image: 'assets/images/product9.jpg',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },
  {
    id: 10,
    name: 'Goat Bunkhouse',
    description:
      'A charming red bunkhouse nestled among rolling hills and verdant trees. This rustic print evokes the coziness and charm of rural farm life.',
    image: 'assets/images/product10.jpg',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },
  {
    id: 11,
    name: 'Golden Sunflower',
    description:
      'A vibrant golden sunflower stands tall amidst lush green foliage, its bright petals bringing cheer and warmth to any space.',
    image: 'assets/images/product11.jpg',
    sizes: ['12×16', '18×24', '24×36'],
    prices: {
      '12×16': 79,
      '18×24': 129,
      '24×36': 179,
    },
  },
];