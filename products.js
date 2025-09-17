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
];