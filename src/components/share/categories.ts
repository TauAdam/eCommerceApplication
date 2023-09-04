import { CategoryID } from './types'

export type Category = {
  id: CategoryID
  key: string
  slug: {
    'en-US': string
  }
  version: number
  parent?: {
    typeId: 'category'
    id: CategoryID
  }
  title: string
}

type Categories = Record<string, Category>

export const categories: Categories = {
  clothingKids: {
    id: CategoryID.clothingKids,
    key: 'clothing-kids',
    parent: {
      typeId: 'category',
      id: CategoryID.kids,
    },
    slug: {
      'en-US': 'clothing_kids',
    },
    version: 1,
    title: 'одежда',
  },
  topsWomen: {
    id: CategoryID.topsWomen,
    key: 'tops-women',
    parent: {
      typeId: 'category',
      id: CategoryID.women,
    },
    slug: {
      'en-US': 'tops_women',
    },
    version: 1,
    title: 'верхняя одежда',
  },
  bottomsWomen: {
    id: CategoryID.bottomsWomen,
    key: 'bottoms-women',
    parent: {
      typeId: 'category',
      id: CategoryID.women,
    },
    slug: {
      'en-US': 'bottoms_women',
    },
    version: 1,
    title: 'нижняя одежда',
  },
  topsKids: {
    id: CategoryID.topsKids,
    key: 'tops-kids',
    parent: {
      typeId: 'category',
      id: CategoryID.clothingKids,
    },
    slug: {
      'en-US': 'tops_kids',
    },
    version: 1,
    title: 'верхняя одежда',
  },
  kids: {
    id: CategoryID.kids,
    key: 'kids',
    slug: {
      'en-US': 'kids',
    },
    version: 1,
    title: 'Дети',
  },
  otherKids: {
    id: CategoryID.otherKids,
    key: 'other-kids',
    parent: {
      typeId: 'category',
      id: CategoryID.kids,
    },
    slug: {
      'en-US': 'other_kids',
    },
    version: 1,
    title: 'другое',
  },
  women: {
    id: CategoryID.women,
    key: 'women',
    slug: {
      'en-US': 'women',
    },
    version: 1,
    title: 'Женщины',
  },
  otherWomen: {
    id: CategoryID.otherWomen,
    key: 'other-women',
    parent: {
      typeId: 'category',
      id: CategoryID.women,
    },
    slug: {
      'en-US': 'other_women',
    },
    version: 1,
    title: 'другое',
  },
  bottomsKids: {
    id: CategoryID.bottomsKids,
    key: 'bottoms_kids',
    parent: {
      typeId: 'category',
      id: CategoryID.clothingKids,
    },
    slug: {
      'en-US': 'bottoms_kids',
    },
    version: 1,
    title: 'нижняя одежда',
  },
  men: {
    id: CategoryID.men,
    key: 'men',
    slug: {
      'en-US': 'men',
    },
    version: 1,
    title: 'Мужчины',
  },
  topsMen: {
    id: CategoryID.topsMen,
    key: 'tops-men',
    parent: {
      typeId: 'category',
      id: CategoryID.men,
    },
    slug: {
      'en-US': 'tops_men',
    },
    version: 1,
    title: 'верхняя одежда',
  },
  bottomsMen: {
    id: CategoryID.bottomsMen,
    key: 'bottoms-men',
    parent: {
      typeId: 'category',
      id: CategoryID.men,
    },
    slug: {
      'en-US': 'bottoms_men',
    },
    version: 1,
    title: 'нижняя одежда',
  },
  otherMen: {
    id: CategoryID.otherMen,
    key: 'other-men',
    parent: {
      typeId: 'category',
      id: CategoryID.men,
    },
    slug: {
      'en-US': 'other_men',
    },
    version: 1,
    title: 'другое',
  },
}
