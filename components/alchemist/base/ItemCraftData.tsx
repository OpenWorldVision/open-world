type CraftItemApproval = {
  img: string
  name: string
  quantity: number
  description: string
}

type CraftItem = {
  img: string
  name: string
  codeName: string
  description: string
  craftItemApproval: Array<CraftItemApproval>
}

export const craftData: Array<CraftItem> = [
  {
    img: '/images/alchemist/craft/antipoison-potion.png',
    name: 'Anti-poison Potion',
    codeName: 'AntiPoison',
    description:
      'The potion courses through the blood, neutralizing toxins and rendering them harmless. Grants immunity to poison while it remains in the body.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/ironscale.png',
        name: 'Ironscale',
        quantity: 2,
        description: 'The Knight of the Lake. Its scales are as hard as armor.',
      },
      {
        img: '/images/alchemist/craft/approval/ambertaffy.png',
        name: 'Ambertaffy',
        quantity: 2,
        description:
          'It bends but it doesn`t break. Doesn`t taste great, though.',
      },
      {
        img: '/images/alchemist/craft/approval/spider-fruit.png',
        name: 'Spiderfruit',
        quantity: 3,
        description:
          'Might look like poison, but it can actually save you from it.',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 5,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 300,
        description: 'A truly astounding item.',
      },
    ],
  },
  {
    img: '/images/alchemist/craft/blindness-potion.png',
    name: 'Anti-blinding Potion',
    codeName: 'AntiBlinding',
    description:
      'Interacts with the magical energies that cause blinding, rendering them powerless and restoring sight. Grants immunity to blindness while the effects linger.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/lanterneye.png',
        name: 'Lanterneye',
        quantity: 2,
        description:
          'Known to have a connection to magic. Don`t go toward the light...',
      },
      {
        img: '/images/alchemist/craft/approval/darkweed.png',
        name: 'Darkweed',
        quantity: 7,
        description:
          'A root, always found in dark places, that can deliver others from darkness.',
      },
      {
        img: '/images/alchemist/craft/approval/milkweed.png',
        name: 'Milkweed',
        quantity: 2,
        description:
          'Pure white, like its namesake. Feeder of butterflies and provider of magic resistance.',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 5,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 300,
        description: 'A truly astounding item.',
      },
    ],
  },
  {
    img: '/images/alchemist/craft/health-potion.png',
    name: 'Health Vial',
    codeName: 'HealthVial',
    description:
      'First aid for the adventuring Hero. Heals minor wounds and restores some Hit Points to a Hero instantly.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/ironscale.png',
        name: 'Ironscale',
        quantity: 8,
        description: 'The Knight of the Lake. Its scales are as hard as armor.',
      },
      {
        img: '/images/alchemist/craft/approval/rockroot.png',
        name: 'Rockroot',
        quantity: 8,
        description:
          'Linked to healing. Its ability to grow in such inhospitable conditions is remarkable.',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 5,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 300,
        description: 'A truly astounding item.',
      },
    ],
  },
  {
    img: '/images/alchemist/craft/health-potion-large.png',
    name: 'Full Health Potion',
    codeName: 'FullHealth',
    description:
      'Wounds magically close while broken bones and torn muscles knit together in seconds. Restores a Hero`s HP fully.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/shimmerskin.png',
        name: 'Shimmerskin',
        quantity: 2,
        description:
          'The iridescent beauty of its scales hints at great power.',
      },
      {
        img: '/images/alchemist/craft/approval/rockroot.png',
        name: 'Rockroot',
        quantity: 10,
        description:
          'Linked to healing. Its ability to grow in such inhospitable conditions is remarkable.',
      },
      {
        img: '/images/alchemist/craft/approval/ambertaffy.png',
        name: 'Ambertaffy',
        quantity: 3,
        description:
          'It bends but it doesn`t break. Doesn`t taste great, though.',
      },
      {
        img: '/images/alchemist/craft/approval/health-potion.png',
        name: 'Health Vial',
        quantity: 4,
        description:
          'First aid for the adventuring Hero. Heals minor wounds and restores some Hit Points to a Hero instantly.',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 20,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 3000,
        description: 'A truly astounding item.',
      },
    ],
  },
  {
    img: '/images/alchemist/craft/magic-resist-potion.png',
    name: 'Magic Resistance Potion',
    codeName: 'MagicResistance',
    description:
      'Infuses the body with magically-resistant particles, reducing the effectiveness of magical attacks for a duration.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/lanterneye.png',
        name: 'Lanterneye',
        quantity: 8,
        description:
          'Known to have a connection to magic. Don`t go toward the light...',
      },
      {
        img: '/images/alchemist/craft/approval/milkweed.png',
        name: 'Milkweed',
        quantity: 2,
        description:
          'Pure white, like its namesake. Feeder of butterflies and provider of magic resistance.',
      },
      {
        img: '/images/alchemist/craft/approval/bluestem.png',
        name: 'Bluestem',
        quantity: 4,
        description:
          'Beautiful leaves. Why does blue always remind you of mana?',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 10,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 500,
        description: 'A truly astounding item.',
      },
    ],
  },
  {
    img: '/images/alchemist/craft/mana-potion.png',
    name: 'Mana Vial',
    codeName: 'ManaVial',
    description:
      'Contains raw magical energy in a tasty liquid form. Restores some Mana to a Hero instantly.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/lanterneye.png',
        name: 'Lanterneye',
        quantity: 8,
        description:
          'Known to have a connection to magic. Don`t go toward the light...',
      },
      {
        img: '/images/alchemist/craft/approval/bluestem.png',
        name: 'Bluestem',
        quantity: 4,
        description:
          'Beautiful leaves. Why does blue always remind you of mana?',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 5,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 300,
        description: 'A truly astounding item.',
      },
    ],
  },
  {
    img: '/images/alchemist/craft/mana-potion-large.png',
    name: 'Full Mana Potion',
    codeName: 'FullMana',
    description:
      'Magical energy courses through a Hero`s body as their Mana Points are fully restored.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/lanterneye.png',
        name: 'Lanterneye',
        quantity: 5,
        description:
          'Known to have a connection to magic. Don`t go toward the light...',
      },
      {
        img: '/images/alchemist/craft/approval/shimmerskin.png',
        name: 'Shimmerskin',
        quantity: 2,
        description:
          'The iridescent beauty of its scales hints at great power.',
      },
      {
        img: '/images/alchemist/craft/approval/bluestem.png',
        name: 'Bluestem',
        quantity: 10,
        description:
          'Beautiful leaves. Why does blue always remind you of mana?',
      },
      {
        img: '/images/alchemist/craft/approval/mana-potion.png',
        name: 'Mana Vial',
        quantity: 4,
        description:
          'Contains raw magical energy in a tasty liquid form. Restores some Mana to a Hero instantly.',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 20,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 3000,
        description: 'A truly astounding item.',
      },
    ],
  },
  {
    img: '/images/alchemist/craft/stamina-potion.png',
    name: 'Stamina Vial',
    codeName: 'StaminaVial',
    description:
      'A quick pick-me-up in a convenient, single-serving bottle. Energizes a Hero, restoring 25 Stamina instantaneously.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/shimmerskin.png',
        name: 'Shimmerskin',
        quantity: 1,
        description:
          'The iridescent beauty of its scales hints at great power.',
      },
      {
        img: '/images/alchemist/craft/approval/swift-thistle.png',
        name: 'Swift-Thistle',
        quantity: 1,
        description:
          'The purple flowers are known to enhance speed when used correctly, hence the name.',
      },
      {
        img: '/images/alchemist/craft/approval/darkweed.png',
        name: 'Darkweed',
        quantity: 2,
        description:
          'A root, always found in dark places, that can deliver others from darkness.',
      },
      {
        img: '/images/alchemist/craft/approval/spider-fruit.png',
        name: 'Spiderfruit',
        quantity: 2,
        description:
          'Might look like poison, but it can actually save you from it',
      },
      {
        img: '/images/alchemist/craft/approval/milkweed.png',
        name: 'Milkweed',
        quantity: 2,
        description:
          'Pure white, like its namesake. Feeder of butterflies and provider of magic resistance.',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 10,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 2000,
        description: 'A truly astounding item.',
      },
    ],
  },
  {
    img: '/images/alchemist/craft/swiftness-potion.png',
    name: 'Swiftness Potion',
    codeName: 'Swiftness',
    description:
      'Time itself seems to stretch and slow as reaction time is enhanced. Increases a Hero`s agility temporarily.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/sailfish.png',
        name: 'Sailfish',
        quantity: 2,
        description: '',
      },
      {
        img: '/images/alchemist/craft/approval/swift-thistle.png',
        name: 'Swift-Thistle',
        quantity: 2,
        description:
          'The purple flowers are known to enhance speed when used correctly, hence the name.',
      },
      {
        img: '/images/alchemist/craft/approval/magic-resist-potion.png',
        name: 'Magic Resistance Potion',
        quantity: 1,
        description:
          'Infuses the body with magically-resistant particles, reducing the effectiveness of magical attacks for a duration.',
      },
      {
        img: '/images/alchemist/craft/approval/toughness-potion.png',
        name: 'Toughness Potion',
        quantity: 1,
        description:
          'Hardens skin and strengthens bone. Increases a Hero`s defense against physical damage for a period of time.',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 20,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 3000,
        description: 'A truly astounding item.',
      },
    ],
  },
  {
    img: '/images/alchemist/craft/toughness-potion.png',
    name: 'Toughness Potion',
    codeName: 'Toughness',
    description:
      'Hardens skin and strengthens bone. Increases a Hero`s defense against physical damage for a period of time.',
    craftItemApproval: [
      {
        img: '/images/alchemist/craft/approval/ironscale.png',
        name: 'Ironscale',
        quantity: 8,
        description: 'The Knight of the Lake. Its scales are as hard as armor.',
      },
      {
        img: '/images/alchemist/craft/approval/ambertaffy.png',
        name: 'Ambertaffy',
        quantity: 7,
        description:
          'It bends but it doesn`t break. Doesn`t taste great, though.',
      },
      {
        img: '/images/alchemist/craft/approval/gaias-tear.png',
        name: 'Gaia`s Tears',
        quantity: 10,
        description:
          'A crystal that, when attuned properly, can summon heroes from faraway lands.',
      },
      {
        img: '/images/alchemist/craft/approval/gold-pile.png',
        name: 'Gold Pile',
        quantity: 500,
        description: 'A truly astounding item.',
      },
    ],
  },
]
