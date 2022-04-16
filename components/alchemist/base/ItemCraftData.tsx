type CraftItemApproval = {
  img: string
  name: string
  quantity: number
}

type CraftItem = {
  img: string
  name: string
  craftItemApproval: Array<CraftItemApproval>
}

export const craftData: Array<CraftItem> = [
  {
    img: '/images/alchemist/item-craft/antipoison-potion.png',
    name: 'Anti-poison Potion',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/ironscale.png',
        name: 'Ironscale',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/ambertaffy.png',
        name: 'Ambertaffy',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/spider-fruit.png',
        name: 'Spiderfruit',
        quantity: 3,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 5,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 300,
      },
    ],
  },
  {
    img: '/images/alchemist/item-craft/blindness-potion.png',
    name: 'Anti-blinding Potion',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/lanterneye.png',
        name: 'Lanterneye',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/darkweed.png',
        name: 'Darkweed',
        quantity: 7,
      },
      {
        img: '/images/alchemist/item-craft/milkweed.png',
        name: 'Milkweed',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 5,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 300,
      },
    ],
  },
  {
    img: '/images/alchemist/item-craft/health-potion.png',
    name: 'Health Vial',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/ironscale.png',
        name: 'Ironscale',
        quantity: 8,
      },
      {
        img: '/images/alchemist/item-craft/rockroot.png',
        name: 'Rockroot',
        quantity: 8,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 5,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 300,
      },
    ],
  },
  {
    img: '/images/alchemist/item-craft/health-potion-large.png',
    name: 'Full Health Potion',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/shimmerskin.png',
        name: 'Shimmerskin',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/rockroot.png',
        name: 'Rockroot',
        quantity: 10,
      },
      {
        img: '/images/alchemist/item-craft/ambertaffy.png',
        name: 'Ambertaffy',
        quantity: 3,
      },
      {
        img: '/images/alchemist/item-craft/health-potion.png',
        name: 'Health Vial',
        quantity: 4,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 20,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 3000,
      },
    ],
  },
  {
    img: '/images/alchemist/item-craft/magic-resist-potion.png',
    name: 'Magic Resistance Potion',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/lanterneye.png',
        name: 'Lanterneye',
        quantity: 8,
      },
      {
        img: '/images/alchemist/item-craft/milkweed.png',
        name: 'Milkweed',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/bluestem.png',
        name: 'Bluestem',
        quantity: 4,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 10,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 500,
      },
    ],
  },
  {
    img: '/images/alchemist/item-craft/mana-potion.png',
    name: 'Mana Vial',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/lanterneye.png',
        name: 'Lanterneye',
        quantity: 8,
      },
      {
        img: '/images/alchemist/item-craft/bluestem.png',
        name: 'Bluestem',
        quantity: 4,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 5,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 300,
      },
    ],
  },
  {
    img: '/images/alchemist/item-craft/mana-potion-large.png',
    name: 'Full Mana Potion',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/lanterneye.png',
        name: 'Lanterneye',
        quantity: 5,
      },
      {
        img: '/images/alchemist/item-craft/shimmerskin.png',
        name: 'Shimmerskin',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/bluestem.png',
        name: 'Bluestem',
        quantity: 10,
      },
      {
        img: '/images/alchemist/item-craft/mana-potion.png',
        name: 'Mana Vial',
        quantity: 4,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 20,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 3000,
      },
    ],
  },
  {
    img: '/images/alchemist/item-craft/stamina-potion.png',
    name: 'Stamina Vial',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/shimmerskin.png',
        name: 'Shimmerskin',
        quantity: 1,
      },
      {
        img: '/images/alchemist/item-craft/swift-thistle.png',
        name: 'Swift-Thistle',
        quantity: 1,
      },
      {
        img: '/images/alchemist/item-craft/darkweed.png',
        name: 'Darkweed',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/spider-fruit.png',
        name: 'Spiderfruit',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/milkweed.png',
        name: 'Milkweed',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 10,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 2000,
      },
    ],
  },
  {
    img: '/images/alchemist/item-craft/swiftness-potion.png',
    name: 'Swiftness Potion',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/sailfish.png',
        name: 'Sailfish',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/swift-thistle.png',
        name: 'Swift-Thistle',
        quantity: 2,
      },
      {
        img: '/images/alchemist/item-craft/magic-resist-potion.png',
        name: 'Magic Resistance Potion',
        quantity: 1,
      },
      {
        img: '/images/alchemist/item-craft/toughness-potion.png',
        name: 'Toughness Potion',
        quantity: 1,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 20,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 3000,
      },
    ],
  },
  {
    img: '/images/alchemist/item-craft/toughness-potion.png',
    name: 'Toughness Potion',
    craftItemApproval: [
      {
        img: '/images/alchemist/item-craft/ironscale.png',
        name: 'Ironscale',
        quantity: 8,
      },
      {
        img: '/images/alchemist/item-craft/ambertaffy.png',
        name: 'Ambertaffy',
        quantity: 7,
      },
      {
        img: '/images/alchemist/item-craft/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 10,
      },
      {
        img: '/images/alchemist/item-craft/gold-pile.png',
        name: 'Gold Pile',
        quantity: 500,
      },
    ],
  },
]
